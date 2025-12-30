import { useNavigate } from 'react-router-dom';
import type { Conversation } from '../types/chat';
import { cn } from '../lib/utils';
import { MessageSquare, Plus, LogOut, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from './ui/Button';
import { Skeleton } from './ui/Skeleton';
import Logo from './ui/Logo';

interface SidebarProps {
    conversations: Conversation[];
    activeId: string | null;
    onNewChat: () => void;
    onCloseMobile?: () => void;
    isLoading?: boolean;
}

export default function ChatSidebar({ conversations, activeId, onNewChat, onCloseMobile, isLoading }: SidebarProps) {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const formatTimeAgo = (dateStr: string) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diffInSeconds < 60) return 'now';
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) return `${diffInMinutes}m`;
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours}h`;
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) return `${diffInDays}d`;
        return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex flex-col h-full w-full bg-white dark:bg-black border-r border-zinc-200 dark:border-zinc-800">
            {/* Header */}
            <div className="p-4 flex items-center justify-between">
                <Logo className="px-2" />

                {onCloseMobile && (
                    <button onClick={onCloseMobile} className="md:hidden p-2 text-zinc-500 hover:text-black dark:hover:text-white">
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>

            <div className="px-4 pb-4">
                <Button
                    onClick={onNewChat}
                    className="w-full justify-start gap-2 bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black shadow-sm transition-all"
                >
                    <Plus className="w-4 h-4" />
                    New Chat
                </Button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto px-2 space-y-0.5">
                <div className="px-3 py-2 text-xs font-medium text-zinc-400 uppercase tracking-wider">
                    History
                </div>

                {isLoading ? (
                    <div className="space-y-2 px-2 mt-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center gap-3 px-3 py-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/50">
                                <Skeleton className="h-4 w-4 rounded-sm" />
                                <Skeleton className="h-4 w-3/4 rounded-sm" />
                            </div>
                        ))}
                    </div>
                ) : conversations.length === 0 ? (
                    <div className="text-center py-8 text-zinc-500 text-xs">
                        No chats yet.
                    </div>
                ) : (
                    conversations.map((chat) => (
                        <button
                            key={chat.id}
                            onClick={() => {
                                navigate(`/chat/${chat.id}`);
                                onCloseMobile?.();
                            }}
                            className={cn(
                                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 group relative",
                                activeId === chat.id
                                    ? "bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white font-medium"
                                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 hover:text-black dark:hover:text-white"
                            )}
                        >
                            <MessageSquare className={cn(
                                "w-4 h-4 shrink-0 transition-colors opacity-70",
                                activeId === chat.id ? "opacity-100" : "group-hover:opacity-100"
                            )} />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                    <p className="text-sm truncate leading-none">
                                        {chat.title || 'New Conversation'}
                                    </p>
                                    <span className="text-[10px] text-zinc-400 font-medium shrink-0">
                                        {formatTimeAgo(chat.updatedAt)}
                                    </span>
                                </div>
                            </div>
                        </button>
                    ))
                )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-3 px-2 py-2 mb-2 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800/50">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-zinc-200 to-zinc-400 dark:from-zinc-700 dark:to-zinc-900 flex items-center justify-center">
                        <span className="text-xs font-medium">ME</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-zinc-900 dark:text-white">My Account</p>
                        <p className="text-xs text-zinc-500 truncate">Free Plan</p>
                    </div>
                </div>
                <Button
                    onClick={handleLogout}
                    variant="ghost"
                    className="w-full justify-start gap-2 text-zinc-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/10 h-9"
                >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                </Button>
            </div>
        </div>
    );
}
