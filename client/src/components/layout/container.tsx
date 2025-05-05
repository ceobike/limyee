"use client";

import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  fluid?: boolean;
  id?: string;
}

/**
 * Responsive container component
 */
export function Container({
  children,
  className,
  as: Component = 'div',
  fluid = false,
  id,
  ...props
}: ContainerProps) {
  return (
    <Component
      id={id}
      className={cn(
        fluid ? 'w-full px-4' : 'container mx-auto px-4',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
