import { Send, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import Button from './ui/Button';
import Textarea from './ui/Textarea';

interface ChatInputProps {
    value: string;
    onChange: (value: string) => void;
    onSendMessage: (e: React.FormEvent) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    isSending: boolean;
    wordCount: number;
    maxWords: number;
    isOverLimit: boolean;
    inputRef: React.RefObject<HTMLTextAreaElement | null>;
}

export default function ChatInput({
    value,
    onChange,
    onSendMessage,
    onKeyDown,
    isSending,
    wordCount,
    maxWords,
    isOverLimit,
    inputRef
}: ChatInputProps) {
    return (
        <div className="p-4 md:p-8 bg-white dark:bg-black">
            <div className="max-w-3xl mx-auto">
                <div className="relative group bg-zinc-50 dark:bg-zinc-900/30 rounded-[32px] border border-zinc-200 dark:border-zinc-800 focus-within:border-zinc-400 dark:focus-within:border-zinc-600 focus-within:ring-4 focus-within:ring-black/5 dark:focus-within:ring-white/5 transition-all duration-300 shadow-sm">
                    <div className="flex items-end gap-2 p-2 pl-4">
                        <Textarea
                            ref={inputRef}
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            onKeyDown={onKeyDown}
                            placeholder="Ask anything or search for products..."
                            className="flex-1 bg-transparent border-0 focus:ring-0 px-0 py-4 shadow-none focus:border-0 rounded-none text-base min-h-[56px] max-h-[250px] placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                            disabled={isSending}
                            autoFocus
                        />
                        <div className="flex flex-col items-center gap-2 mb-2 mr-2">
                            <span className={cn(
                                "text-[10px] font-mono tabular-nums transition-colors px-2 py-1 rounded bg-zinc-200/50 dark:bg-zinc-800/50",
                                isOverLimit ? "text-red-500 font-bold bg-red-50 dark:bg-red-950/20" : "text-zinc-400 dark:text-zinc-500"
                            )}>
                                {wordCount.toLocaleString()}/{maxWords.toLocaleString()}
                            </span>
                            <Button
                                type="submit"
                                onClick={onSendMessage}
                                size="icon"
                                disabled={!value.trim() || isSending || isOverLimit}
                                className={cn(
                                    "h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 shadow-md",
                                    value.trim() && !isOverLimit
                                        ? "bg-black dark:bg-white text-white dark:text-black hover:scale-105 active:scale-95 shadow-black/10 dark:shadow-white/10"
                                        : "bg-zinc-200 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed grayscale"
                                )}
                            >
                                <Send className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-4 hidden md:block">
                    <p className="text-[11px] text-zinc-400 dark:text-zinc-600 font-medium tracking-wide">
                        <Sparkles className="inline-block w-3 h-3 mr-1 mb-0.5 opacity-50" />
                        AI-generated content may be inaccurate. Check important info.
                    </p>
                </div>
            </div>
        </div>
    );
}
