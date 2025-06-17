import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { getServices } from '@/actions/service-actions';
import { DeleteServiceButton } from './delete-service-button';

export default async function ServicesPage() {
  const services = await getServices(true);

  return (
    <div className='mx-auto py-8 container'>
      <div className='flex justify-between items-center mb-8'>
        <div>
          <h1 className='font-bold text-3xl'>Services</h1>
          <p className='text-muted-foreground'>Manage your agency services</p>
        </div>
        <Button asChild>
          <Link href='/admin/services/create'>
            <Plus className='mr-2 w-4 h-4' />
            Create Service
          </Link>
        </Button>
      </div>

      {services.length === 0 ? (
        <Card>
          <CardContent className='flex flex-col justify-center items-center py-12'>
            <p className='mb-4 text-muted-foreground'>No services found</p>
            <Button asChild>
              <Link href='/admin/services/create'>
                <Plus className='mr-2 w-4 h-4' />
                Create Your First Service
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className='gap-6 grid md:grid-cols-2 lg:grid-cols-3'>
          {services.map((service) => (
            <Card key={service.id}>
              <CardHeader>
                <div className='flex justify-between items-start'>
                  <div>
                    <CardTitle className='text-lg'>{service.name}</CardTitle>
                    <p className='text-muted-foreground text-sm'>
                      ${service.price.toString()}
                      {service.originalPrice && (
                        <span className='ml-2 line-through'>
                          ${service.originalPrice.toString()}
                        </span>
                      )}
                    </p>
                  </div>
                  <div className='flex items-center space-x-1'>
                    {!service.isActive && (
                      <Badge variant='secondary'>Inactive</Badge>
                    )}
                    {service.isPopular && (
                      <Badge variant='default'>Popular</Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <div>
                    <p className='mb-2 font-medium text-sm'>Categories:</p>
                    <div className='flex flex-wrap gap-1'>
                      {service.categories.map((category) => (
                        <Badge key={category.id} variant='outline'>
                          {category.name}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {service.features &&
                    (service.features as string[]).length > 0 && (
                      <div>
                        <p className='mb-2 font-medium text-sm'>Features:</p>

                        <ul className='space-y-3 mt-6'>
                          {Array.isArray(service.features) &&
                            service.features.slice(0, 3).map((feature, idx) => {
                              const value =
                                typeof feature === 'object' &&
                                feature !== null &&
                                'value' in feature
                                  ? (feature as any).value
                                  : feature;

                              return value ? (
                                <li
                                  key={idx}
                                  className='flex items-center text-slate-700 dark:text-slate-200'>
                                  <span>{value}</span>
                                </li>
                              ) : null;
                            })}

                          {(service.features as string[]).length > 3 && (
                            <li>
                              • +{(service.features as string[]).length - 3}{' '}
                              more...
                            </li>
                          )}
                        </ul>
                      </div>
                    )}

                  <div className='flex justify-between items-center pt-4'>
                    <Button asChild variant='outline' size='sm'>
                      <Link href={`/admin/services/${service.id}/edit`}>
                        <Edit className='mr-1 w-4 h-4' />
                        Edit
                      </Link>
                    </Button>
                    <DeleteServiceButton
                      serviceId={service.id}
                      serviceName={service.name}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
