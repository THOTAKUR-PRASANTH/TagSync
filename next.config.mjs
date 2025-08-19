/** @type {import('next').NextConfig} */
const requiredEnv = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
];

for (const envVar of requiredEnv) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

let supabaseOrigin = '';
let supabaseWssOrigin = '';
try {
  const url = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL);
  supabaseOrigin = url.origin;
  supabaseWssOrigin = `wss://${url.host}`;
} catch {
  // If parsing fails, leave origin empty; headers will still be applied safely
}

const isProd = process.env.NODE_ENV === 'production';
// Allow Next.js inline runtime and blob workers in production. Dev needs eval for HMR.
const scriptSrc = isProd
  ? "script-src 'self' 'unsafe-inline' blob:"
  : "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:";

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'self'",
      scriptSrc,
      // Allow inline styles for Tailwind and fonts
      "style-src 'self' 'unsafe-inline'",
      // Images from self, data and blob URIs
      "img-src 'self' data: blob:",
      // Fonts from self and data URIs
      "font-src 'self' data:",
      // Workers (e.g., Next.js/Remix or libraries may spawn blob workers)
      "worker-src 'self' blob:",
      // Allow API/websocket connections to self and Supabase
      `connect-src 'self' ${supabaseOrigin} ${supabaseWssOrigin}`,
      // Media if needed
      "media-src 'self'",
      // Form submissions only to self
      "form-action 'self'",
    ].join('; '),
  },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(self)' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  output: 'standalone',
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
