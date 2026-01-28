import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'elevated' | 'glass';
    hover?: boolean;
    padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({
    children,
    variant = 'default',
    hover = false,
    padding = 'md',
    className,
    ...props
}: CardProps) {
    const baseStyles = 'rounded-xl';

    const variants = {
        default: 'bg-dark-800 border border-dark-700',
        elevated: 'bg-dark-800 border border-dark-700 shadow-xl shadow-black/20',
        glass: 'bg-dark-800/80 backdrop-blur-lg border border-dark-700/50',
    };

    const paddings = {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
    };

    const hoverStyles = hover
        ? 'hover:border-dark-600 hover:bg-dark-750 transition-all duration-200 cursor-pointer'
        : '';

    return (
        <div
            className={cn(
                baseStyles,
                variants[variant],
                paddings[padding],
                hoverStyles,
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> { }

export function CardHeader({ children, className, ...props }: CardHeaderProps) {
    return (
        <div className={cn('mb-4', className)} {...props}>
            {children}
        </div>
    );
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> { }

export function CardTitle({ children, className, ...props }: CardTitleProps) {
    return (
        <h3 className={cn('text-lg font-semibold text-dark-50', className)} {...props}>
            {children}
        </h3>
    );
}

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> { }

export function CardDescription({ children, className, ...props }: CardDescriptionProps) {
    return (
        <p className={cn('text-sm text-dark-400 mt-1', className)} {...props}>
            {children}
        </p>
    );
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> { }

export function CardContent({ children, className, ...props }: CardContentProps) {
    return (
        <div className={cn('', className)} {...props}>
            {children}
        </div>
    );
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> { }

export function CardFooter({ children, className, ...props }: CardFooterProps) {
    return (
        <div className={cn('mt-4 pt-4 border-t border-dark-700', className)} {...props}>
            {children}
        </div>
    );
}

export default Card;
