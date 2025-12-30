import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { MessageSquare, Bot, Database, Lock, Clock, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import Logo from '../components/ui/Logo';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-50 font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">

            {/* Navbar */}
            <nav className="fixed w-full z-50 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-zinc-100 dark:border-zinc-800">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
                        <Logo size="sm" hideText />
                        TechTrendz
                    </Link>
                    <div className="flex gap-4 items-center">
                        <Link to="/login" className="hidden md:block text-sm font-medium text-zinc-500 hover:text-black dark:hover:text-white transition-colors">
                            Sign in
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
                <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-zinc-200 opacity-20 blur-[100px] dark:bg-zinc-800"></div>
                </div>

                <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">

                    <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-balance text-zinc-900 dark:text-white animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                        Intelligent Support for <br className="hidden md:block" />
                        <span className="bg-gradient-to-b from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-500 bg-clip-text text-transparent">Digital Commerce.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 leading-relaxed font-medium">
                        Engage customers and drive sales with an AI agent.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                        <Link to="/signup">
                            <Button size="lg" className="rounded-full px-8 text-sm h-12 uppercase tracking-wide font-semibold w-full sm:w-auto shadow-xl shadow-zinc-200 dark:shadow-zinc-900/20 hover:shadow-2xl transition-all">Get Started</Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Visual Demo Section (Abstract) */}
            <section className="px-6 pb-24">
                <div className="max-w-6xl mx-auto bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 md:p-12 overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-black/20 pointer-events-none" />
                    <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold tracking-tight">How it works</h3>
                            <ul className="space-y-4">
                                {[
                                    "Powered by Google Gemini API",
                                    "Persists chat history in PostgreSQL",
                                    "Secure JWT Authentication",
                                    "Modern React + Tailwind UI"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                                        <div className="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                                            <div className="h-2 w-2 rounded-full bg-blue-500" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Mock Chat UI */}
                        <div className="bg-white dark:bg-black rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-2xl p-6 space-y-4 max-w-sm mx-auto md:mr-0 transform md:group-hover:-translate-y-2 transition-transform duration-500">
                            <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4">
                                <div className="w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black shadow-sm">
                                    <Bot className="w-4 h-4" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold">Gemini Assistant</p>
                                    <p className="text-xs text-blue-500 flex items-center gap-1 font-medium">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 block animate-pulse"></span>
                                        Online
                                    </p>
                                </div>
                                <div className="text-xs text-zinc-400">Just now</div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex gap-3">
                                    <div className="bg-zinc-100 dark:bg-zinc-900 p-3 rounded-2xl rounded-tl-sm text-sm text-zinc-600 dark:text-zinc-300 shadow-sm">
                                        Hello! I'm your AI shopping assistant. How can I help you find the perfect electronic components today?
                                    </div>
                                </div>
                                <div className="flex gap-3 flex-row-reverse">
                                    <div className="bg-blue-600 text-white p-3 rounded-2xl rounded-tr-sm text-sm shadow-sm">
                                        I'm looking for a new graphics card.
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="bg-zinc-100 dark:bg-zinc-900 p-3 rounded-2xl rounded-tl-sm text-sm text-zinc-600 dark:text-zinc-300 shadow-sm">
                                        <div className="flex gap-1 mb-1">
                                            <span className="w-1 h-1 bg-zinc-400 rounded-full animate-bounce"></span>
                                            <span className="w-1 h-1 bg-zinc-400 rounded-full animate-bounce delay-75"></span>
                                            <span className="w-1 h-1 bg-zinc-400 rounded-full animate-bounce delay-150"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-2">
                                <div className="h-10 bg-zinc-50 dark:bg-zinc-900/50 rounded-full border border-zinc-200 dark:border-zinc-800 w-full flex items-center px-4 text-xs text-zinc-400">
                                    Type a message...
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* AI Agent Showcase Section */}
            <section className="py-24 px-6 relative overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-16">
                        <div className="flex-1 space-y-8">
                            <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                                Built for the <br />
                                <span className="text-zinc-400">Spur AI Take-Home.</span>
                            </h2>
                            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-medium max-w-lg">
                                A high-performance AI support agent architecture designed to handle thousands of unique customer interactions.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {[
                                    { icon: <Zap className="w-4 h-4" />, title: "Domain Aware", text: "Knowledge-seeded AI agent." },
                                    { icon: <Clock className="w-4 h-4" />, title: "Session Based", text: "Persistent chat history." },
                                    { icon: <ShieldCheck className="w-4 h-4" />, title: "Input Guardrails", text: "Robust error handling." },
                                    { icon: <Database className="w-4 h-4" />, title: "Prisma Layer", text: "Type-safe DB interactions." }
                                ].map((item, i) => (
                                    <div key={i} className="flex flex-col gap-3 p-4 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800/50">
                                        <div className="w-8 h-8 rounded-lg bg-white dark:bg-black flex items-center justify-center border border-zinc-100 dark:border-zinc-800 shadow-sm text-zinc-900 dark:text-white">
                                            {item.icon}
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm font-bold">{item.title}</p>
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">{item.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex-1 w-full max-w-lg">
                            {/* Feature Snapshot Card */}
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-zinc-200 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900 rounded-[32px] blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                                <div className="relative bg-white dark:bg-black p-8 rounded-[32px] border border-zinc-200 dark:border-zinc-800 shadow-2xl space-y-8">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-zinc-900 dark:bg-white flex items-center justify-center text-white dark:text-black shadow-lg">
                                                <Bot className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold">Store Knowledge</p>
                                                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Active Context</p>
                                            </div>
                                        </div>
                                        <div className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        {[
                                            { label: "Shipping Policy", meta: "USA/UK/CAN" },
                                            { label: "Return Rules", meta: "30-Day Policy" },
                                            { label: "Support Hours", meta: "9AM - 8PM EST" }
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 transition-colors group/item hover:bg-zinc-100 dark:hover:bg-zinc-800">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-1 h-1 rounded-full bg-zinc-900 dark:bg-white opacity-20 group-hover/item:opacity-100 transition-opacity" />
                                                    <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 group-hover/item:text-zinc-900 dark:group-hover/item:text-white transition-colors">
                                                        {item.label}
                                                    </span>
                                                </div>
                                                <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest leading-none">
                                                    {item.meta}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="pt-4 flex items-center justify-between gap-4 border-t border-zinc-100 dark:border-zinc-800">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-zinc-900 dark:bg-white" />
                                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none">Generative Reasoning Engine</span>
                                        </div>
                                        <div className="flex gap-1">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="w-1 h-1 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Grid Features */}
            <section className="py-24 px-6 border-t border-zinc-100 dark:border-zinc-900">
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: <Bot className="w-6 h-6" />,
                            title: "Generative AI",
                            desc: "Uses Large Language Models to generate human-like responses customized for a shopping context."
                        },
                        {
                            icon: <Lock className="w-6 h-6" />,
                            title: "Authentication",
                            desc: "Complete signup and login flow with encrypted passwords and session management."
                        },
                        {
                            icon: <Database className="w-6 h-6" />,
                            title: "Data Persistence",
                            desc: "Conversations are saved to a database, allowing you to revisit past chat sessions."
                        }
                    ].map((feature, i) => (
                        <div key={i} className="p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
                            <div className="w-12 h-12 bg-white dark:bg-black rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-center mb-6 text-black dark:text-white">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-zinc-100 dark:border-zinc-900 text-center">
                <p className="text-zinc-400 text-sm">Project created for demonstration purposes.</p>
            </footer>
        </div>
    );
}
