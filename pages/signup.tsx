import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState, FormEvent } from 'react';

import Button from 'components/molecules/Button';
import Input from 'components/molecules/Input';
import { useUser } from 'utils/useUser';
import { User } from '@supabase/gotrue-js';
import { useForm } from 'react-hook-form';
import Google from '@/components/icons/Google';
import { Provider } from '@supabase/supabase-js';
import Eye from '@/components/icons/Eye';
import { createUser } from '@/lib/hooks/use-users';

type FormData = {
  email: string;
  password: string;
  name: string;
};

const SignUp = () => {
  const [newUser, setNewUser] = useState<User | null>(null);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type?: string; content?: string }>({
    type: '',
    content: ''
  });
  const router = useRouter();
  const { signUp, user, signIn } = useUser();
  const { register, handleSubmit } = useForm<FormData>();

  const handleSignup = async (values: FormData) => {
    setLoading(true);
    setMessage({});
    const { error, user: createdUser } = await signUp({
      email: values.email,
      password: values.password
    });
    if (error) {
      setMessage({ type: 'error', content: error.message });
    } else {
      if (createdUser) {
        await createUser({ ...createdUser, ...values });
        setNewUser(createdUser);
      } else {
        setMessage({
          type: 'note',
          content: 'Check your email for the confirmation link.'
        });
      }
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
    if (newUser || user) {
      router.replace('/account');
    }
  }, [newUser, user]);

  return (
    <div className="flex justify-center mt-12">
      <div className="bg-gray-800 rounded-lg w-full lg:w-1/3 py-16 px-10">
        {message.content && (
          <div
            className={`${
              message.type === 'error' ? 'text-pink-500' : 'text-green-500'
            } border ${
              message.type === 'error' ? 'border-pink-500' : 'border-green-500'
            } p-3`}
          >
            {message.content}
          </div>
        )}

        <span className="text-3xl font-extrabold">Sign up</span>

        <form onSubmit={handleSubmit(handleSignup)} className="flex flex-col">
          <div className="relative pt-4">
            <label htmlFor="email" className="text-sm leading-7 text-gray-300">
              E-mail
            </label>
            <Input
              type="email"
              placeholder="email@gmail.com"
              {...register('email', { required: true })}
            />
          </div>

          <div className="relative pt-4">
            <label htmlFor="name" className="text-sm leading-7 text-gray-300">
              Name
            </label>
            <Input
              type="name"
              placeholder="Victor Mesquita"
              {...register('name', { required: true })}
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
                <Eye onClick={() => setShowPasswordInput(!showPasswordInput)} />
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
            Sign up
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

          <span className="pt-1 text-center text-sm">
            <span className="text-gray-200">Do you have an account?</span>
            {` `}
            <Link href="/signin">
              <a className="text-accent-9 font-bold hover:underline cursor-pointer">
                Sign in.
              </a>
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
