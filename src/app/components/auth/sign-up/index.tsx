'use client'
import SocialSignUp from '../SocialSignUp'
import Logo from '../../layout/header/logo'
import PreLoader from '../../shared/PreLoader'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import AnimatedAlert from '../../alertBox/page';

const SignUp = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    try {
      // ✅ Step 1: Check if email already exists in user_details
      const { data: existingUser, error: checkError } = await supabase
        .from("user_details")
        .select("id")
        .eq("email", email)
        .maybeSingle();

      if (checkError) {
        console.error("Error checking email:", checkError);
        setError("Something went wrong while checking email.");
        setLoading(false);
        return;
      }

      if (existingUser) {
        setError("This email is already registered. Please log in instead.");
        setLoading(false);
        return;
      }

      const { error } = await supabase.auth.signUp({ email, password });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      router.push("/verify-email");
    } catch (err: any) {
      console.error("Unexpected error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  function closeAlert(): void {
    setError("");
  }

  return (
    <>

       {error &&<p className="text-red-500 text-sm mt-2">{error}</p>}
      <div className='mb-10 text-center mx-auto inline-block max-w-[250px]'>
        <Logo />
      </div>

      <SocialSignUp />

      <span className='my-8 flex items-center justify-center text-center'>
        <span className='flex-grow border-t border-white/20'></span>
        <span className='mx-4 text-base text-white'>OR</span>
        <span className='flex-grow border-t border-white/20'></span>
      </span>

      <form onSubmit={handleSignup}>
        <div className='mb-[22px]'>
          <input
            type='text'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            name='name'
            required
            className='w-full rounded-md border border-white/20 bg-transparent px-5 py-3 text-base text-white placeholder:text-grey focus:border-primary focus:outline-none'
          />
        </div>
        <div className='mb-[22px]'>
          <input
            type='email'
            placeholder='Email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='w-full rounded-md border border-white/20 bg-transparent px-5 py-3 text-base text-white placeholder:text-grey focus:border-primary focus:outline-none'
          />
        </div>
        <div className='mb-[22px]'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='w-full rounded-md border border-white/20 bg-transparent px-5 py-3 text-base text-white placeholder:text-grey focus:border-primary focus:outline-none'
          />
        </div>

        {loading && <PreLoader />}

        <div className='mb-9'>
          <button
            type='submit'
            disabled={loading}
            className='flex w-full items-center justify-center rounded-md bg-primary px-5 py-3 text-lg font-medium text-white transition duration-300 ease-in-out hover:bg-transparent hover:text-primary border border-primary cursor-pointer disabled:opacity-50'>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </div>
      </form>

      <p className='text-body-secondary mb-4 text-white text-base'>
        By creating an account you agree with our{' '}
        <a href='/#' className='text-primary hover:underline'>
          Privacy
        </a>{' '}
        and{' '}
        <a href='/#' className='text-primary hover:underline'>
          Policy
        </a>
      </p>

    </>
  )
}

export default SignUp
