import { type TextareaHTMLAttributes, forwardRef, useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: string;
    autoResize?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, error, autoResize = true, ...props }, ref) => {
        const internalRef = useRef<HTMLTextAreaElement>(null);
        const combinedRef = (ref as any) || internalRef;

        useEffect(() => {
            if (autoResize && combinedRef.current) {
                const textarea = combinedRef.current;
                const adjustHeight = () => {
                    textarea.style.height = 'auto';
                    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
                };
                textarea.addEventListener('input', adjustHeight);
                adjustHeight();
                return () => textarea.removeEventListener('input', adjustHeight);
            }
        }, [autoResize, props.value]);

        return (
            <div className="w-full relative">
                <textarea
                    ref={combinedRef}
                    className={cn(
                        'flex min-h-[48px] w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-base text-zinc-900',
                        'placeholder:text-zinc-400',
                        'focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900',
                        'disabled:cursor-not-allowed disabled:opacity-50',
                        'dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50',
                        'dark:placeholder:text-zinc-500',
                        'dark:focus:ring-white/10 dark:focus:border-zinc-700',
                        'transition-all duration-200 shadow-sm resize-none overflow-y-auto',
                        error && 'border-red-500 focus:ring-red-500/10 focus:border-red-500',
                        className
                    )}
                    {...props}
                />
                {error && <p className="mt-1.5 text-xs font-medium text-red-500 animate-in slide-in-from-top-1">{error}</p>}
            </div>
        );
    }
);

Textarea.displayName = 'Textarea';

export default Textarea;
