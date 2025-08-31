export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import prisma from '@/../prisma/db';
import { entitledOrderIdForTemplate } from '@/lib/entitlements';
import { r2 } from '@/lib/r2';
import { GetObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import path from 'node:path';

function safeFilename(s: string) {
  return s.replace(/[^a-z0-9\-_. ]/gi, '_');
}

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ templateId: string }> }, // ← params is a Promise
) {
  const { templateId } = await ctx.params; // ← await it
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user?.id;
  if (!userId)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const orderId = await entitledOrderIdForTemplate({ userId, templateId });
  if (!orderId)
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const tpl = await prisma.template.findUnique({
    where: { id: templateId },
    select: { name: true, fileKey: true },
  });

  if (!tpl?.fileKey)
    return NextResponse.json({ error: 'Not found' }, { status: 404 });

  // HEAD first to validate the key and get Content-Type
  let contentType = 'application/octet-stream';
  try {
    const head = await r2.send(
      new HeadObjectCommand({
        Bucket: process.env.CF_R2_BUCKET!,
        Key: tpl.fileKey,
      }),
    );
    if (head.ContentType) contentType = head.ContentType;
  } catch (e) {
    // If the key is wrong or token lacks perms, HEAD will fail
    return NextResponse.json(
      { error: 'File missing or access denied' },
      { status: 404 },
    );
  }

  // Build a nice filename with the correct extension
  const ext = path.extname(tpl.fileKey) || '';
  const downloadName =
    (tpl.name ? safeFilename(tpl.name) : path.basename(tpl.fileKey, ext)) + ext;

  const cmd = new GetObjectCommand({
    Bucket: process.env.CF_R2_BUCKET!,
    Key: tpl.fileKey,
    ResponseContentDisposition: `attachment; filename="${downloadName}"`,
    ResponseContentType: contentType,
  });

  const signed = await getSignedUrl(r2, cmd, { expiresIn: 60 }); // short TTL

  const res = NextResponse.redirect(signed, 302);
  res.headers.set('Cache-Control', 'no-store');
  return res;
}
