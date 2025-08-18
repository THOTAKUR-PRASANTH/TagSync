import { createClient } from '@/utils/supabase/server';
import DashboardClient from './dashboardClient'; // The UI part

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return <div>User not found.</div>;
  }
  return <DashboardClient user={user} />;
}