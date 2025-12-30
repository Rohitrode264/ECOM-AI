import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import api from '../lib/api';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await api.post('/auth/login', { email, password });
            login(response.data.token, response.data.user);
            navigate('/chat');
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to login. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout title="Welcome back" subtitle="Sign in to your account">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-4">
                    <Input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoCapitalize="none"
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="flex items-center justify-end">
                    <Link to="/forgot-password" className="text-sm font-medium text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">
                        Forgot password?
                    </Link>
                </div>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <Button type="submit" className="w-full" isLoading={isLoading} size="lg">
                    Sign in
                </Button>

                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
                    Don't have an account?{' '}
                    <Link to="/signup" className="font-semibold text-black dark:text-white hover:underline">
                        Sign up
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
}
