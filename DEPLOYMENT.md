# Deployment Guide

## GitHub Pages Setup

Your code has been pushed to GitHub! Now follow these steps to enable GitHub Pages:

### Steps to Enable GitHub Pages:

1. **Go to your repository**: https://github.com/Hillarymukuka/legalconsult

2. **Navigate to Settings**:
   - Click on "Settings" tab in your repository

3. **Enable GitHub Pages**:
   - Scroll down to "Pages" in the left sidebar
   - Click on "Pages"
   - Under "Build and deployment":
     - Source: Select **"GitHub Actions"**
   - Click "Save"

4. **Wait for Deployment**:
   - Go to the "Actions" tab
   - You should see a workflow running
   - Wait for it to complete (green checkmark)
   - This usually takes 2-5 minutes

5. **Access Your App**:
   - Once deployed, your app will be available at:
   - **https://hillarymukuka.github.io/legalconsult/**

### Automatic Deployments

Every time you push to the `main` branch, GitHub Actions will automatically:
- Build your app
- Deploy to GitHub Pages

### Manual Deployment Trigger

You can also manually trigger a deployment:
1. Go to "Actions" tab
2. Click "Deploy to GitHub Pages" workflow
3. Click "Run workflow" button
4. Select "main" branch
5. Click "Run workflow"

## Making Updates

To update your deployed app:

```bash
# Make your changes to the code
git add .
git commit -m "Your update message"
git push origin main
```

The app will automatically rebuild and redeploy!

## Troubleshooting

### Deployment Failed
- Check the "Actions" tab for error logs
- Ensure all dependencies are in package.json
- Verify the build succeeds locally with `npm run build`

### 404 Error
- Make sure GitHub Pages is enabled in Settings
- Verify the base path in vite.config.js is `/legalconsult/`
- Check that the deployment workflow completed successfully

### API Not Working
- Cloudflare Workers AI credentials are hardcoded in `src/services/api.js`
- Verify the account ID and API token are correct
- Check browser console for API errors

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

**Repository**: https://github.com/Hillarymukuka/legalconsult
**Live App**: https://hillarymukuka.github.io/legalconsult/
**Powered by**: Nestro AI © Ancestro 2025
