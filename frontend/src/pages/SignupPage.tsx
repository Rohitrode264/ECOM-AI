import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import api from '../lib/api';
import { ArrowLeft } from 'lucide-react';

export default function SignupPage() {
    const [step, setStep] = useState(1); 
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleRequestOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await api.post('/auth/signup-request', { email });
            setStep(2);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to send OTP. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await api.post('/auth/signup-verify', { email, otp, password, name });
            login(response.data.token, response.data.user);
            navigate('/chat');
        } catch (err: any) {
            setError(err.response?.data?.error || 'Verification failed.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout
            title={step === 1 ? "Create account" : "Verify email"}
            subtitle={step === 1 ? "Enter your email to get started" : `We sent a code to ${email}`}
        >
            {step === 1 ? (
                <form onSubmit={handleRequestOtp} className="space-y-4">
                    <Input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoCapitalize="none"
                    />
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <Button type="submit" className="w-full" isLoading={isLoading} size="lg">
                        Continue
                    </Button>
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
                        Already have an account?{' '}
                        <Link to="/login" className="font-semibold text-black dark:text-white hover:underline">
                            Sign in
                        </Link>
                    </p>
                </form>
            ) : (
                <form onSubmit={handleVerify} className="space-y-4">
                    <Input
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <Input
                        placeholder="OTP Code"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />
                    <Input
                        type="password"
                        placeholder="Create Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <div className="flex gap-3">
                        <Button type="button" variant="outline" onClick={() => setStep(1)} size="lg" className="px-3">
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                        <Button type="submit" className="flex-1" isLoading={isLoading} size="lg">
                            Create Account
                        </Button>
                    </div>
                </form>
            )}
        </AuthLayout>
    );
}
