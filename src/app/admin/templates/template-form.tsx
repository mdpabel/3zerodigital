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
  CreateTemplateInput,
  UpdateTemplateInput,
  createTemplateSchema,
  updateTemplateSchema,
} from '@/lib/validations/template';
import { Template, TemplateCategory } from '@prisma/client';
import { createTemplate, updateTemplate } from '@/actions/template-actions';

type TemplateWithCategories = Template & {
  categories: { category: TemplateCategory }[];
};

type TemplateFormData = CreateTemplateInput & Partial<UpdateTemplateInput>;

interface TemplateFormProps {
  initialData?: TemplateWithCategories;
  allCategories: TemplateCategory[];
  mode: 'create' | 'edit';
}

export function TemplateForm({
  initialData,
  allCategories,
  mode,
}: TemplateFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const schema =
    mode === 'create' ? createTemplateSchema : updateTemplateSchema;

  const form = useForm<TemplateFormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData
      ? {
          ...initialData,
          // THE FIX: Convert `null` to `undefined` to match the Zod schema.
          // This resolves all three TypeScript errors.
          description: initialData.description ?? undefined,
          images: initialData.images,
          categoryIds: initialData.categories.map((c) => c.category.id),
        }
      : {
          name: '',
          slug: '',
          fileUrl: '',
          liveUrl: '',
          description: '',
          price: 0,
          salePrice: 0,
          images: [],
          categoryIds: [],
        },
  });

  const onSubmit: SubmitHandler<TemplateFormData> = async (data) => {
    setIsLoading(true);
    try {
      const result =
        mode === 'create'
          ? await createTemplate(data as CreateTemplateInput)
          : await updateTemplate(data as UpdateTemplateInput);

      if (result.success) {
        toast.success(result.message);
        router.push('/admin/templates');
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
    <Card className='mx-auto max-w-4xl'>
      <CardHeader>
        <CardTitle>
          {mode === 'create' ? 'Create New Template' : 'Edit Template'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            {/* Basic Info */}
            <div className='gap-4 grid grid-cols-1 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Template Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          form.setValue('slug', generateSlug(e.target.value));
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
            </div>

            {/* URLs */}
            <div className='gap-4 grid grid-cols-1 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='liveUrl'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Live URL</FormLabel>
                    <FormControl>
                      <Input placeholder='https://...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='fileKey'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>File Key (From Cloudflare)</FormLabel>
                    <FormControl>
                      <Input placeholder='https://...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Pricing */}
            <div className='gap-4 grid grid-cols-1 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='price'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type='number' step='0.01' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='salePrice'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sale Price</FormLabel>
                    <FormControl>
                      <Input type='number' step='0.01' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Description */}
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea rows={4} {...field} value={field.value ?? ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image URLs */}
            <FormField
              control={form.control}
              name='images'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URLs</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Enter one image URL per line.'
                      rows={4}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value
                            .split('\n')
                            .filter((url) => url.trim() !== ''),
                        )
                      }
                      value={(field.value || []).join('\n')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Categories */}
            <FormField
              control={form.control}
              name='categoryIds'
              render={() => (
                <FormItem>
                  <FormLabel>Categories</FormLabel>
                  <div className='gap-2 grid grid-cols-2 md:grid-cols-4 mt-2 p-4 border rounded-md'>
                    {allCategories.map((category) => (
                      <FormField
                        key={category.id}
                        control={form.control}
                        name='categoryIds'
                        render={({ field }) => (
                          <FormItem className='flex items-center space-x-2 space-y-0'>
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(category.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...(field.value || []),
                                        category.id,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (id) => id !== category.id,
                                        ),
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className='font-normal text-sm'>
                              {category.name}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Actions */}
            <div className='flex items-center space-x-4 pt-4'>
              <Button
                type='submit'
                disabled={isLoading}
                className='min-w-[120px]'>
                {isLoading
                  ? 'Saving...'
                  : mode === 'create'
                    ? 'Create Template'
                    : 'Update Template'}
              </Button>
              <Button
                type='button'
                variant='outline'
                onClick={() => router.push('/admin/templates')}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
