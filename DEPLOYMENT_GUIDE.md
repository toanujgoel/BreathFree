# 🚀 CleverQuit Hostinger Deployment Guide

## 📋 Prerequisites

✅ **What you need:**
- Hostinger hosting account with hPanel access
- Domain `cleverquit.com` pointed to Hostinger
- Supabase project with database setup
- Your CleverQuit application (ready to build)

---

## 🔧 STEP 1: Prepare Application for Production

### 1.1 Create Production Environment File

First, create a `.env.production` file in your project root:

```bash
# .env.production
VITE_SUPABASE_URL=https://ywqmywuekfzdtuagbwji.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3cW15d3Vla2Z6ZHR1YWdid2ppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1NDQ5NzMsImV4cCI6MjA3ODEyMDk3M30.HlUNRMkIoAwJcnI_97ECbzAlInfd445j154v2pJaa34
GEMINI_API_KEY=AIzaSyCO9pWbyPi-1VckkxQAVA00PbSZDCkF8I4
```

### 1.2 Build the Application

Open PowerShell and run:

```powershell
# Navigate to your project
cd "D:\Code Repos\QuitSmokingApp\BreathFree"

# Install dependencies (if needed)
npm install

# Build for production
npm run build
```

This creates a `dist` folder with your production files.

---

## 🌐 STEP 2: Access Hostinger hPanel

### 2.1 Login to Hostinger
1. Go to [hostinger.com](https://hostinger.com)
2. Click "Login" and enter your credentials
3. Access your hPanel dashboard

### 2.2 Locate Your Domain
1. In hPanel, find `cleverquit.com` in your domains list
2. Click "Manage" next to the domain

---

## 📁 STEP 3: Upload Your Application Files

### 3.1 Access File Manager
1. In hPanel, click **"File Manager"**
2. Navigate to the **`public_html`** folder for your domain
3. This is where your website files go

### 3.2 Clear Existing Files (Important!)
1. Select all existing files in `public_html` (if any)
2. Delete them (backup first if they're important)
3. The folder should be empty

### 3.3 Upload Your Built Application
1. **On your computer:** Go to your project's `dist` folder
2. **Select ALL files inside `dist` folder:**
   - `index.html`
   - `assets` folder (contains CSS, JS, images)
   - Any other generated files

3. **Upload methods (choose one):**

#### Method A: Drag & Drop (Easiest)
- Drag all files from your `dist` folder
- Drop them into the hPanel File Manager `public_html` folder
- Wait for upload to complete

#### Method B: Upload Button
- Click "Upload" in File Manager
- Select all files from your `dist` folder
- Upload them to `public_html`

### 3.4 Verify Upload Structure
Your `public_html` should now look like:
```
public_html/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [other files]
└── [any other generated files]
```

---

## 🔐 STEP 4: Configure SSL & Security

### 4.1 Enable SSL Certificate
1. In hPanel, go to **"SSL/TLS"**
2. Find `cleverquit.com`
3. Click **"Manage SSL"**
4. Enable **"Force HTTPS"** (redirects HTTP to HTTPS)
5. If no certificate exists, get a **free Let's Encrypt certificate**

### 4.2 Add SPA Routing Support
Create a `.htaccess` file in `public_html` for proper React routing:

1. In File Manager, click **"New File"**
2. Name it **`.htaccess`**
3. Add this content:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>

# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache static files
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>
```

---

## ⚙️ STEP 5: Configure Supabase for Production

### 5.1 Update Supabase Authentication URLs
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **Authentication → URL Configuration**
4. Update these settings:
   - **Site URL:** `https://cleverquit.com`
   - **Redirect URLs:** Add `https://cleverquit.com/**`

### 5.2 CORS Configuration (if needed)
1. In Supabase, go to **Settings → API**
2. Ensure CORS allows your domain

---

## 🧪 STEP 6: Test Your Deployment

### 6.1 Basic Access Test
1. Visit **`https://cleverquit.com`**
2. The CleverQuit welcome screen should load
3. Check that HTTPS is working (lock icon in browser)

### 6.2 Full Application Test
Test the complete user flow:
1. ✅ Welcome screen loads
2. ✅ Value-first onboarding works
3. ✅ PaywallScreen displays with pricing
4. ✅ Discount offer screen functions
5. ✅ Authentication system works
6. ✅ No JavaScript errors in console (F12)

### 6.3 Mobile Responsiveness Test
1. Test on mobile devices
2. Check different screen sizes
3. Verify touch interactions work

---

## 🚨 Troubleshooting Common Issues

### Issue 1: "White Screen of Death"
**Symptoms:** Blank white page
**Solutions:**
- Check browser console (F12) for errors
- Verify all files uploaded correctly
- Ensure `index.html` is in `public_html` root
- Check file permissions in hPanel

### Issue 2: 404 Errors on Page Refresh
**Symptoms:** Direct URLs don't work
**Solutions:**
- Ensure `.htaccess` file is uploaded
- Check if mod_rewrite is enabled (contact Hostinger support)

### Issue 3: Supabase Connection Errors
**Symptoms:** Authentication/database not working
**Solutions:**
- Verify environment variables in build
- Check Supabase URL configuration
- Ensure Supabase project isn't paused

### Issue 4: CSS/JS Files Not Loading
**Symptoms:** Unstyled page, JavaScript errors
**Solutions:**
- Check `assets` folder uploaded correctly
- Clear browser cache
- Verify file paths in developer tools

---

## ✅ Deployment Checklist

**Pre-deployment:**
- [ ] `.env.production` file created
- [ ] Application builds without errors
- [ ] All dependencies installed

**Hostinger Setup:**
- [ ] hPanel access confirmed
- [ ] Domain points to Hostinger
- [ ] SSL certificate enabled
- [ ] Force HTTPS enabled

**File Upload:**
- [ ] All files from `dist` uploaded to `public_html`
- [ ] `.htaccess` file created and uploaded
- [ ] File structure verified

**Configuration:**
- [ ] Supabase URLs updated for production
- [ ] Authentication redirect URLs configured

**Testing:**
- [ ] Website loads at `https://cleverquit.com`
- [ ] All user flows work
- [ ] No console errors
- [ ] Mobile responsiveness verified
- [ ] SSL certificate working

---

## 🔄 Future Updates

### For Application Updates:
1. Make changes to your code
2. Run `npm run build`
3. Upload new `dist` contents to `public_html`
4. Clear browser cache for testing

### Monitoring:
- Check hPanel error logs if issues arise
- Monitor website uptime
- Keep Supabase project active

---

## 🆘 Need Help?

**If deployment fails:**
1. Check hPanel error logs
2. Verify browser console for errors
3. Contact Hostinger support for server issues
4. Test locally first with `npm run build && npm run preview`

**Your CleverQuit app should now be live at `https://cleverquit.com`! 🚭✨**
```
dist/
├── index.html (1.76 KB)
├── .htaccess (security & routing config)
└── assets/
    └── index-CHmzraLC.js (977.68 KB)
```

**These files need to be uploaded to your Hostinger `public_html/` folder.**

---

## ⏰ **IMMEDIATE NEXT STEPS**

1. **Provide Hostinger Access**: Share your hosting details so I can guide you through file upload
2. **Confirm Domain Status**: Let me know if cleverquit.com is ready
3. **Supabase Configuration**: Confirm you've added the production URLs

**Once you provide this information, I'll guide you through:**
- File upload process
- DNS configuration
- Testing and validation
- Going live!

---

## 🎯 **What We'll Accomplish Today**

- ✅ Upload production files
- ✅ Configure domain and SSL
- ✅ Test all functionality
- ✅ Launch CleverQuit.com live!

**Ready to proceed? Please provide the requested information above and we'll continue with the deployment!**