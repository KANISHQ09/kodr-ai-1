import React, { useState } from 'react'
import CardShell from './CardShell'
import Input from '@/components/mini-components/Input'
import Button from '@/components/mini-components/Button'
import { doCreateUserWithEmailAndPassword, doSignInWithGoogle } from '@/firebase/auth'


/* ---------- Register component ---------- */

interface RegisterCardProps {
    onSwitchToLogin: () => void;
}
const RegisterCard = ({ onSwitchToLogin }: RegisterCardProps) => {
    const [email, setEmail] = useState<string>("");
    const [pwd, setPwd] = useState<string>("");
    const [confirm, setConfirm] = useState<string>("");
    const [showPwd, setShowPwd] = useState<boolean>(false);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const isValidEmail = (e = "") => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());
    const emailOk = isValidEmail(email);
    const pwdOk = pwd.length >= 8;
    const matchOk = pwd === confirm && confirm !== "";

    const canSubmit = emailOk && pwdOk && matchOk && !submitting;

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!canSubmit) return;

        setSubmitting(true);
        setErrorMessage("");

        try {
            await doCreateUserWithEmailAndPassword(email, pwd);
            // User will be redirected automatically by auth state change
        } catch (error: any) {
            setSubmitting(false);
            // Handle Firebase auth errors
            const errorCode = error.code;
            let message = "Failed to create account. Please try again.";

            if (errorCode === 'auth/email-already-in-use') {
                message = "An account with this email already exists.";
            } else if (errorCode === 'auth/invalid-email') {
                message = "Invalid email address.";
            } else if (errorCode === 'auth/weak-password') {
                message = "Password is too weak. Please use a stronger password.";
            } else if (errorCode === 'auth/operation-not-allowed') {
                message = "Email/password accounts are not enabled.";
            }

            setErrorMessage(message);
        }
    };

    const handleGoogle = async () => {
        setSubmitting(true);
        setErrorMessage("");

        try {
            await doSignInWithGoogle();
            // User will be redirected automatically by auth state change
        } catch (error: any) {
            setSubmitting(false);
            const errorCode = error.code;
            let message = "Failed to sign in with Google.";

            if (errorCode === 'auth/popup-closed-by-user') {
                message = "Sign-in popup was closed.";
            } else if (errorCode === 'auth/cancelled-popup-request') {
                message = "Sign-in was cancelled.";
            }

            setErrorMessage(message);
        }
    };


    return (
        <CardShell title="Create account" subtitle="Register a new account for the dashboard">
            <form onSubmit={handleRegister} className="space-y-5">
                {errorMessage && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                        <p className="text-sm text-red-600">{errorMessage}</p>
                    </div>
                )}

                <label className="block">
                    <span className="text-sm font-medium text-gray-700">Email</span>
                    <Input
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className={`mt-2 w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 ${email ? (emailOk ? "border-gray-200 focus:ring-indigo-300" : "border-red-200 focus:ring-red-200") : "border-gray-200"
                            }`}
                    />
                    {!emailOk && email !== "" && <p className="text-xs text-red-600 mt-2">Enter a valid email.</p>}
                </label>

                <label className="block relative">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Password</span>
                        <span className="text-xs text-gray-500">min 8 characters</span>
                    </div>
                    <Input
                        type={showPwd ? "text" : "password"}
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                        placeholder="Create password"
                        className={`mt-2 w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 ${pwd ? (pwdOk ? "border-gray-200 focus:ring-indigo-300" : "border-red-200 focus:ring-red-200") : "border-gray-200"
                            }`}
                    />
                </label>

                <label className="block relative">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Confirm password</span>
                        <Button
                            type="button"
                            onClick={() => setShowPwd((s) => !s)}
                            className="text-sm text-indigo-600 hover:underline focus:outline-none"
                            name={showPwd ? "Hide" : "Show"}
                        />
                    </div>
                    <Input
                        type={showPwd ? "text" : "password"}
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        placeholder="Repeat password"
                        className={`mt-2 w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 ${confirm ? (matchOk ? "border-gray-200 focus:ring-indigo-300" : "border-red-200 focus:ring-red-200") : "border-gray-200"
                            }`}
                    />
                    {confirm !== "" && !matchOk && <p className="text-xs text-red-600 mt-2">Passwords do not match.</p>}
                </label>

                <div className="text-center text-sm text-gray-500">or</div>

                <div className="space-y-3">
                    <button
                        type="button"
                        onClick={handleGoogle}
                        disabled={submitting}
                        className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg border border-gray-200 bg-white hover:shadow-sm"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden>
                            <path d="M21 12.3c0-.6-.1-1.2-.2-1.8H12v3.4h4.6c-.2 1-1.2 2.9-4.6 3v2h6.6c1-1.9 1.6-3.8 1.6-6.6z" fill="#4285F4" />
                            <path d="M12 22c2.7 0 5-0.9 6.6-2.4l-3.2-2.1c-.9.6-2.1.9-3.4.9-2.6 0-4.8-1.7-5.6-4.1H3.1v2.6C4.7 19.9 8.1 22 12 22z" fill="#34A853" />
                            <path d="M6.4 13.9c-.2-.6-.4-1.3-.4-2s.1-1.4.4-2V7.3H3.1C2.4 8.6 2 10.2 2 12s.4 3.4 1.1 4.7l3.3-2.8z" fill="#FBBC05" />
                            <path d="M12 6.5c1.5 0 2.9.5 3.9 1.5l2.9-2.9C17 3 14.7 2 12 2 8.1 2 4.7 4.1 3.1 7.3l3.3 2.6C7.2 8.2 9.4 6.5 12 6.5z" fill="#EA4335" />
                        </svg>
                        <span className="text-sm font-medium text-gray-700">Sign up with Google</span>
                    </button>

                    <Button
                        type="submit"
                        disabled={!canSubmit}
                        className={`w-full py-3 rounded-lg font-semibold text-white transition ${canSubmit ? "bg-red-600 hover:bg-red-700" : "bg-gray-300 cursor-not-allowed"
                            }`}
                        name={submitting ? "Creating..." : "Create account"}
                    />
                </div>

                <div className="pt-1 text-center text-black">
                    <button
                        type="button"
                        onClick={onSwitchToLogin}
                        className="text-sm text-indigo-600 hover:underline focus:outline-none"
                    >
                        Already have an account? <span className="font-semibold">Sign in</span>
                    </button>
                </div>
            </form>
        </CardShell>
    );
}

export default RegisterCard;