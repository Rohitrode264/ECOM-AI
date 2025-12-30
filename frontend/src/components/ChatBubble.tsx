import { cn } from '../lib/utils';
import type { Message } from '../types/chat';
import TypingIndicator from './ui/TypingIndicator';
import { Bot, User, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

interface ChatBubbleProps {
    message: Message;
}

export function ChatBubble({ message }: ChatBubbleProps) {
    const isUser = message.role === 'USER';
    const isSystem = message.role === 'SYSTEM';

    return (
        <div
            className={cn(
                "flex w-full mb-8 animate-in fade-in slide-in-from-bottom-2 duration-300",
                isUser ? "justify-end" : "justify-start"
            )}
        >
            <div className={cn("flex max-w-[85%] md:max-w-[75%] gap-4", isUser ? "flex-row-reverse" : "flex-row")}>
                {/* Avatar */}
                <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border shadow-sm",
                    isUser
                        ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black border-transparent"
                        : isSystem
                            ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-100 dark:border-red-900/30"
                            : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100"
                )}>
                    {isUser ? <User className="w-4 h-4" /> : isSystem ? <AlertCircle className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Bubble */}
                <div className={cn(
                    "space-y-1 overflow-hidden",
                    isUser ? "text-right" : "text-left"
                )}>
                    <div className={cn(
                        "inline-block rounded-2xl px-5 py-3 shadow-sm text-sm leading-6 transition-all",
                        isUser
                            ? "bg-zinc-900 dark:bg-white text-white dark:text-black rounded-tr-sm"
                            : isSystem
                                ? "bg-red-50 dark:bg-red-900/10 text-red-700 dark:text-red-400 border border-red-100 dark:border-red-900/20 rounded-tl-sm ring-1 ring-red-200 dark:ring-red-900/30"
                                : "bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 rounded-tl-sm"
                    )}>
                        {isUser ? (
                            message.content
                        ) : (
                            <div className="prose prose-sm prose-zinc dark:prose-invert max-w-none">
                                <ReactMarkdown>{message.content}</ReactMarkdown>
                            </div>
                        )}
                    </div>

                    {/* Timestamp (Optional - could add real time if available in future) */}
                    {/* <p className="text-[10px] text-gray-400 px-1">Just now</p> */}
                </div>
            </div>
        </div>
    );
}

export function LoadingBubble() {
    return (
        <div className="flex w-full mb-8 justify-start">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center border shadow-sm bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-blue-600 dark:text-blue-400">
                    <Bot className="w-4 h-4" />
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="px-3 py-2 rounded-2xl bg-zinc-100/50 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 rounded-tl-sm flex items-center"
                >
                    <TypingIndicator />
                </motion.div>
            </div>
        </div>
    )
}
