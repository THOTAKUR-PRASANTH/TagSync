"use client"; 

import Link from "next/link";
import SocialSignIn from "../SocialSignIn";
import Logo from "../../layout/header/logo";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PreLoader from "../../shared/PreLoader";
import { createClient } from "@/utils/supabase/client";
import ErrorAlert from '../../alertBox';


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

  
    const { data: { user }, error: loginError } = await supabase.auth.signInWithPassword({ email, password });

    if (loginError) {
      setError(loginError.message);
      setLoading(false);
      return;
    }

    if (user) {
      try {

        const { data: existing } = await supabase
          .from("user_details")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle();

        if (!existing) {
          const derivedName = user.email?.split("@")[0] || null;
          const { error: insertError } = await supabase
            .from("user_details")
            .insert({
              user_id: user.id,
              email: user.email,
              name: derivedName, 
            });

          if (insertError) console.error("Failed to insert user_details:", insertError);
          }
        router.refresh();
        router.push("/Server/dashboard");
      } catch (err) {
        console.error("Error inserting user_details:", err);
        setError("Something went wrong. Please try again.");
      }
    }

    setLoading(false);
  };
 

  return (
    
    <>
   {error && <ErrorAlert message={error} onClose={() => setError("")} />}

    
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
     
   
    </>
  );
};

export default Signin;
