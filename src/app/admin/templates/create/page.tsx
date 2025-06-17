import { getTemplateCategories } from '@/actions/template-actions';
import { TemplateForm } from '../template-form';

export default async function CreateTemplatePage() {
  const categories = await getTemplateCategories();
  return (
    <div className='mx-auto py-8 container'>
      <TemplateForm allCategories={categories} mode='create' />
    </div>
  );
}
