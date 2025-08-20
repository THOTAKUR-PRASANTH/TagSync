import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import SecureClient from './secureClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function SecurePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return redirect('/');
  return <SecureClient />;
}
