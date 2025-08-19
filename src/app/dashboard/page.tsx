import { createClient } from '@/utils/supabase/server';
import DashboardClient from './dashboardClient';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  return <DashboardClient user={user} />;
}


