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

type TemplateFormData = (CreateTemplateInput & Partial<UpdateTemplateInput>) & {
  // allow both so we can bridge regardless of schema shape
  fileKey?: string;
  fileUrl?: string;
};

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
    shouldFocusError: true,
    mode: 'onSubmit',
    defaultValues: initialData
      ? {
          ...initialData,
          // normalize nullable to undefined for zod optional()
          description: initialData.description ?? undefined,
          images: (initialData.images as unknown as string[]) ?? [],
          categoryIds: initialData.categories.map((c) => c.category.id),
          // try to populate both keys so either schema passes
          fileKey:
            (initialData as any).fileKey ?? (initialData as any).fileUrl ?? '',
          fileUrl:
            (initialData as any).fileUrl ?? (initialData as any).fileKey ?? '',
        }
      : {
          name: '',
          slug: '',
          liveUrl: '',
          fileKey: '', // UI shows "File Key"
          fileUrl: 'http://localhost:3000/',
          description: '',
          price: 0,
          salePrice: 0,
          images: [],
          categoryIds: [],
        },
  });

  console.log({ values: form.getValues() });

  const generateSlug = (name: string) =>
    name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

  // Ensure the payload matches whatever your schema/action expects
  const sanitizeForSubmit = (raw: TemplateFormData): TemplateFormData => {
    const price =
      typeof raw.price === 'number' ? raw.price : Number(raw.price ?? 0);
    const salePrice =
      raw.salePrice === undefined ||
      raw.salePrice === null ||
      raw.salePrice === 0
        ? undefined
        : typeof raw.salePrice === 'number'
          ? raw.salePrice
          : Number(raw.salePrice);

    // Bridge fileKey/fileUrl both ways so either schema passes
    const fileKey = raw.fileKey || raw.fileUrl || '';
    const fileUrl = raw.fileUrl || raw.fileKey || '';

    return {
      ...raw,
      price: Number.isFinite(price) ? price : 0,
      salePrice:
        salePrice !== undefined && !Number.isNaN(salePrice) ? salePrice : 0,
      images: Array.isArray(raw.images) ? raw.images : [],
      categoryIds: Array.isArray(raw.categoryIds) ? raw.categoryIds : [],
      fileKey,
      fileUrl,
      description: raw.description ?? undefined,
      slug: raw.slug?.trim() ?? '',
      name: raw.name?.trim() ?? '',
      liveUrl: raw.liveUrl?.trim() ?? '',
    };
  };

  const onSubmit: SubmitHandler<TemplateFormData> = async (data) => {
    const sanitized = sanitizeForSubmit(data);
    setIsLoading(true);
    try {
      const result =
        mode === 'create'
          ? await createTemplate(sanitized as CreateTemplateInput)
          : await updateTemplate(sanitized as UpdateTemplateInput);

      if (result?.success) {
        toast.success(result.message ?? 'Saved');
        router.push('/admin/templates');
        router.refresh();
      } else {
        toast.error(result?.message ?? 'Save failed');
      }
    } catch (e) {
      console.error(e);
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className='mx-auto max-w-4xl'>
      <CardHeader>
        <CardTitle>
          {mode === 'create' ? 'Create New Template' : 'Edit Template'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, (errs) => {
              console.warn('Form validation errors:', errs);
              toast.error('Please fix the highlighted fields.');
            })}
            className='space-y-6'
            // Optional: disable native validation bubbles
            noValidate>
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
                          form.setValue('slug', generateSlug(e.target.value), {
                            shouldValidate: true,
                            shouldDirty: true,
                            shouldTouch: true,
                          });
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
                      <Input placeholder='file-name.zip' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Hidden bridge input so schema expecting fileUrl also passes */}
              <input type='hidden' {...form.register('fileUrl')} />
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
                      <Input
                        type='number'
                        step='0.01'
                        value={field.value ?? ''}
                        onChange={(e) => {
                          const n = e.currentTarget.valueAsNumber;
                          field.onChange(Number.isNaN(n) ? undefined : n);
                        }}
                      />
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
                      <Input
                        type='number'
                        step='0.01'
                        value={field.value ?? ''}
                        onChange={(e) => {
                          const n = e.currentTarget.valueAsNumber;
                          field.onChange(Number.isNaN(n) ? undefined : n);
                        }}
                      />
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
                            .map((s) => s.trim())
                            .filter(Boolean),
                        )
                      }
                      value={(field.value ?? []).join('\n')}
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
                                  const isChecked = checked === true;
                                  if (isChecked) {
                                    field.onChange([
                                      ...(field.value || []),
                                      category.id,
                                    ]);
                                  } else {
                                    field.onChange(
                                      (field.value || []).filter(
                                        (id) => id !== category.id,
                                      ),
                                    );
                                  }
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
