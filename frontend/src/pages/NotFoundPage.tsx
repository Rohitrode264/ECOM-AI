import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import Logo from '../components/ui/Logo';

export default function NotFoundPage() {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-zinc-50 dark:bg-black p-6 relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-zinc-200 dark:bg-zinc-900/40 blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-zinc-300/30 dark:bg-zinc-800/20 blur-[120px] pointer-events-none"></div>

            <div className="relative z-10 text-center space-y-8 max-w-md mx-auto">
                <div className="flex justify-center mb-4">
                    <Logo size="lg" />
                </div>

                <div className="space-y-4">
                    <h1 className="text-9xl font-black tracking-tighter text-zinc-200 dark:text-zinc-800/50 leading-none select-none">
                        404
                    </h1>
                    <div className="space-y-2 relative -mt-16">
                        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">Page not found</h2>
                        <p className="text-zinc-500 dark:text-zinc-400 font-medium">
                            The page you're looking for doesn't exist or has been moved.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <Link to="/" className="w-full sm:w-auto">
                        <Button className="w-full h-12 rounded-2xl px-8 flex items-center gap-2 font-bold shadow-xl shadow-black/5">
                            <Home className="w-4 h-4" />
                            Back Home
                        </Button>
                    </Link>
                    <Link to="/chat" className="w-full sm:w-auto">
                        <Button variant="outline" className="w-full h-12 rounded-2xl px-8 flex items-center gap-2 font-bold bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
                            <ArrowLeft className="w-4 h-4" />
                            Go to Chat
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Subtle bottom text */}
            <p className="absolute bottom-8 text-[11px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-600 select-none">
                TechTrendz AI System • Error 404
            </p>
        </div>
    );
}
