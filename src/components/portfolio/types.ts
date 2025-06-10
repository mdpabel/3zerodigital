// types/template.ts
import { Prisma } from '@prisma/client';

export type TemplateWithNestedCategories = Prisma.TemplateGetPayload<{
  include: {
    categories: {
      include: {
        category: true;
      };
    };
  };
}>;

// Use Prisma's generated type instead of defining our own
export type TemplateCategory = Prisma.TemplateCategoryGetPayload<{}>;

export type TemplateApiResponse = {
  templates: TemplateWithNestedCategories[];
  totalCount: number;
  hasMore: boolean;
  currentPage: number;
  totalPages: number;
};
