# 🚀 Setup Guide for TagSync

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Supabase account
- ImageKit account

## 1. Environment Setup

Create a `.env.local` file in your project root:

```bash
# ImageKit Configuration (Required for image uploads)
IMAGEKIT_PUBLIC_KEY=your_public_key_here
IMAGEKIT_PRIVATE_KEY=your_private_key_here
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_endpoint

# Supabase Configuration (Required for database)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Next.js Configuration
NODE_ENV=development
NEXT_TELEMETRY_DISABLED=1

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 2. Install Dependencies

```bash
npm install
# or
yarn install
```

## 3. Run Development Server

```bash
npm run dev
# or
yarn dev
```

## 4. Build for Production

```bash
npm run build
# or
yarn build
```

## 5. Test the Application

1. Navigate to `http://localhost:3000`
2. Sign up/Sign in
3. Go to Dashboard → Settings → Edit Profile
4. Try uploading an image and filling the form

## Troubleshooting

### Build Errors
- Ensure all environment variables are set
- Check ImageKit credentials are correct
- Verify Supabase connection

### Image Upload Issues
- Check ImageKit configuration
- Verify file size (max 5MB)
- Check file type (JPEG, PNG, GIF, WebP)

### Database Issues
- Verify Supabase credentials
- Check database table structure
- Ensure RLS policies are set up

## Support
If you encounter issues, check the console logs and ensure all environment variables are properly configured.
