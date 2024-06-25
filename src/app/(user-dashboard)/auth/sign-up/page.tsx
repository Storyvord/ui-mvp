"use client"
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Logo from '../Logo/logo.png';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface SignUpFormData {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}

const SignUp: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const { register, handleSubmit, formState: { errors }, getValues } = useForm<SignUpFormData>();

    const onSubmit: SubmitHandler<SignUpFormData> = async data => {
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

    const handleSignInClick = () => {
        router.push('/auth/sign-in');
    };

    const handleLogoClick = () => {
        router.push('/');
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white rounded shadow-md">
                <div className="flex justify-center m-2 cursor-pointer" onClick={handleLogoClick}>
                    <Image src={Logo} alt="Logo" />
                </div>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div className="py-2">
                                <Label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email address"
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: 'Invalid email address'
                                        }
                                    })}
                                    className="mt-1 block w-full rounded border-gray-200 shadow-sm focus:border-none focus:outline-gray-200 h-8 text-slate-900 text-sm px-2"
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                            </div>
                            <div className="py-1">
                                <Label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</Label>
                                <Input
                                    type="text"
                                    id="username"
                                    placeholder="Enter your username"
                                    {...register('username', {
                                        required: 'Username is required',
                                        minLength: { value: 3, message: 'Username must be at least 3 characters' }
                                    })}
                                    className="mt-1 block w-full rounded border-gray-200 shadow-sm focus:border-none focus:outline-gray-200 h-8 text-slate-900 text-sm px-2"
                                />
                                {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
                            </div>
                            <div className="py-2">
                                <Label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</Label>
                                <Input
                                    type="password"
                                    id="password"
                                    placeholder="Enter your password"
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: { value: 6, message: 'Password must be at least 6 characters' }
                                    })}
                                    className="mt-1 block w-full rounded border-gray-200 shadow-sm focus:border-none focus:outline-gray-200 h-8 text-slate-900 text-sm px-2"
                                />
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                            </div>
                            <div className="mb-8">
                                <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</Label>
                                <Input
                                    type="password"
                                    id="confirmPassword"
                                    placeholder="Confirm your password"
                                    {...register('confirmPassword', {
                                        required: 'Confirm Password is required',
                                        validate: value => value === getValues().password || 'Passwords do not match'
                                    })}
                                    className="mt-1 block w-full rounded border-gray-200 shadow-sm focus:border-none focus:outline-gray-200 h-8 text-slate-900 text-sm px-2"
                                />
                                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
                            </div>
                        </div>
                        <Button type="submit"
                            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isSubmitting ? 'bg-gray-400' : 'bg-black hover:bg-slate-800 hover:text-white'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                        </Button>
                    </form>
                    <div className="mt-4 text-center">
                        <span className="text-sm text-slate-600">
                            Already have an account?{' '}
                            <span className="underline text-indigo-500 hover:text-indigo-700 cursor-pointer" onClick={handleSignInClick}>
                                Sign-in
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;