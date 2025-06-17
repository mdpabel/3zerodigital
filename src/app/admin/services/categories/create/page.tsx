import { CategoryForm } from '../category-form';

export default function CreateCategoryPage() {
  return (
    <div className='mx-auto py-8 container'>
      <CategoryForm mode='create' />
    </div>
  );
}
