// components/admin/service-form.tsx
'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Loader2 } from 'lucide-react';
import {
  createServiceSchema,
  CreateServiceInput,
} from '@/lib/validations/service';
import { toast } from '@/hooks/use-toast';
import { createService, updateService } from '@/actions/service-actions';

interface ServiceFormProps {
  categories: Array<{ id: string; name: string }>;
  services: Array<{ id: string; name: string; category: { name: string } }>;
  initialData?: any;
}

export function ServiceForm({
  categories,
  services,
  initialData,
}: ServiceFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [features, setFeatures] = useState<string[]>(
    initialData?.features || [],
  );
  const [guarantees, setGuarantees] = useState<string[]>(
    initialData?.guarantees || [],
  );
  const [newFeature, setNewFeature] = useState('');
  const [newGuarantee, setNewGuarantee] = useState('');

  const form = useForm<CreateServiceInput>({
    resolver: zodResolver(createServiceSchema),
    defaultValues: {
      name: initialData?.name || '',
      slug: initialData?.slug || '',
      description: initialData?.description || '',
      shortDesc: initialData?.shortDesc || '',
      price: initialData?.price || 0,
      originalPrice: initialData?.originalPrice || undefined,
      isActive: initialData?.isActive ?? true,
      isPopular: initialData?.isPopular ?? false,
      isUrgent: initialData?.isUrgent ?? false,
      responseTime: initialData?.responseTime || '',
      completionTime: initialData?.completionTime || '',
      icon: initialData?.icon || '',
      color: initialData?.color || '',
      bgGradient: initialData?.bgGradient || '',
      bestFor: initialData?.bestFor || '',
      categoryId: initialData?.categoryId || '',
      relatedServiceIds: initialData?.relatedTo?.map((s: any) => s.id) || [],
    },
  });

  const onSubmit = (data: CreateServiceInput) => {
    startTransition(async () => {
      const payload = {
        ...data,
        features,
        guarantees,
      };

      const result = initialData
        ? await updateService({ ...payload, id: initialData.id })
        : await createService(payload);

      if (result.error) {
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Success',
          description: initialData
            ? 'Service updated successfully'
            : 'Service created successfully',
        });
        router.push('/admin/services');
      }
    });
  };

  const addFeature = () => {
    if (newFeature.trim() && !features.includes(newFeature.trim())) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const removeFeature = (feature: string) => {
    setFeatures(features.filter((f) => f !== feature));
  };

  const addGuarantee = () => {
    if (newGuarantee.trim() && !guarantees.includes(newGuarantee.trim())) {
      setGuarantees([...guarantees, newGuarantee.trim()]);
      setNewGuarantee('');
    }
  };

  const removeGuarantee = (guarantee: string) => {
    setGuarantees(guarantees.filter((g) => g !== guarantee));
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
      <div className='gap-6 grid grid-cols-1 md:grid-cols-2'>
        {/* Basic Information */}
        <div className='space-y-4'>
          <div>
            <Label htmlFor='name'>Service Name</Label>
            <Input id='name' {...form.register('name')} className='mt-1' />
            {form.formState.errors.name && (
              <p className='mt-1 text-red-600 text-sm'>
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor='slug'>Slug</Label>
            <Input
              id='slug'
              {...form.register('slug')}
              className='mt-1'
              placeholder='service-name'
            />
            {form.formState.errors.slug && (
              <p className='mt-1 text-red-600 text-sm'>
                {form.formState.errors.slug.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor='shortDesc'>Short Description</Label>
            <Textarea
              id='shortDesc'
              {...form.register('shortDesc')}
              className='mt-1'
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor='description'>Full Description</Label>
            <Textarea
              id='description'
              {...form.register('description')}
              className='mt-1'
              rows={4}
            />
          </div>
        </div>

        {/* Pricing and Category */}
        <div className='space-y-4'>
          <div className='gap-4 grid grid-cols-2'>
            <div>
              <Label htmlFor='price'>Price ($)</Label>
              <Input
                id='price'
                type='number'
                step='0.01'
                {...form.register('price', { valueAsNumber: true })}
                className='mt-1'
              />
              {form.formState.errors.price && (
                <p className='mt-1 text-red-600 text-sm'>
                  {form.formState.errors.price.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor='originalPrice'>Original Price ($)</Label>
              <Input
                id='originalPrice'
                type='number'
                step='0.01'
                {...form.register('originalPrice', { valueAsNumber: true })}
                className='mt-1'
                placeholder='Optional'
              />
            </div>
          </div>

          <div>
            <Label htmlFor='categoryId'>Category</Label>
            <select
              id='categoryId'
              {...form.register('categoryId')}
              className='block mt-1 px-3 py-2 border border-gray-300 rounded-md w-full text-sm'>
              <option value=''>Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {form.formState.errors.categoryId && (
              <p className='mt-1 text-red-600 text-sm'>
                {form.formState.errors.categoryId.message}
              </p>
            )}
          </div>

          <div className='gap-4 grid grid-cols-2'>
            <div>
              <Label htmlFor='responseTime'>Response Time</Label>
              <Input
                id='responseTime'
                {...form.register('responseTime')}
                className='mt-1'
                placeholder='< 2 hours'
              />
            </div>

            <div>
              <Label htmlFor='completionTime'>Completion Time</Label>
              <Input
                id='completionTime'
                {...form.register('completionTime')}
                className='mt-1'
                placeholder='4-8 hours'
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div>
        <Label>Features</Label>
        <div className='space-y-2 mt-2'>
          <div className='flex gap-2'>
            <Input
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              placeholder='Add a feature'
              onKeyPress={(e) =>
                e.key === 'Enter' && (e.preventDefault(), addFeature())
              }
            />
            <Button type='button' onClick={addFeature} variant='outline'>
              <Plus className='w-4 h-4' />
            </Button>
          </div>
          <div className='flex flex-wrap gap-2'>
            {features.map((feature, index) => (
              <Badge key={index} variant='secondary' className='pr-1'>
                {feature}
                <button
                  type='button'
                  onClick={() => removeFeature(feature)}
                  className='ml-1 hover:text-red-600'>
                  <X className='w-3 h-3' />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Guarantees */}
      <div>
        <Label>Guarantees</Label>
        <div className='space-y-2 mt-2'>
          <div className='flex gap-2'>
            <Input
              value={newGuarantee}
              onChange={(e) => setNewGuarantee(e.target.value)}
              placeholder='Add a guarantee'
              onKeyPress={(e) =>
                e.key === 'Enter' && (e.preventDefault(), addGuarantee())
              }
            />
            <Button type='button' onClick={addGuarantee} variant='outline'>
              <Plus className='w-4 h-4' />
            </Button>
          </div>
          <div className='flex flex-wrap gap-2'>
            {guarantees.map((guarantee, index) => (
              <Badge key={index} variant='secondary' className='pr-1'>
                {guarantee}
                <button
                  type='button'
                  onClick={() => removeGuarantee(guarantee)}
                  className='ml-1 hover:text-red-600'>
                  <X className='w-3 h-3' />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className='gap-6 grid grid-cols-1 md:grid-cols-3'>
        <div className='flex justify-between items-center'>
          <Label htmlFor='isActive'>Active</Label>
          <Switch
            id='isActive'
            checked={form.watch('isActive')}
            onCheckedChange={(checked) => form.setValue('isActive', checked)}
          />
        </div>

        <div className='flex justify-between items-center'>
          <Label htmlFor='isPopular'>Popular</Label>
          <Switch
            id='isPopular'
            checked={form.watch('isPopular')}
            onCheckedChange={(checked) => form.setValue('isPopular', checked)}
          />
        </div>

        <div className='flex justify-between items-center'>
          <Label htmlFor='isUrgent'>Urgent</Label>
          <Switch
            id='isUrgent'
            checked={form.watch('isUrgent')}
            onCheckedChange={(checked) => form.setValue('isUrgent', checked)}
          />
        </div>
      </div>

      {/* Submit */}
      <div className='flex gap-4 pt-6'>
        <Button type='submit' disabled={isPending}>
          {isPending && <Loader2 className='mr-2 w-4 h-4 animate-spin' />}
          {initialData ? 'Update Service' : 'Create Service'}
        </Button>
        <Button type='button' variant='outline' onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
