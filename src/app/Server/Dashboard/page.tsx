import { createClient } from '@/utils/supabase/server';
import DashboardClient from './dashboardClient'; // The UI part

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    // You can render a fallback UI or redirect if user is null
    return <div>User not found or not authenticated.</div>;
  }
  return <DashboardClient user={user} />;
}