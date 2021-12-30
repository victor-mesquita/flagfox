import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState, FormEvent } from 'react';

import Button from '@/components/molecules/Button';
import Input from '@/components/molecules/Input';
import LoadingDots from '@/components/molecules/LoadingDots';
import { useUser } from 'utils/useUser';
import { Provider } from '@supabase/supabase-js';
import Google from '@/components/icons/Google';
import { useForm } from 'react-hook-form';
import Eye from '@/components/icons/Eye';
import { supabase } from '@/lib/supabase-client';

type FormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type?: string; content?: string }>({
    type: '',
    content: ''
  });
  const router = useRouter();
  const { user, signIn } = useUser();
  const { register, handleSubmit } = useForm<FormData>();

  const handleSignin = async (values: FormData) => {
    setLoading(true);
    setMessage({});

    const { error } = await signIn({
      email: values.email,
      password: values.password
    });
    if (error) {
      setMessage({ type: 'error', content: error.message });
    }
    if (!values.password) {
      setMessage({
        type: 'note',
        content: 'Check your email for the magic link.'
      });
    }
    setLoading(false);
  };

  const handleOAuthSignIn = async (provider: Provider) => {
    setLoading(true);
    const { error } = await signIn({ provider });
    if (error) {
      setMessage({ type: 'error', content: error.message });
    }
    setLoading(false);
  };

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        fetch('/api/auth', {
          method: 'POST',
          headers: new Headers({ 'Content-Type': 'application/json' }),
          credentials: 'same-origin',
          body: JSON.stringify({ event, session })
        }).then((res) => res.json());
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user) {
      router.replace('/account');
    }
  }, [user]);

  if (!user)
    return (
      <div className="flex justify-center mt-12">
        <div className="bg-gray-800 rounded-lg w-full lg:w-1/3 py-16 px-10">
          {message.content && (
            <div
              className={`${
                message.type === 'error' ? 'text-pink-500' : 'text-green-500'
              } border ${
                message.type === 'error'
                  ? 'border-pink-500'
                  : 'border-green-500'
              } p-3`}
            >
              {message.content}
            </div>
          )}

          <span className="text-3xl font-extrabold">Login</span>

          <form onSubmit={handleSubmit(handleSignin)} className="flex flex-col">
            <div className="relative pt-4">
              <label
                htmlFor="email"
                className="text-sm leading-7 text-gray-300"
              >
                E-mail
              </label>
              <Input
                type="email"
                placeholder="email@gmail.com"
                {...register('email', { required: true })}
              />
            </div>

            <div className="relative pt-4">
              <label
                htmlFor="password"
                className="text-sm leading-7 text-gray-300"
              >
                Password
              </label>

              <Input
                type={showPasswordInput ? 'text' : 'password'}
                placeholder="Password"
                icon={
                  <Eye
                    onClick={() => setShowPasswordInput(!showPasswordInput)}
                  />
                }
                {...register('password', { required: true })}
              />
            </div>

            <Button
              className="mt-10"
              variant="slim"
              type="submit"
              loading={loading}
            >
              Sign in
            </Button>

            <div className="border border-gray-300 my-6"></div>

            <Button
              variant="secundary"
              type="button"
              icon={<Google />}
              onClick={() => handleOAuthSignIn('google')}
            >
              Sign in with google
            </Button>

            <span className="pt-1 text-center text-sm mt-2">
              <span className="text-gray-200">Don't have an account?</span>
              {` `}
              <Link href="/signup">
                <a className="text-accent-9 font-bold hover:underline cursor-pointer">
                  Sign up.
                </a>
              </Link>
            </span>
          </form>
        </div>
      </div>
    );

  return (
    <div className="m-6">
      <LoadingDots />
    </div>
  );
};

export default SignIn;
