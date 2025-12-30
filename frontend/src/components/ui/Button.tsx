import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
        return (
            <button
                ref={ref}
                disabled={isLoading || disabled}
                className={cn(
                    'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
                    {
                        'bg-black text-white hover:bg-gray-800 focus:ring-black dark:bg-white dark:text-black dark:hover:bg-gray-200': variant === 'primary',
                        'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700': variant === 'secondary',
                        'border border-gray-200 bg-transparent hover:bg-gray-50 text-gray-900 focus:ring-gray-200 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-800': variant === 'outline',
                        'bg-transparent hover:bg-gray-100 text-gray-700 dark:text-gray-300 dark:hover:bg-gray-800': variant === 'ghost',
                        'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500': variant === 'danger',
                        'h-8 px-3 text-sm': size === 'sm',
                        'h-10 px-5 text-sm': size === 'md',
                        'h-12 px-6 text-base': size === 'lg',
                        'h-10 w-10 p-0': size === 'icon',
                    },
                    className
                )}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';

export default Button;
