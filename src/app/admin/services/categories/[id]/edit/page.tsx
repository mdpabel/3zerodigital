import { getCategoryById } from '@/actions/category-actions';
import { notFound } from 'next/navigation';
import { CategoryForm } from '../../category-form';

interface EditCategoryPageProps {
  params: {
    id: string;
  };
}

export default async function EditCategoryPage({
  params,
}: EditCategoryPageProps) {
  const category = await getCategoryById(params.id);

  if (!category) {
    notFound();
  }

  return (
    <div className='mx-auto py-8 container'>
      <CategoryForm initialData={category} mode='edit' />
    </div>
  );
}
