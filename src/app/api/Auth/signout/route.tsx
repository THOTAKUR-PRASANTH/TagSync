import { createClient } from '@/utils/supabase/server'; // 👈 Use your helper
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // This one line does all the work of the block above
  const supabase = await createClient(); 

  await supabase.auth.signOut();

  return NextResponse.redirect(new URL('/', request.url), {
    status: 302,
  });
}