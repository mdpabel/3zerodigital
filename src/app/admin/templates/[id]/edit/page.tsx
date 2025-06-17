import { notFound } from 'next/navigation';
import {
  getTemplateById,
  getTemplateCategories,
} from '@/actions/template-actions';
import { TemplateForm } from '../../template-form';

interface EditTemplatePageProps {
  params: { id: string };
}

export default async function EditTemplatePage({
  params,
}: EditTemplatePageProps) {
  const [template, categories] = await Promise.all([
    getTemplateById(params.id),
    getTemplateCategories(),
  ]);

  if (!template) {
    notFound();
  }

  return (
    <div className='mx-auto py-8 container'>
      <TemplateForm
        initialData={template}
        allCategories={categories}
        mode='edit'
      />
    </div>
  );
}
