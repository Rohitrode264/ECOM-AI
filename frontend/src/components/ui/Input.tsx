import { type InputHTMLAttributes, forwardRef, useState } from 'react';
import { cn } from '../../lib/utils';
import { Eye, EyeOff } from 'lucide-react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, error, type, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);
        const isPassword = type === 'password';
        const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

        return (
            <div className="w-full relative">
                <input
                    ref={ref}
                    type={inputType}
                    className={cn(
                        'flex h-11 w-full rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-900',
                        'placeholder:text-zinc-400',
                        'focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900',
                        'disabled:cursor-not-allowed disabled:opacity-50',
                        'dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50',
                        'dark:placeholder:text-zinc-500',
                        'dark:focus:ring-white/10 dark:focus:border-zinc-700',
                        'transition-all duration-200 shadow-sm',
                        error && 'border-red-500 focus:ring-red-500/10 focus:border-red-500',
                        isPassword && 'pr-11',
                        className
                    )}
                    {...props}
                />

                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-3 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 focus:outline-none transition-colors"
                        tabIndex={-1}
                    >
                        {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                        ) : (
                            <Eye className="h-4 w-4" />
                        )}
                    </button>
                )}

                {error && <p className="mt-1.5 text-xs font-medium text-red-500 animate-in slide-in-from-top-1">{error}</p>}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
