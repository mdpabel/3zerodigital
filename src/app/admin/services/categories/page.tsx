import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit } from 'lucide-react';
import { getCategories } from '@/actions/service-actions';
import { DeleteCategoryButton } from './delete-category-button';

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className='mx-auto py-8 container'>
      <div className='flex justify-between items-center mb-8'>
        <div>
          <h1 className='font-bold text-3xl'>Categories</h1>
          <p className='text-muted-foreground'>
            Group and manage your services
          </p>
        </div>
        <Button asChild>
          <Link href='/admin/services/categories/create'>
            <Plus className='mr-2 w-4 h-4' />
            Create Category
          </Link>
        </Button>
      </div>

      {categories.length === 0 ? (
        <Card>
          <CardContent className='flex flex-col justify-center items-center py-12'>
            <p className='mb-4 text-muted-foreground'>No categories found</p>
            <Button asChild>
              <Link href='/admin/categories/create'>
                <Plus className='mr-2 w-4 h-4' />
                Create Your First Category
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className='gap-6 grid md:grid-cols-2 lg:grid-cols-3'>
          {categories.map((category) => (
            <Card key={category.id} className='flex flex-col'>
              <CardHeader>
                <div className='flex justify-between items-start'>
                  <CardTitle className='text-lg'>{category.name}</CardTitle>
                  {!category.isActive && (
                    <Badge variant='secondary'>Inactive</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className='flex flex-col flex-grow justify-between'>
                <p className='mb-4 text-muted-foreground text-sm'>
                  {category.description || 'No description provided.'}
                </p>
                <div className='flex justify-between items-center pt-4 border-t'>
                  <Button asChild variant='outline' size='sm'>
                    <Link
                      href={`/admin/services/categories/${category.id}/edit`}>
                      <Edit className='mr-1 w-4 h-4' />
                      Edit
                    </Link>
                  </Button>
                  <DeleteCategoryButton
                    categoryId={category.id}
                    categoryName={category.name}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
