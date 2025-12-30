import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../lib/api';
import ChatSidebar from '../components/ChatSidebar';
import { ChatBubble, LoadingBubble } from '../components/ChatBubble';
import Button from '../components/ui/Button';
import { Skeleton } from '../components/ui/Skeleton';
import { Menu, RotateCcw, Truck, Clock, Cpu } from 'lucide-react';
import { cn } from '../lib/utils';
import { type Message, type Conversation } from '../types/chat';
import Logo from '../components/ui/Logo';
import ChatInput from '../components/ChatInput';
import ScrollToBottomButton from '../components/ScrollToBottomButton';

const STARTER_QUESTIONS = [
    { label: "Return policy", icon: RotateCcw, text: "What is your return policy?" },
    { label: "Shipping info", icon: Truck, text: "Do you ship to the USA?" },
    { label: "Support hours", icon: Clock, text: "What are your support hours?" },
    { label: "Product range", icon: Cpu, text: "What gadgets do you sell?" },
];

export default function ChatPage() {
    const { conversationId } = useParams<{ conversationId: string }>();
    const navigate = useNavigate();
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoadingHistory, setIsLoadingHistory] = useState(false);
    const [isLoadingConversations, setIsLoadingConversations] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (!isLoadingHistory && !isSending) {
            inputRef.current?.focus();
        }
    }, [conversationId, isLoadingHistory, isSending]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const jumpToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
    };

    const handleScroll = () => {
        if (messagesContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
            const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
            setShowScrollButton(!isNearBottom);
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isSending, isLoadingHistory]);

    useEffect(() => {
        const fetchConversations = async () => {
            if (conversations.length === 0) setIsLoadingConversations(true);
            try {
                const res = await api.get('/chat/list');
                setConversations(res.data);
            } catch (error) {
                console.error("Failed to load conversations", error);
            } finally {
                setIsLoadingConversations(false);
            }
        };
        fetchConversations();
    }, [conversationId]);

    useEffect(() => {
        if (!conversationId) {
            setMessages([]);
            setIsLoadingHistory(false);
            return;
        }

        const fetchHistory = async () => {
            setIsLoadingHistory(true);
            try {
                const res = await api.get(`/chat/history/${conversationId}`);
                setMessages(res.data.messages);
            } catch (error) {
                console.error("Failed to load history", error);
                navigate('/chat');
            } finally {
                setIsLoadingHistory(false);
            }
        };

        fetchHistory();
    }, [conversationId, navigate]);

    const maxWords = 1000;
    const wordCount = input.trim().split(/\s+/).filter(Boolean).length;
    const isOverLimit = wordCount > maxWords;

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isSending || isOverLimit) return;

        const tempMessage: Message = {
            id: Date.now().toString(),
            role: 'USER',
            content: input,
            createdAt: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, tempMessage]);
        setInput('');
        setIsSending(true);

        try {
            const res = await api.post('/chat/message', {
                message: tempMessage.content,
                conversationId,
            });

            const assistantMessage: Message = {
                id: Date.now().toString() + '-ai',
                role: 'ASSISTANT',
                content: res.data.reply,
                createdAt: new Date().toISOString(),
            };

            setMessages((prev) => [...prev, assistantMessage]);

            if (!conversationId && res.data.conversationId) {
                navigate(`/chat/${res.data.conversationId}`);
            }
        } catch (error: any) {
            console.error("Failed to send", error);

            const errorMessage: Message = {
                id: Date.now().toString() + '-err',
                role: 'SYSTEM',
                content: error.response?.data?.error || "I'm sorry, I'm having trouble connecting to the servers right now. Please try again in a moment.",
                createdAt: new Date().toISOString(),
            };

            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsSending(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(e as any);
        }
    };

    const handleNewChat = () => {
        navigate('/chat');
        setMessages([]);
        setSidebarOpen(false);
    };

    return (
        <div className="flex h-screen bg-zinc-50 dark:bg-black overflow-hidden transition-colors font-sans antialiased selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-black">

            <div
                className={cn(
                    "fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden",
                    sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setSidebarOpen(false)}
            />

            <div className={cn(
                "fixed inset-y-0 left-0 z-50 w-80 bg-white dark:bg-black shadow-2xl md:shadow-none transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 border-r border-zinc-200 dark:border-zinc-800",
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <ChatSidebar
                    conversations={conversations}
                    activeId={conversationId || null}
                    onNewChat={handleNewChat}
                    onCloseMobile={() => setSidebarOpen(false)}
                    isLoading={isLoadingConversations}
                />
            </div>

            <div className="flex-1 flex flex-col h-full relative w-full bg-white dark:bg-black">

                <div className="md:hidden flex items-center justify-between p-4 border-b border-zinc-100 dark:border-zinc-800 bg-white/80 dark:bg-black/80 backdrop-blur-md sticky top-0 z-30">
                    <div className="flex items-center gap-3">
                        <Button size="icon" variant="ghost" onClick={() => setSidebarOpen(true)} className="-ml-2 h-9 w-9">
                            <Menu className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
                        </Button>
                        <Logo size="md" />
                    </div>
                </div>

                <div
                    ref={messagesContainerRef}
                    onScroll={handleScroll}
                    className="flex-1 overflow-y-auto px-4 md:px-0"
                >
                    <div className="max-w-3xl mx-auto h-full flex flex-col">
                        {isLoadingHistory ? (
                            <div className="flex-1 py-6 md:py-10 space-y-8 px-4 md:px-6">
                                {/* Simulated conversation loading */}
                                <div className="flex justify-end w-full">
                                    <div className="space-y-2 w-full max-w-[70%] flex flex-col items-end">
                                        <Skeleton className="h-10 w-2/3 rounded-2xl rounded-tr-sm" />
                                    </div>
                                </div>
                                <div className="flex justify-start w-full">
                                    <div className="flex gap-4 w-full max-w-[80%]">
                                        <Skeleton className="h-8 w-8 rounded-lg shrink-0" />
                                        <div className="space-y-2 w-full">
                                            <Skeleton className="h-4 w-full" />
                                            <Skeleton className="h-4 w-[90%]" />
                                            <Skeleton className="h-4 w-[60%]" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end w-full">
                                    <div className="space-y-2 w-full max-w-[60%] flex flex-col items-end">
                                        <Skeleton className="h-10 w-full rounded-2xl rounded-tr-sm" />
                                    </div>
                                </div>
                            </div>
                        ) : messages.length === 0 ? (
                            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                                <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-900 rounded-2xl flex items-center justify-center mb-6 shadow-sm ring-1 ring-black/5 dark:ring-white/10">
                                    <Logo hideText size="lg" />
                                </div>
                                <h2 className="text-xl font-semibold mb-2 text-zinc-900 dark:text-white">Good Morning</h2>
                                <p className="text-zinc-500 text-sm max-w-sm leading-relaxed mb-8">
                                    I'm your personal shopping assistant. I can help you find products, track orders, or answer style questions.
                                </p>

                                <div className="grid grid-cols-2 gap-2.5 w-full max-w-2xl px-2 md:px-4">
                                    {STARTER_QUESTIONS.map((q, i) => (
                                        <button
                                            key={i}
                                            onClick={() => {
                                                setInput(q.text);
                                                setTimeout(() => {
                                                    const e = { preventDefault: () => { } } as React.FormEvent;
                                                    handleSendMessage(e);
                                                }, 0);
                                            }}
                                            className="flex flex-col gap-2 md:gap-3 p-3.5 md:p-5 text-left bg-zinc-50/50 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl hover:bg-white dark:hover:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-white/5 transition-all duration-300 group relative overflow-hidden shrink-0"
                                        >
                                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-white dark:bg-zinc-800 flex items-center justify-center border border-zinc-100 dark:border-zinc-700/50 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm shrink-0">
                                                <q.icon className="w-4 h-4 md:w-5 md:h-5 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
                                            </div>
                                            <div className="space-y-0.5 md:space-y-1">
                                                <span className="text-[12px] md:text-sm font-semibold text-zinc-900 dark:text-white block tracking-tight truncate">{q.label}</span>
                                                <span className="text-[10px] md:text-xs text-zinc-500 dark:text-zinc-400 leading-tight font-medium block line-clamp-2">
                                                    {q.text}
                                                </span>
                                            </div>
                                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-zinc-900 dark:bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left opacity-10" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="flex-1 py-6 md:py-10">
                                {messages.map((msg) => (
                                    <ChatBubble key={msg.id} message={msg} />
                                ))}
                                {isSending && <LoadingBubble />}
                                <div ref={messagesEndRef} />
                            </div>
                        )}
                    </div>
                </div>

                <ScrollToBottomButton
                    isVisible={showScrollButton}
                    onClick={jumpToBottom}
                />

                <ChatInput
                    inputRef={inputRef}
                    value={input}
                    onChange={setInput}
                    onSendMessage={handleSendMessage}
                    onKeyDown={handleKeyDown}
                    isSending={isSending}
                    wordCount={wordCount}
                    maxWords={maxWords}
                    isOverLimit={isOverLimit}
                />
            </div>
        </div>
    );
}
