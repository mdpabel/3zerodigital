'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authClient } from '@/lib/auth-client';

export default function SecurityPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMsg(null);

    if (!currentPassword || !newPassword) {
      setMsg({ type: 'error', text: 'Please fill in all fields.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setMsg({
        type: 'error',
        text: 'New password and confirmation do not match.',
      });
      return;
    }
    if (newPassword.length < 8) {
      setMsg({
        type: 'error',
        text: 'Password should be at least 8 characters.',
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await authClient.changePassword({
        newPassword,
        currentPassword,
        revokeOtherSessions: true, // simple & safe default
      });

      if (error) {
        setMsg({
          type: 'error',
          text: error.message || 'Failed to update password.',
        });
      } else {
        setMsg({ type: 'success', text: 'Password updated successfully.' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (err: any) {
      setMsg({ type: 'error', text: err?.message || 'Something went wrong.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='space-y-6 mx-auto max-w-xl'>
      <div className='flex justify-between items-center'>
        <h1 className='font-bold text-3xl'>Security</h1>
        <Link
          href='/dashboard/account'
          className='text-blue-600 dark:text-blue-300 text-sm hover:underline'>
          ← Back to Account
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='currentPassword'>Current password</Label>
              <Input
                id='currentPassword'
                type='password'
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                autoComplete='current-password'
                required
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='newPassword'>New password</Label>
              <Input
                id='newPassword'
                type='password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                autoComplete='new-password'
                required
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='confirmPassword'>Confirm new password</Label>
              <Input
                id='confirmPassword'
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete='new-password'
                required
              />
            </div>

            {msg && (
              <p
                className={
                  'text-sm ' +
                  (msg.type === 'success'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-rose-600 dark:text-rose-400')
                }
                role='status'
                aria-live='polite'>
                {msg.text}
              </p>
            )}

            <div className='pt-2'>
              <Button
                type='submit'
                disabled={loading}
                className='w-full sm:w-auto'>
                {loading ? 'Updating…' : 'Update Password'}
              </Button>
            </div>

            <p className='text-gray-500 dark:text-gray-400 text-xs'>
              Tip: use at least 8 characters. You’ll be signed out on other
              devices after changing your password.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
