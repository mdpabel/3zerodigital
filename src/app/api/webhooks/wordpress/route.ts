import { NextRequest, NextResponse } from 'next/server';

import { revalidatePath, revalidateTag } from 'next/cache';

export const POST = async (req: NextRequest) => {
  revalidateTag('post');
  revalidateTag('case-study');

  revalidatePath('/case-studies/[slug]', 'page');
  revalidatePath('/case-studies', 'page');
  revalidatePath('/(blog)/blog/(index)', 'layout');
  revalidatePath('/(blog)/blog/(index)', 'page');
  revalidatePath('/blog', 'page');
  revalidatePath('/');
  revalidatePath('/(blog)/blog/[slug]', 'page');
  revalidatePath('/(blog)/blog/category/[slug]', 'page');
  revalidatePath('/(blog)/blog/tag/[slug]', 'page');

  return NextResponse.json({});
};
