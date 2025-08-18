"use client"; 

import Link from "next/link";
import SocialSignIn from "../SocialSignIn";
import Logo from "../../layout/header/logo";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PreLoader from "../../shared/PreLoader";
import { createClient } from "@/utils/supabase/client";

const Signin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const supabase = createClient(); 

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
    } else {
      router.refresh(); 
      router.push('/Server/dashboard');
    }

    setLoading(false);
  };

  return (
    <>
      <div className="mb-10 text-center mx-auto inline-block max-w-[250px]">
        <Logo />
      </div>

      <SocialSignIn />

      <span className="my-8 flex items-center justify-center text-center">
        <span className="flex-grow border-t border-white/20"></span>
        <span className="mx-4 text-base text-white">OR</span>
        <span className="flex-grow border-t border-white/20"></span>
      </span>

      <form onSubmit={handleLogin}>
        <div className="mb-[22px]">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-white/20 border-solid bg-transparent px-5 py-3 text-base text-dark outline-hidden transition placeholder:text-grey focus:border-primary focus-visible:shadow-none text-white"
          />
        </div>
        
        <div className="mb-[22px]">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-md border border-white/20 border-solid bg-transparent px-5 py-3 text-base text-dark outline-hidden transition placeholder:text-grey focus:border-primary focus-visible:shadow-none text-white"
          />
        </div>
        <div className="mb-9">
          <button
            type="submit"
            disabled={loading}
            className="bg-primary w-full py-3 rounded-lg text-lg text-white font-medium border border-primary hover:text-primary hover:bg-transparent cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </div>
      </form>
      {loading && <PreLoader />} 

      <Link
        href="/"
        className="mb-2 inline-block text-base text-dark hover:text-primary text-white hover:underline"
      >
        Forgot Password?
      </Link>

      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
    </>
  );
};

export default Signin;