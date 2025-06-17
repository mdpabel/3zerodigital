'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';
import {
  CreateCategoryInput,
  UpdateCategoryInput,
  createCategorySchema,
  updateCategorySchema,
} from '@/lib/validations/category'; // (You'll create this)
import { Category } from '@prisma/client';
import { createCategory, updateCategory } from '@/actions/category-actions'; // (You'll create this)

type CategoryFormData = CreateCategoryInput & Partial<UpdateCategoryInput>;

interface CategoryFormProps {
  initialData?: Category;
  mode: 'create' | 'edit';
}

export function CategoryForm({ initialData, mode }: CategoryFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const schema =
    mode === 'create' ? createCategorySchema : updateCategorySchema;

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData || {
      name: '',
      slug: '',
      description: '',
      isActive: true,
    },
  });

  const onSubmit: SubmitHandler<CategoryFormData> = async (data) => {
    setIsLoading(true);
    try {
      const result =
        mode === 'create'
          ? await createCategory(data as CreateCategoryInput)
          : await updateCategory(data as UpdateCategoryInput);

      if (result.success) {
        toast.success(result.message);
        router.push('/admin/categories');
        router.refresh();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const generateSlug = (name: string) =>
    name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

  return (
    <Card className='mx-auto max-w-2xl'>
      <CardHeader>
        <CardTitle>
          {mode === 'create' ? 'Create New Category' : 'Edit Category'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        if (mode === 'create') {
                          form.setValue('slug', generateSlug(e.target.value));
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='slug'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='A brief description of the category...'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='isActive'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center space-x-2 space-y-0'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className='font-normal'>Active</FormLabel>
                </FormItem>
              )}
            />

            <div className='flex items-center space-x-4 pt-4'>
              <Button
                type='submit'
                disabled={isLoading}
                className='min-w-[120px]'>
                {isLoading
                  ? 'Saving...'
                  : mode === 'create'
                    ? 'Create Category'
                    : 'Update Category'}
              </Button>
              <Button
                type='button'
                variant='outline'
                onClick={() => router.push('/admin/categories')}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
