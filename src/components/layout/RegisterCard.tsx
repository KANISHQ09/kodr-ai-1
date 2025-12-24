import React, { useState } from 'react';
import CardShell from './CardShell';
import Input from '@/components/mini-components/Input';
import { Button as UiButton } from "@/components/ui/button";
import { doCreateUserWithEmailAndPassword, doSignInWithGoogle } from '@/firebase/auth';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RegisterCardProps {
    onSwitchToLogin: () => void;
}

const RegisterCard = ({ onSwitchToLogin }: RegisterCardProps) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [pwd, setPwd] = useState<string>("");
    const [confirm, setConfirm] = useState<string>("");
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (pwd !== confirm) {
            setErrorMessage("Passwords do not match");
            return;
        }

        setSubmitting(true);
        setErrorMessage("");

        try {
            await doCreateUserWithEmailAndPassword(email, pwd);
            navigate('/dashboard');
        } catch (error: any) {
            setSubmitting(false);
            setErrorMessage("Registration failed. Try again.");
        }
    };

    const handleGoogle = async () => {
        setSubmitting(true);
        try {
            await doSignInWithGoogle();
            navigate('/dashboard');
        } catch (error) {
            setSubmitting(false);
        }
    };

    return (
        <CardShell title="Create Account" subtitle="Join KODR to start learning">
            <form onSubmit={handleRegister} className="space-y-4">
                {errorMessage && (
                    <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                        {errorMessage}
                    </div>
                )}

                <div className="space-y-2">
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email address"
                        className="bg-background/50 border-white/10"
                    />
                    <Input
                        type="password"
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                        placeholder="Password (min 8 chars)"
                        className="bg-background/50 border-white/10"
                    />
                    <Input
                        type="password"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        placeholder="Confirm Password"
                        className="bg-background/50 border-white/10"
                    />
                </div>

                <UiButton 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2.5 h-auto"
                    disabled={submitting}
                >
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    Register
                </UiButton>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-white/10" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">Or</span>
                    </div>
                </div>

                <UiButton
                    type="button"
                    variant="outline"
                    onClick={handleGoogle}
                    disabled={submitting}
                    className="w-full border-white/10 hover:bg-white/5 bg-transparent h-auto py-2.5"
                >
                    Sign up with Google
                </UiButton>

                <div className="pt-4 text-center text-sm">
                    <span className="text-muted-foreground">Already have an account? </span>
                    <button
                        type="button"
                        onClick={onSwitchToLogin}
                        className="text-primary hover:text-primary/80 font-semibold transition-colors"
                    >
                        Sign in
                    </button>
                </div>
            </form>
        </CardShell>
    );
}

export default RegisterCard;