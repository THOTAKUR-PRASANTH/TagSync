import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const redirectUrl = new URL('/', request.url);
  const response = NextResponse.redirect(redirectUrl, { status: 302 });

  const cookieStore = await cookies();

  // Remove all cookies by setting their expiry to the past
  for (const cookie of cookieStore.getAll()) {
    response.cookies.set({
      name: cookie.name,
      value: '',
      expires: new Date(0),
      path: '/',
    });
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          // Write to outgoing response cookies
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  await supabase.auth.signOut();

  // Aggressively expire any Supabase cookies that might linger
  const all = cookieStore.getAll();
  for (const c of all) {
    const name = c.name;
    if (name.startsWith('sb') || name.toLowerCase().includes('supabase')) {
      response.cookies.set({ name, value: '', expires: new Date(0), path: '/' });
    }
  }

  return response;
}


