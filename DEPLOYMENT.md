# Deployment Guide

This guide covers deployment strategies for both the landing page and mobile app.

## Landing Page Deployment

### Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications.

#### Prerequisites
- GitHub, GitLab, or Bitbucket account
- Vercel account (free tier available)

#### Steps

1. **Push code to Git repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository
   - Select the `apps/landing` directory as the root

3. **Configure Build Settings**
   - **Framework Preset**: Next.js
   - **Root Directory**: `apps/landing`
   - **Build Command**: `cd ../.. && npx nx build landing`
   - **Output Directory**: `apps/landing/.next`

4. **Environment Variables**
   Add the following:
   ```
   NEXT_PUBLIC_API_URL=your-production-api-url
   ```

5. **Deploy**
   - Click "Deploy"
   - Your site will be live in minutes

#### Custom Domain

1. Go to your project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS settings as instructed

### Netlify

1. **Build the project**
   ```bash
   npm run build:landing
   ```

2. **Deploy with Netlify CLI**
   ```bash
   npm install -g netlify-cli
   netlify deploy --dir=apps/landing/.next
   ```

3. **Or use Netlify UI**
   - Drag and drop the `.next` folder

### Self-Hosted (Docker)

Create a Dockerfile in `apps/landing`:

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY apps/landing/package*.json ./apps/landing/
RUN npm install
COPY . .
RUN npx nx build landing

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/apps/landing/.next ./apps/landing/.next
COPY --from=builder /app/apps/landing/public ./apps/landing/public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/landing/package.json ./apps/landing/

EXPOSE 3000
CMD ["node", "apps/landing/.next/standalone/server.js"]
```

Build and run:
```bash
docker build -t thimblely-landing .
docker run -p 3000:3000 thimblely-landing
```

## Mobile App Deployment

### Prerequisites

- Expo account (free tier available)
- Apple Developer account ($99/year for iOS)
- Google Play Developer account ($25 one-time for Android)

### Development Build

For testing on physical devices:

```bash
# iOS
npx nx run-ios mobile

# Android
npx nx run-android mobile
```

### Production Build with EAS

#### 1. Install EAS CLI

```bash
npm install -g eas-cli
```

#### 2. Login to Expo

```bash
eas login
```

#### 3. Configure EAS

The project already has `eas.json`. Review and update if needed:

```json
{
  "build": {
    "preview": {
      "distribution": "internal"
    },
    "production": {}
  }
}
```

#### 4. Build for iOS

```bash
cd apps/mobile
eas build --platform ios
```

Follow the prompts:
- Select production profile
- Provide Apple ID credentials
- Wait for build (15-30 minutes)

#### 5. Build for Android

```bash
cd apps/mobile
eas build --platform android
```

#### 6. Submit to App Stores

**iOS App Store:**
```bash
eas submit --platform ios
```

**Google Play Store:**
```bash
eas submit --platform android
```

### Over-The-Air (OTA) Updates

Update your app without going through app stores:

```bash
cd apps/mobile
eas update --branch production --message "Bug fixes and improvements"
```

Users will receive the update automatically on next app launch.

### TestFlight (iOS Beta Testing)

1. Build with EAS
2. Submit to TestFlight:
   ```bash
   eas submit --platform ios
   ```
3. Add testers in App Store Connect
4. Testers receive an invitation

### Google Play Internal Testing

1. Build with EAS
2. Upload to Google Play Console
3. Create an internal testing track
4. Add testers by email

## Environment Variables

### Landing Page

Create production environment variables in Vercel/Netlify:

```env
NEXT_PUBLIC_API_URL=https://api.thimblely.com/graphql
NEXT_PUBLIC_APP_NAME=Thimblely
```

### Mobile App

Use Expo's environment variables:

```bash
# Install
npm install --save-dev dotenv

# Create .env
EXPO_PUBLIC_API_URL=https://api.thimblely.com/graphql
```

Update `app.json`:
```json
{
  "expo": {
    "extra": {
      "apiUrl": process.env.EXPO_PUBLIC_API_URL
    }
  }
}
```

## CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-landing:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npx nx build landing
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}

  build-mobile:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install -g eas-cli
      - run: eas build --platform all --non-interactive
        env:
          EXPO_TOKEN: ${{ secrets.EXPO_TOKEN }}
```

## Monitoring

### Landing Page

- **Vercel Analytics**: Automatically enabled
- **Google Analytics**: Add tracking code in `layout.tsx`

### Mobile App

- **Expo Analytics**: Built-in usage metrics
- **Sentry**: For error tracking

```bash
npm install @sentry/react-native
```

## Performance Optimization

### Landing Page

1. **Enable Next.js optimizations**
   - Image optimization (already enabled)
   - Font optimization
   - Script optimization

2. **Enable caching**
   ```js
   // next.config.js
   module.exports = {
     headers: async () => [
       {
         source: '/:all*(svg|jpg|png)',
         headers: [
           {
             key: 'Cache-Control',
             value: 'public, max-age=31536000, immutable',
           },
         ],
       },
     ],
   };
   ```

### Mobile App

1. **Enable Hermes** (already enabled in Expo)
2. **Optimize images** - Use WebP format
3. **Enable ProGuard** (Android)

## Rollback Strategy

### Landing Page

Vercel keeps all deployments:
1. Go to Deployments
2. Find previous working version
3. Click "Promote to Production"

### Mobile App

Use EAS Update channels:
```bash
# Rollback to previous update
eas update --branch production --message "Rollback"
```

## Security Checklist

- [ ] Environment variables set
- [ ] API keys secured
- [ ] HTTPS enabled
- [ ] CSP headers configured
- [ ] Rate limiting enabled
- [ ] Authentication implemented
- [ ] Input validation in place

## Post-Deployment

1. **Test all features**
2. **Monitor error logs**
3. **Check performance metrics**
4. **Gather user feedback**
5. **Plan next iteration**

## Troubleshooting

### Build Failures

```bash
# Clear cache
npx nx reset

# Rebuild
npm run build:landing
# or
npm run build:mobile
```

### Mobile Build Issues

```bash
# Clear Expo cache
cd apps/mobile
expo prebuild --clean
```

### API Connection Issues

- Verify environment variables
- Check CORS settings
- Confirm API endpoint is accessible

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Expo EAS Documentation](https://docs.expo.dev/eas/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

## Cost Estimates

### Landing Page
- **Vercel Free Tier**: Free for hobby projects
- **Vercel Pro**: $20/month (team features)

### Mobile App
- **Expo Free Tier**: Free (limited builds)
- **Expo Production**: $29/month (priority builds)
- **Apple Developer**: $99/year
- **Google Play**: $25 one-time

## Next Steps

1. Set up staging environment
2. Configure automated testing
3. Implement feature flags
4. Set up monitoring and alerts
5. Create runbook for incidents

