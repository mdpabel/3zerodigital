// components/delete-service-button.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';
import { deleteService } from '@/actions/service-actions';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
interface DeleteServiceButtonProps {
  serviceId: string;
  serviceName: string;
}

export function DeleteServiceButton({
  serviceId,
  serviceName,
}: DeleteServiceButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      const result = await deleteService(serviceId);

      if (result.success) {
        toast.success(result.message);
        setIsOpen(false);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant='destructive' size='sm'>
          <Trash2 className='mr-1 w-4 h-4' />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Service</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete "{serviceName}"? This action cannot
            be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isLoading}
            className='bg-destructive hover:bg-destructive/90 text-destructive-foreground'>
            {isLoading ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
