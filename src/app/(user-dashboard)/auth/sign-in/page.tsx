"use client"
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>();

    const onSubmit: SubmitHandler<SignInFormData> = async data => {
        setIsSubmitting(true);
        try {
            console.log(data);

            await new Promise(resolve => setTimeout(resolve, 1000));
            router.push('/dashboard/home');
        } catch (err) {
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSignUpClick = () => {
        router.push('/auth/sign-up');
    };

    const handleLogoClick = () => {
        router.push('/');
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white rounded shadow-md relative">
                <div
                    className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-[#04052e] p-2 rounded-full cursor-pointer"
                    onClick={handleLogoClick}
                >
                    <img src="https://storyvord.com/img/logo.svg" alt="Logo" className="h-16" />
                </div>
                <div className="mt-10">
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder='Enter your email address'
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: 'Invalid email address'
                                        }
                                    })}
                                    className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 h-8 text-slate-900 text-sm px-2"
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder='Enter your password'
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: { value: 6, message: 'Password must be at least 6 characters' }
                                    })}
                                    className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 h-8 text-slate-900 text-sm px-2"
                                />
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                            </div>
                        </div>
                        <Button variant='outline'
                            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isSubmitting ? 'bg-gray-400' : 'bg-black hover:bg-slate-800 hover:text-white'
                                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Signing In...' : 'Sign In'}
                        </Button>
                    </form>
                    <div className="mt-4 text-center">
                        <span className="text-sm text-slate-600">
                            Don't have an account yet?{' '}
                            <span className="underline text-indigo-500 hover:text-indigo-700 cursor-pointer" onClick={handleSignUpClick}>
                                Create Account
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;