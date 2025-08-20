import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import SettingsClient from './SettingsClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return redirect('/');
  return <SettingsClient />;
}
