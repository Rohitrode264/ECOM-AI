import { motion } from 'framer-motion';

export default function TypingIndicator() {
    return (
        <div className="flex items-center gap-1 px-1">
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="w-1 h-1 bg-blue-500 dark:bg-blue-400 rounded-full"
                    animate={{
                        opacity: [0.3, 1, 0.3],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.15,
                    }}
                />
            ))}
        </div>
    );
}
