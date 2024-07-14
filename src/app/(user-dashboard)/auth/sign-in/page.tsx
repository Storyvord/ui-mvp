"use client";
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import Logo from "@assets/logo.png";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useGetUserDetails, useUserSignIn } from '@/lib/react-query/queriesAndMutations';
import { useUser } from '@/context/UserContext';

interface SignInFormData {
    username: string;
    password: string;
}

const SignIn: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const { register, handleSubmit, setError, formState: { errors } } = useForm<SignInFormData>();
    const { mutateAsync: loginUser } = useUserSignIn();

    const { data: userDetails, error: userDetailsError } = useGetUserDetails();
    const { setUserDetails } = useUser();

    useEffect(() => {
        if (userDetails) {
            setUserDetails(userDetails);
            console.log(userDetails)
        }
    }, [userDetails, setUserDetails]);

    const onSubmit: SubmitHandler<SignInFormData> = async data => {
        setIsSubmitting(true);
        try {
            console.log(data);
            await loginUser(data)
            // await new Promise(resolve => setTimeout(resolve, 1000));
            router.push('/dashboard/home');
        } catch (err) {
            console.error(err);
            setError("root", {type: 'manual', message:"Failed to sign in"});
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
            <div className="w-full max-w-sm p-6 bg-white rounded shadow-md">
                <div className="flex justify-center m-2 cursor-pointer" onClick={handleLogoClick}>
                    <Image src={Logo} alt="Logo" />
                </div>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div className="mb-4">
                                <Label htmlFor="email" className="block text-sm font-medium text-gray-700">Username</Label>
                                <Input
                                    type="text"
                                    id="username"
                                    placeholder='Enter your username'
                                    {...register('username', {
                                        required: 'Email is required',
                                        
                                    })}
                                    className="mt-1 block w-full rounded shadow-sm h-8 text-sm px-2 border-gray-200 focus:border-none focus:outline-gray-200"
                                />
                                {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
                            </div>
                            <div className="mb-4">
                                <Label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</Label>
                                <Input
                                    type="password"
                                    id="password"
                                    placeholder='Enter your password'
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: { value: 6, message: 'Password must be at least 6 characters' }
                                    })}
                                    className="mt-1 block w-full rounded shadow-sm h-8 text-sm px-2 border-gray-200 focus:border-none focus:outline-gray-200"
                                />
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                            </div>
                        </div>
                        {errors.root && <p className="text-red-500 text-xs mt-1">{errors.root.message}</p>}
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
                            Don&apos;t have an account yet?{' '}
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