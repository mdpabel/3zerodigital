import { MongoClient } from 'mongodb';
import { PrismaClient } from '@prisma/client';

async function main() {
  const mongoUri = process.env.MONGO_URI!;
  const mongoDbName = process.env.MONGO_DB!;
  const mongo = new MongoClient(mongoUri);
  const prisma = new PrismaClient();

  try {
    await mongo.connect();
    const db = mongo.db(mongoDbName);

    // 1) migrate categories
    const mongoCats = await db.collection('TemplateCategory').find().toArray();
    for (const c of mongoCats) {
      const id = c._id.toString();
      await prisma.templateCategory.upsert({
        where: { id },
        create: {
          id,
          name: c.name,
          slug: c.slug,
          createdAt: c.createdAt ? new Date(c.createdAt) : undefined,
          updatedAt: c.updatedAt ? new Date(c.updatedAt) : undefined,
        },
        update: {
          name: c.name,
          slug: c.slug,
          updatedAt: c.updatedAt ? new Date(c.updatedAt) : undefined,
        },
      });
    }

    // 2) migrate templates
    const mongoTemps = await db.collection('Template').find().toArray();
    for (const t of mongoTemps) {
      const id = t._id.toString();
      await prisma.template.upsert({
        where: { id },
        create: {
          id,
          name: t.name,
          slug: t.slug,
          fileUrl: t.fileUrl,
          liveUrl: t.liveUrl,
          description: t.description,
          price: t.price,
          salePrice: t.salePrice,
          images: t.images,
          deleted: t.deleted,
          createdAt: new Date(t.createdAt),
          updatedAt: new Date(t.updatedAt),
        },
        update: {
          name: t.name,
          slug: t.slug,
          fileUrl: t.fileUrl,
          liveUrl: t.liveUrl,
          description: t.description,
          price: t.price,
          salePrice: t.salePrice,
          images: t.images,
          deleted: t.deleted,
          updatedAt: new Date(t.updatedAt),
        },
      });
    }

    // 3) migrate the join table
    const mongoLinks = await db
      .collection('TemplateCategoryOnTemplate')
      .find()
      .toArray();
    for (const l of mongoLinks) {
      const id = l._id.toString();
      // use createMany if you prefer batching
      await prisma.templateCategoryOnTemplate.upsert({
        where: { id },
        create: {
          id,
          templateId: l.templateId.toString(),
          categoryId: l.categoryId.toString(),
          createdAt: new Date(l.createdAt),
          updatedBy: l.updatedBy,
        },
        update: {
          // nothing or updatedBy
          updatedBy: l.updatedBy,
        },
      });
    }

    console.log('🎉 Migration complete');
  } finally {
    await prisma.$disconnect();
    await mongo.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
