// components/ui/loading-button.tsx
import { Button, buttonVariants } from './button';
import { cn } from '@/lib/utils';
import { VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import React from 'react';

type LoadingButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  } & {
    loading?: boolean;
  };

export const LoadingButton = ({ loading, children, className, ...props }: LoadingButtonProps) => {
  return (
    <Button className={cn('flex items-center gap-2', className)} disabled={loading} {...props}>
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
};
