import {
  EyeIcon,
  EyeOffIcon,
  Wand2,
  ClipboardCheck,
  Shield,
  CheckCircle,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import zxcvbn from 'zxcvbn';

type Props = {
  field: any;
  showPassGen?: boolean;
  className?: string;
};

const generatePassword = (length = 12) => {
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
};

const PasswordInputField = ({
  field,
  showPassGen = false,
  className,
}: Props) => {
  const [show, setShow] = useState(false);
  const [suggested, setSuggested] = useState('');
  const [copied, setCopied] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const passwordValue = field?.value || '';

  useEffect(() => {
    if (passwordValue) {
      const result = zxcvbn(passwordValue);
      setScore(result.score);
    } else {
      setScore(null);
    }
  }, [passwordValue]);

  const handleGenerate = () => {
    const pwd = generatePassword();
    setSuggested(pwd);
    setCopied(false);
  };

  const handleUsePassword = () => {
    field.onChange(suggested);
    setSuggested('');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(suggested);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const getStrengthConfig = (score: number | null) => {
    const configs = [
      {
        label: 'Very Weak',
        color: 'from-red-500 to-red-600',
        bgColor: 'bg-red-500/10',
        textColor: 'text-red-600 dark:text-red-400',
      },
      {
        label: 'Weak',
        color: 'from-orange-500 to-orange-600',
        bgColor: 'bg-orange-500/10',
        textColor: 'text-orange-600 dark:text-orange-400',
      },
      {
        label: 'Fair',
        color: 'from-yellow-500 to-yellow-600',
        bgColor: 'bg-yellow-500/10',
        textColor: 'text-yellow-600 dark:text-yellow-400',
      },
      {
        label: 'Strong',
        color: 'from-blue-500 to-blue-600',
        bgColor: 'bg-blue-500/10',
        textColor: 'text-blue-600 dark:text-blue-400',
      },
      {
        label: 'Very Strong',
        color: 'from-green-500 to-green-600',
        bgColor: 'bg-green-500/10',
        textColor: 'text-green-600 dark:text-green-400',
      },
    ];
    return configs[score ?? 0];
  };

  const strengthConfig = getStrengthConfig(score);

  return (
    <div className='space-y-3'>
      <div className='relative'>
        <Input
          {...field}
          type={show ? 'text' : 'password'}
          placeholder='Enter your password'
          className={cn('pr-20 transition-all duration-200', className)}
        />
        <div className='top-1/2 right-3 absolute flex items-center gap-2 -translate-y-1/2'>
          {showPassGen && (
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Wand2
                size={18}
                className='text-slate-500 hover:text-blue-500 dark:hover:text-blue-400 dark:text-slate-400 transition-colors cursor-pointer'
                onClick={handleGenerate}
              />
            </motion.div>
          )}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            {show ? (
              <EyeOffIcon
                size={18}
                onClick={() => setShow((prev) => !prev)}
                className='text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 dark:text-slate-400 transition-colors cursor-pointer'
              />
            ) : (
              <EyeIcon
                size={18}
                onClick={() => setShow((prev) => !prev)}
                className='text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 dark:text-slate-400 transition-colors cursor-pointer'
              />
            )}
          </motion.div>
        </div>
      </div>

      {/* Password Strength Indicator */}
      <AnimatePresence>
        {showPassGen && passwordValue && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className='space-y-2'>
            <div className='flex items-center gap-3'>
              <div className='flex-1 bg-slate-200/50 dark:bg-slate-700/50 backdrop-blur-sm rounded-full h-2 overflow-hidden'>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${((score ?? 0) + 1) * 20}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className={cn(
                    'h-full bg-gradient-to-r transition-all duration-300',
                    strengthConfig.color,
                  )}
                />
              </div>
              <Badge
                className={cn(
                  'text-xs font-medium border-0',
                  strengthConfig.bgColor,
                  strengthConfig.textColor,
                )}>
                <Shield className='mr-1 w-3 h-3' />
                {strengthConfig.label}
              </Badge>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Password Generator Suggestion */}
      <AnimatePresence>
        {showPassGen && suggested && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className='bg-white/70 dark:bg-slate-800/70 shadow-lg backdrop-blur-md p-4 border border-slate-200/50 dark:border-slate-700/50 rounded-xl'>
            {/* Background gradient */}
            <div className='absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-green-500/5 opacity-50 rounded-xl' />

            <div className='relative'>
              <div className='flex items-center gap-2 mb-3'>
                <div className='bg-gradient-to-r from-blue-600 to-blue-700 p-1.5 rounded-lg'>
                  <Wand2 className='w-3 h-3 text-white' />
                </div>
                <span className='font-semibold text-slate-900 dark:text-white text-sm'>
                  Generated Password
                </span>
                <Badge className='bg-gradient-to-r from-green-600 to-green-700 border-0 text-white text-xs'>
                  Secure
                </Badge>
              </div>

              <div className='flex justify-between items-center gap-3'>
                <code className='flex-1 bg-slate-100/50 dark:bg-slate-900/50 px-3 py-2 border border-slate-200/30 dark:border-slate-700/30 rounded-lg font-mono text-slate-700 dark:text-slate-300 text-sm truncate'>
                  {suggested}
                </code>

                <div className='flex flex-shrink-0 gap-2'>
                  <Button
                    size='sm'
                    onClick={handleUsePassword}
                    className='bg-gradient-to-r from-blue-600 hover:from-blue-700 to-blue-700 hover:to-blue-800 shadow-sm border-0 font-medium text-white text-xs'>
                    <CheckCircle className='mr-1 w-3 h-3' />
                    Use
                  </Button>

                  <Button
                    size='sm'
                    variant='outline'
                    onClick={handleCopy}
                    className='bg-white/80 hover:bg-white dark:bg-slate-800/80 dark:hover:bg-slate-700 border-slate-200/50 dark:border-slate-700/50 font-medium text-xs'>
                    {copied ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        className='flex items-center gap-1'>
                        <ClipboardCheck className='w-3 h-3 text-green-600' />
                        <span className='text-green-600'>Copied</span>
                      </motion.div>
                    ) : (
                      'Copy'
                    )}
                  </Button>
                </div>
              </div>

              {/* Security info */}
              <div className='flex items-center gap-2 mt-3 text-slate-600 dark:text-slate-400 text-xs'>
                <Shield className='w-3 h-3' />
                <span>12 characters • Mixed case • Numbers • Symbols</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PasswordInputField;
