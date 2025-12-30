import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import Logo from '../components/ui/Logo';

export default function AuthLayout({ children, title, subtitle }: { children: ReactNode; title: string; subtitle?: string }) {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-zinc-50 dark:bg-black relative overflow-hidden p-4">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-200 to-zinc-50 dark:from-zinc-900 dark:via-[#0a0a0a] dark:to-black opacity-100 z-0"></div>
            {/* Ambient Background Glow */}
            <div className="absolute top-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-zinc-300/30 dark:bg-zinc-800/20 blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[-20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-zinc-400/20 dark:bg-zinc-800/20 blur-[100px] pointer-events-none"></div>
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-md bg-white/60 dark:bg-black/40 backdrop-blur-2xl rounded-3xl shadow-xl shadow-zinc-200/50 dark:shadow-black/50 border border-white/40 dark:border-white/10 p-8 sm:p-10 relative z-10"
            >
                <div className="mb-8 text-center space-y-4">
                    <div className="flex justify-center mb-6">
                        <Logo size="md" />
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h1>
                        {subtitle && <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{subtitle}</p>}
                    </div>
                </div>
                {children}
            </motion.div>
        </div>
    );
}
