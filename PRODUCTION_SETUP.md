# Production Setup Guide

## Overview
This guide explains how to deploy the TagSync application in production with proper configuration for image uploads, database operations, and security.

## 1. Environment Variables

Create a `.env.production` file with the following variables:

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
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1

# Security Headers
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

## 2. Database Setup

### Supabase Table Structure
Ensure your `user_details` table has the following structure:

```sql
CREATE TABLE user_details (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  username VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  gender VARCHAR(20),
  dob DATE,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_user_details_user_id ON user_details(user_id);
CREATE INDEX idx_user_details_username ON user_details(username);

-- Enable Row Level Security (RLS)
ALTER TABLE user_details ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own profile" ON user_details
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON user_details
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON user_details
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

## 3. ImageKit Setup

### 1. Create ImageKit Account
- Go to [ImageKit.io](https://imagekit.io)
- Sign up and create a new project
- Note down your Public Key, Private Key, and URL Endpoint

### 2. Configure ImageKit
- Set up a folder structure (e.g., `profile-pictures/`)
- Configure CORS settings to allow your domain
- Set up image transformations if needed

### 3. Security Best Practices
- Keep your private key secure
- Use environment variables (never commit to git)
- Set up proper CORS policies
- Monitor usage and set limits

## 4. Deployment

### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Set environment variables
vercel env add IMAGEKIT_PUBLIC_KEY
vercel env add IMAGEKIT_PRIVATE_KEY
vercel env add IMAGEKIT_URL_ENDPOINT
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
```

### Docker Deployment
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

## 5. Security Considerations

### 1. File Upload Security
- Validate file types and sizes
- Scan for malware (consider using services like VirusTotal API)
- Implement rate limiting
- Use secure file naming

### 2. Database Security
- Enable Row Level Security (RLS)
- Use parameterized queries
- Implement proper authentication
- Regular security audits

### 3. API Security
- Rate limiting
- Input validation
- CORS configuration
- HTTPS enforcement

## 6. Monitoring & Logging

### 1. Application Monitoring
- Use services like Sentry for error tracking
- Implement logging with Winston or Pino
- Monitor API response times
- Track file upload success rates

### 2. Database Monitoring
- Monitor query performance
- Set up alerts for slow queries
- Track connection usage
- Monitor storage growth

## 7. Backup Strategy

### 1. Database Backups
- Enable automated Supabase backups
- Test restore procedures regularly
- Store backups in multiple locations

### 2. File Backups
- ImageKit provides automatic backups
- Consider additional cloud storage backup
- Test file recovery procedures

## 8. Performance Optimization

### 1. Image Optimization
- Use ImageKit transformations
- Implement lazy loading
- Optimize image formats (WebP, AVIF)
- Use CDN for global distribution

### 2. Database Optimization
- Proper indexing
- Query optimization
- Connection pooling
- Regular maintenance

## 9. Testing

### 1. Unit Tests
```bash
npm run test
```

### 2. Integration Tests
- Test file upload functionality
- Test database operations
- Test authentication flows

### 3. Load Testing
- Test with multiple concurrent users
- Monitor performance under load
- Identify bottlenecks

## 10. Maintenance

### 1. Regular Updates
- Keep dependencies updated
- Monitor security advisories
- Update Node.js version
- Review and update policies

### 2. Performance Monitoring
- Monitor Core Web Vitals
- Track user experience metrics
- Optimize based on data

## Troubleshooting

### Common Issues

1. **Image Upload Fails**
   - Check ImageKit credentials
   - Verify CORS settings
   - Check file size limits

2. **Database Connection Issues**
   - Verify Supabase credentials
   - Check RLS policies
   - Monitor connection limits

3. **Performance Issues**
   - Check database query performance
   - Monitor file upload speeds
   - Review caching strategies

## Support

For production support:
- Monitor application logs
- Set up alerting systems
- Have rollback procedures ready
- Document all configurations
