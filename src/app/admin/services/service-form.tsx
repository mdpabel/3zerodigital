'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
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
import { Trash2, Plus } from 'lucide-react';
import {
  CreateServiceInput,
  UpdateServiceInput,
  createServiceSchema,
  updateServiceSchema,
} from '@/lib/validations/service';
import { Category, Service } from '@prisma/client';
import { createService, updateService } from '@/actions/service-actions';

// A type for the data passed from the Server Component, with Decimals converted
type SerializableService = Omit<Service, 'price' | 'originalPrice'> & {
  price: number;
  originalPrice?: number | null;
  categories: Category[];
};

// Unified type for the form data
type ServiceFormData = CreateServiceInput & Partial<UpdateServiceInput>;

interface ServiceFormProps {
  categories: Category[];
  // UPDATE: Use the new serializable type for initialData
  initialData?: SerializableService;
  mode: 'create' | 'edit';
}

export function ServiceForm({
  categories,
  initialData,
  mode,
}: ServiceFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const schema = mode === 'create' ? createServiceSchema : updateServiceSchema;

  const form = useForm<ServiceFormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData
      ? {
          ...initialData,
          // No more .toNumber() needed here as it's already a number
          price: initialData.price,
          originalPrice: initialData.originalPrice ?? undefined,
          icon: initialData.icon || undefined,
          categoryIds: initialData.categories.map((cat) => cat.id),
          features:
            (initialData.features as string[])?.map((feature) => ({
              value: feature,
            })) || [],
        }
      : {
          name: '',
          slug: '',
          description: '',
          price: 0,
          originalPrice: undefined,
          icon: undefined,
          isActive: true,
          isPopular: false,
          features: [],
          categoryIds: [],
        },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'features',
  });

  const onSubmit: SubmitHandler<ServiceFormData> = async (data) => {
    setIsLoading(true);
    try {
      const result =
        mode === 'create'
          ? await createService(data as CreateServiceInput)
          : await updateService(data as UpdateServiceInput);

      if (result.success) {
        toast.success(result.message);
        router.push('/admin/services');
        router.refresh();
      } else {
        toast.error(result.message);
        if (result.errors) {
          Object.entries(result.errors).forEach(([field, messages]) => {
            if (messages) {
              messages.forEach((message) =>
                toast.error(`${field}: ${message}`),
              );
            }
          });
        }
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  return (
    <Card className='mx-auto max-w-4xl'>
      <CardHeader>
        <CardTitle>
          {mode === 'create' ? 'Create New Service' : 'Edit Service'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            {/* ... The rest of your form JSX remains the same ... */}
            <div className='gap-4 grid grid-cols-1 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Name</FormLabel>
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
            </div>

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='A detailed description of the service...'
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='gap-4 grid grid-cols-1 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='price'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (CAD)</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        step='0.01'
                        min='0'
                        {...field}
                        onChange={(e) => field.onChange(+e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='originalPrice'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Original Price (CAD)</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        step='0.01'
                        min='0'
                        {...field}
                        onChange={(e) => field.onChange(+e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='icon'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='e.g., Code, Wrench, TrendingUp'
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='categoryIds'
              render={() => (
                <FormItem>
                  <FormLabel>Categories</FormLabel>
                  <div className='gap-2 grid grid-cols-2 md:grid-cols-3 mt-2'>
                    {categories.map((category) => (
                      <FormField
                        key={category.id}
                        control={form.control}
                        name='categoryIds'
                        render={({ field }) => (
                          <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(category.id)}
                                onCheckedChange={(checked) => {
                                  const currentIds = field.value || [];
                                  return checked
                                    ? field.onChange([
                                        ...currentIds,
                                        category.id,
                                      ])
                                    : field.onChange(
                                        currentIds.filter(
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

            <div>
              <div className='flex justify-between items-center mb-2'>
                <Label>Features</Label>
                <Button
                  type='button'
                  variant='outline'
                  size='sm'
                  onClick={() => append({ value: '' })}>
                  <Plus className='mr-1 w-4 h-4' />
                  Add Feature
                </Button>
              </div>
              <div className='space-y-2'>
                {fields.map((field, index) => (
                  <FormField
                    key={field.id}
                    control={form.control}
                    name={`features.${index}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <div className='flex items-center space-x-2'>
                          <FormControl>
                            <Input {...field} placeholder='Enter feature' />
                          </FormControl>
                          <Button
                            type='button'
                            variant='outline'
                            size='sm'
                            onClick={() => remove(index)}>
                            <Trash2 className='w-4 h-4' />
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>

            <div className='flex items-center space-x-6'>
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
              <FormField
                control={form.control}
                name='isPopular'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-center space-x-2 space-y-0'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className='font-normal'>Popular</FormLabel>
                  </FormItem>
                )}
              />
            </div>

            <div className='flex items-center space-x-4 pt-4'>
              <Button
                type='submit'
                disabled={isLoading}
                className='min-w-[120px]'>
                {isLoading
                  ? 'Saving...'
                  : mode === 'create'
                    ? 'Create Service'
                    : 'Update Service'}
              </Button>
              <Button
                type='button'
                variant='outline'
                onClick={() => router.push('/admin/services')}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
