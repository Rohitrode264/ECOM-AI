import { cn } from '../../lib/utils';

interface LogoProps {
    className?: string;
    hideText?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className, hideText = false, size = 'md' }: LogoProps) {
    const sizeClasses = {
        sm: 'h-6 w-6',
        md: 'h-8 w-8',
        lg: 'h-12 w-12'
    };

    return (
        <div className={cn("flex items-center gap-2.5 group", className)}>
            <div className={cn(
                "relative flex items-center justify-center transition-transform duration-500 group-hover:rotate-[10deg]",
                sizeClasses[size]
            )}>
                {/* Abstract Modern Shape */}
                <div className="absolute inset-0 bg-gradient-to-tr from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 rounded-lg rotate-3 opacity-20 group-hover:rotate-6 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 dark:from-white dark:via-zinc-100 dark:to-zinc-200 rounded-lg -rotate-3 shadow-lg shadow-black/5 dark:shadow-white/5" />

                {/* Modern "T" Iconography */}
                <div className="relative flex flex-col items-center justify-center">
                    <div className="h-0.5 w-3 bg-white dark:bg-black rounded-full mb-0.5" />
                    <div className="h-2.5 w-0.5 bg-white dark:bg-black rounded-full" />
                </div>

                {/* Subtle Glow */}
                <div className="absolute -inset-1 bg-zinc-900/10 dark:bg-white/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {!hideText && (
                <div className="flex flex-col -space-y-1">
                    <span className={cn(
                        "font-bold tracking-tight text-zinc-900 dark:text-white leading-tight",
                        size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-2xl' : 'text-lg'
                    )}>
                        TechTrendz
                    </span>
                    <span className={cn(
                        "font-medium text-zinc-400 dark:text-zinc-500 tracking-[0.2em] uppercase",
                        size === 'sm' ? 'text-[8px]' : size === 'lg' ? 'text-[12px]' : 'text-[10px]'
                    )}>
                        AI Assistant
                    </span>
                </div>
            )}
        </div>
    );
}
