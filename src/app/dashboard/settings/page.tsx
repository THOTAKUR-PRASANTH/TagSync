import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import SettingsClient from './SettingsClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return redirect('/');

  const { data: user_details, error } = await supabase
    .from('user_details')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle();

  if (error) {
   
    console.error('Error fetching user details:', error);
   
    return <div className="p-8 text-red-500">Error loading settings.</div>;
  }

  if (!user_details) {
    return <div className="p-8 text-red-500">User details not found.</div>;
  }
  return <SettingsClient user={user_details} />;
}
