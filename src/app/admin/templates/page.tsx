import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit } from 'lucide-react';
import { getTemplates } from '@/actions/template-actions';
import Image from 'next/image';
import { DeleteTemplateButton } from './delete-template-button';

export default async function TemplatesPage() {
  const templates = await getTemplates();

  return (
    <div className='mx-auto py-8 container'>
      <div className='flex justify-between items-center mb-8'>
        <div>
          <h1 className='font-bold text-3xl'>Templates</h1>
          <p className='text-muted-foreground'>Manage your website templates</p>
        </div>
        <Button asChild>
          <Link href='/admin/templates/create'>
            <Plus className='mr-2 w-4 h-4' />
            Create Template
          </Link>
        </Button>
      </div>

      {templates.length === 0 ? (
        <Card>
          <CardContent className='flex flex-col justify-center items-center py-12'>
            <p className='mb-4 text-muted-foreground'>No templates found</p>
            <Button asChild>
              <Link href='/admin/templates/create'>
                <Plus className='mr-2 w-4 h-4' />
                Create Your First Template
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className='gap-6 grid md:grid-cols-2 lg:grid-cols-3'>
          {templates.map((template) => (
            <Card key={template.id} className='flex flex-col'>
              <CardHeader>
                <div className='relative mb-4 w-full aspect-video'>
                  <Image
                    src={template.images[0]}
                    alt={template.name}
                    fill
                    className='rounded-md object-cover'
                  />
                </div>
                <CardTitle className='text-lg'>{template.name}</CardTitle>
                <p className='font-semibold text-primary text-lg'>
                  ${template.salePrice.toFixed(2)}
                  <span className='ml-2 font-normal text-muted-foreground text-sm line-through'>
                    ${template.price.toFixed(2)}
                  </span>
                </p>
              </CardHeader>
              <CardContent className='flex flex-col flex-grow justify-between'>
                <div className='flex flex-wrap gap-1'>
                  {template.categories.map(({ category }) => (
                    <Badge key={category.id} variant='outline'>
                      {category.name}
                    </Badge>
                  ))}
                </div>
                <div className='flex justify-between items-center mt-4 pt-4 border-t'>
                  <Button asChild variant='outline' size='sm'>
                    <Link href={`/admin/templates/${template.id}/edit`}>
                      <Edit className='mr-1 w-4 h-4' />
                      Edit
                    </Link>
                  </Button>
                  <DeleteTemplateButton
                    templateId={template.id}
                    templateName={template.name}
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
