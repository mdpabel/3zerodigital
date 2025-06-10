'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Plus, Minus, Trash2, Loader2, ShoppingCart } from 'lucide-react';
import { createOrderSchema, CreateOrderInput } from '@/lib/validations/order';
import { toast } from '@/hooks/use-toast';
import { createOrder } from '@/actions/order-actions';
import { getServices } from '@/actions/service-actions';
import { Prisma } from '@prisma/client';

interface CartItem {
  serviceId: string;
  quantity: number;
  customAmount?: number;
  specifications?: Record<string, any>;
}

type Service = Prisma.ServiceGetPayload<{
  include: {
    category: true;
    relatedTo: {
      include: {
        category: true;
      };
    };
  };
}>;

interface CheckoutFormProps {
  services: Service[];
}

export function CheckoutForm({ services }: CheckoutFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState('');

  const form = useForm<CreateOrderInput>({
    resolver: zodResolver(createOrderSchema),
    defaultValues: {
      customerEmail: '',
      customerName: '',
      customerPhone: '',
      deliveryEmail: '',
      deliveryPhone: '',
      notes: '',
      items: [],
    },
  });

  const addToCart = () => {
    if (!selectedServiceId) return;

    const existingItem = cart.find(
      (item) => item.serviceId === selectedServiceId,
    );
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.serviceId === selectedServiceId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCart([...cart, { serviceId: selectedServiceId, quantity: 1 }]);
    }
    setSelectedServiceId('');
  };

  const updateQuantity = (serviceId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(serviceId);
      return;
    }

    setCart(
      cart.map((item) =>
        item.serviceId === serviceId ? { ...item, quantity } : item,
      ),
    );
  };

  const removeFromCart = (serviceId: string) => {
    setCart(cart.filter((item) => item.serviceId !== serviceId));
  };

  const updateCustomAmount = (serviceId: string, amount: number) => {
    setCart(
      cart.map((item) =>
        item.serviceId === serviceId ? { ...item, customAmount: amount } : item,
      ),
    );
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const service = services.find((s) => s.id === item.serviceId);
      if (!service) return total;

      const price = item.customAmount || Number(service.price);
      return total + Number(price) * item.quantity;
    }, 0);
  };

  const onSubmit = (data: Omit<CreateOrderInput, 'items'>) => {
    if (cart.length === 0) {
      toast({
        title: 'Error',
        description: 'Please add at least one service to your cart',
        variant: 'destructive',
      });
      return;
    }

    startTransition(async () => {
      const orderData = {
        ...data,
        items: cart,
      };

      const result = await createOrder(orderData);

      if (result.error) {
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Success',
          description: 'Order placed successfully! We will contact you soon.',
        });
        router.push(`/order-confirmation/${result.order?.id}`);
      }
    });
  };

  return (
    <div className='gap-8 grid grid-cols-1 lg:grid-cols-2'>
      {/* Service Selection & Cart */}
      <div className='space-y-6'>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <ShoppingCart className='w-5 h-5' />
              Select Services
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex gap-2'>
              <select
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value)}
                className='flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm'>
                <option value=''>Choose a service...</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name} - ${Number(service.price)}
                  </option>
                ))}
              </select>
              <Button
                onClick={addToCart}
                disabled={!selectedServiceId}
                variant='outline'>
                <Plus className='w-4 h-4' />
              </Button>
            </div>

            {cart.length === 0 ? (
              <p className='py-8 text-gray-500 text-center'>
                No services selected yet
              </p>
            ) : (
              <div className='space-y-3'>
                {cart.map((item) => {
                  const service = services.find((s) => s.id === item.serviceId);
                  if (!service) return null;

                  return (
                    <div key={item.serviceId} className='p-4 border rounded-lg'>
                      <div className='flex justify-between items-start mb-2'>
                        <div>
                          <h4 className='font-medium'>{service.name}</h4>
                          <Badge variant='outline' className='text-xs'>
                            {service.category.name}
                          </Badge>
                          {service.shortDesc && (
                            <p className='mt-1 text-gray-600 text-sm'>
                              {service.shortDesc}
                            </p>
                          )}
                        </div>
                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={() => removeFromCart(item.serviceId)}
                          className='text-red-600 hover:text-red-700'>
                          <Trash2 className='w-4 h-4' />
                        </Button>
                      </div>

                      <div className='flex justify-between items-center'>
                        <div className='flex items-center gap-2'>
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() =>
                              updateQuantity(item.serviceId, item.quantity - 1)
                            }>
                            <Minus className='w-3 h-3' />
                          </Button>
                          <span className='w-8 text-center'>
                            {item.quantity}
                          </span>
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() =>
                              updateQuantity(item.serviceId, item.quantity + 1)
                            }>
                            <Plus className='w-3 h-3' />
                          </Button>
                        </div>

                        <div className='text-right'>
                          <div className='text-gray-500 text-sm'>
                            ${item.customAmount || Number(service.price)} each
                          </div>
                          <div className='font-medium'>
                            $
                            {(
                              (item.customAmount || Number(service.price)) *
                              item.quantity
                            ).toFixed(2)}
                          </div>
                        </div>
                      </div>

                      <div className='mt-3'>
                        <Label className='text-xs'>
                          Custom Amount (optional)
                        </Label>
                        <Input
                          type='number'
                          step='0.01'
                          placeholder={`Default: $${Number(service.price)}`}
                          value={item.customAmount || ''}
                          onChange={(e) =>
                            updateCustomAmount(
                              item.serviceId,
                              parseFloat(e.target.value) || 0,
                            )
                          }
                          className='mt-1'
                        />
                      </div>
                    </div>
                  );
                })}

                <Separator />

                <div className='flex justify-between items-center font-bold text-lg'>
                  <span>Total:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Customer Information */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <div className='gap-4 grid grid-cols-1 md:grid-cols-2'>
                <div>
                  <Label htmlFor='customerName'>Full Name *</Label>
                  <Input
                    id='customerName'
                    {...form.register('customerName')}
                    className='mt-1'
                  />
                  {form.formState.errors.customerName && (
                    <p className='mt-1 text-red-600 text-sm'>
                      {form.formState.errors.customerName.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor='customerEmail'>Email Address *</Label>
                  <Input
                    id='customerEmail'
                    type='email'
                    {...form.register('customerEmail')}
                    className='mt-1'
                  />
                  {form.formState.errors.customerEmail && (
                    <p className='mt-1 text-red-600 text-sm'>
                      {form.formState.errors.customerEmail.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor='customerPhone'>Phone Number</Label>
                <Input
                  id='customerPhone'
                  {...form.register('customerPhone')}
                  className='mt-1'
                />
              </div>

              <Separator />

              <div className='space-y-4'>
                <h4 className='font-medium'>Delivery Information (Optional)</h4>

                <div>
                  <Label htmlFor='deliveryEmail'>Delivery Email</Label>
                  <Input
                    id='deliveryEmail'
                    type='email'
                    {...form.register('deliveryEmail')}
                    className='mt-1'
                    placeholder='Different email for delivery'
                  />
                </div>

                <div>
                  <Label htmlFor='deliveryPhone'>Delivery Phone</Label>
                  <Input
                    id='deliveryPhone'
                    {...form.register('deliveryPhone')}
                    className='mt-1'
                    placeholder='Different phone for delivery'
                  />
                </div>
              </div>

              <div>
                <Label htmlFor='notes'>Additional Notes</Label>
                <Textarea
                  id='notes'
                  {...form.register('notes')}
                  className='mt-1'
                  rows={4}
                  placeholder='Any specific requirements or additional information...'
                />
              </div>

              <Button
                type='submit'
                className='py-6 w-full'
                size='lg'
                disabled={isPending || cart.length === 0}>
                {isPending && <Loader2 className='mr-2 w-4 h-4 animate-spin' />}
                Place Order (${calculateTotal().toFixed(2)})
              </Button>

              <p className='text-gray-500 text-xs text-center'>
                By placing this order, you agree to our terms of service and
                privacy policy. We'll contact you within 24 hours to confirm
                your order and discuss next steps.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
