import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import api from '../lib/api';
import { ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleRequestOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await api.post('/auth/forgot-password-request', { email });
            setStep(2);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to send OTP.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setIsLoading(true);

        try {
            await api.post('/auth/forgot-password-verify', { email, otp, newPassword });
            setMessage('Password reset successfully. Redirecting to login...');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Reset failed.');
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout
            title={step === 1 ? "Reset password" : "New password"}
            subtitle={step === 1 ? "Enter your email to receive a code" : "Set your new password"}
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
                        Send Code
                    </Button>
                    <div className="text-center mt-6">
                        <Link to="/login" className="text-sm font-medium text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white">
                            Back to Sign in
                        </Link>
                    </div>
                </form>
            ) : (
                <form onSubmit={handleReset} className="space-y-4">
                    <Input
                        placeholder="OTP Code"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />
                    <Input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    {message && <p className="text-green-500 text-sm text-center">{message}</p>}

                    <div className="flex gap-3">
                        <Button type="button" variant="outline" onClick={() => setStep(1)} size="lg" className="px-3" disabled={isLoading}>
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                        <Button type="submit" className="flex-1" isLoading={isLoading} size="lg">
                            Reset Password
                        </Button>
                    </div>
                </form>
            )}
        </AuthLayout>
    );
}
