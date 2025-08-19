import { createClient } from '@/utils/supabase/server';

export default async function SecureHome() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  return (
    <div className="min-h-[60vh] p-6 text-white">
      <h1 className="text-2xl font-semibold mb-2">Secure Area</h1>
      <p className="opacity-80">This is a protected page outside the dashboard.</p>
    </div>
  );
}


