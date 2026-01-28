import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
    size?: 'sm' | 'md';
}

export function Badge({
    children,
    variant = 'default',
    size = 'md',
    className,
    ...props
}: BadgeProps) {
    const variants = {
        default: 'bg-dark-700 text-dark-300',
        primary: 'bg-primary-500/20 text-primary-400',
        success: 'bg-accent-green/20 text-accent-green',
        warning: 'bg-accent-yellow/20 text-accent-yellow',
        danger: 'bg-accent-red/20 text-accent-red',
    };

    const sizes = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm',
    };

    return (
        <span
            className={cn(
                'inline-flex items-center rounded-full font-medium',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
}

export default Badge;
