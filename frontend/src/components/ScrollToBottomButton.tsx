import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

interface ScrollToBottomButtonProps {
    isVisible: boolean;
    onClick: () => void;
}

export default function ScrollToBottomButton({ isVisible, onClick }: ScrollToBottomButtonProps) {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    onClick={onClick}
                    className="absolute bottom-28 right-6 md:right-8 z-20 rounded-full shadow-xl h-10 w-10 flex items-center justify-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                    <ArrowDown className="h-5 w-5" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
