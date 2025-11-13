# Quick Testing Guide for SEO & Routing

## How to Test Locally

### 1. Start Development Server
```bash
npm run dev
```

### 2. Test Policy Page Navigation

#### From Homepage (Pre-login)
1. Open `http://localhost:5173`
2. Scroll to bottom of welcome screen
3. Click each footer link:
   - Terms & Conditions → Should navigate to `/terms`
   - Privacy Policy → Should navigate to `/privacy`
   - Refund Policy → Should navigate to `/refund`
   - Contact Us → Should navigate to `/contact`
4. ✅ Verify URL changes in browser address bar
5. ✅ Click Back button - should return to home

#### From Settings (After Login)
1. Complete onboarding and login
2. Click Settings in navigation
3. Scroll to "Legal & Support" section
4. Click each policy link
5. ✅ Verify URL changes
6. ✅ Click Back button - should return to Settings

### 3. Test Direct URL Access
Open browser and directly visit:
- `http://localhost:5173/terms`
- `http://localhost:5173/privacy`
- `http://localhost:5173/refund`
- `http://localhost:5173/contact`

✅ Each should load the policy page directly

### 4. Test Browser Navigation
1. Navigate to `/terms`
2. Click a link to `/privacy`
3. Use browser Back button
4. ✅ Should return to `/terms`
5. Use browser Forward button
6. ✅ Should go to `/privacy`

### 5. Verify SEO Meta Tags

#### Using Browser Dev Tools
1. Navigate to any page
2. Press F12 to open Dev Tools
3. Go to Elements tab
4. Expand `<head>` section
5. Look for meta tags:
   - `<title>` - Should show page-specific title
   - `<meta name="description">` - Page description
   - `<meta property="og:title">` - Open Graph title
   - `<meta property="og:description">` - Open Graph description
   - `<link rel="canonical">` - Canonical URL

#### Expected Titles
- Home: "Quit Smoking with AI-Powered Support | CleverQuit"
- Terms: "Terms and Conditions | CleverQuit"
- Privacy: "Privacy Policy | CleverQuit"
- Refund: "Refund & Cancellation Policy | CleverQuit"
- Contact: "Contact Us | CleverQuit"
- Dashboard: "Dashboard | CleverQuit"

### 6. Test URL Copying
1. Navigate to `/contact`
2. Copy URL from browser address bar
3. Paste in new browser tab
4. ✅ Should load Contact Us page directly

### 7. Verify robots.txt and sitemap.xml
- Visit: `http://localhost:5173/robots.txt`
- Visit: `http://localhost:5173/sitemap.xml`
- ✅ Both should display correctly

## Expected Behavior

### ✅ Success Indicators
- URL in address bar changes when navigating
- Browser back/forward buttons work
- Can refresh on policy page without error
- Can copy and paste URLs to access pages directly
- Meta tags update when navigating between pages
- Footer links work from both logged-in and logged-out states

### ❌ Problems to Watch For
- URL doesn't change when clicking policy links
- Back button returns to wrong page
- 404 error when refreshing on policy page
- Meta tags don't update between pages
- Can't access policy pages without logging in

## Production Testing (After Deployment)

### 1. Basic Navigation
Test all the same scenarios as local testing

### 2. Social Media Preview Testing
- **Facebook**: https://developers.facebook.com/tools/debug/
  - Enter your policy page URLs
  - Verify image, title, and description appear correctly
  
- **Twitter**: https://cards-dev.twitter.com/validator
  - Enter your policy page URLs
  - Verify Twitter Card displays properly
  
- **LinkedIn**: https://www.linkedin.com/post-inspector/
  - Enter your policy page URLs
  - Check preview appearance

### 3. Search Engine Verification
- **Google Search Console**:
  1. Add property for cleverquit.com
  2. Submit sitemap: https://cleverquit.com/sitemap.xml
  3. Request indexing for key pages
  4. Monitor crawl stats
  
- **Bing Webmaster Tools**:
  1. Add site
  2. Submit sitemap
  3. Verify robots.txt

### 4. Mobile Testing
- Test on mobile device or Chrome mobile emulation
- Verify:
  - ✅ Policy links clickable on mobile
  - ✅ Back button works
  - ✅ Pages load correctly
  - ✅ URLs shareable via mobile sharing menu

## Quick Fixes

### If URL doesn't change:
- Check that component uses `navigate()` from useNavigate()
- Verify BrowserRouter wraps the app
- Ensure routes are defined in App.tsx

### If meta tags don't update:
- Verify SEO component is rendered
- Check browser dev tools console for errors
- Clear browser cache and refresh

### If back button doesn't work:
- Ensure using `navigate(-1)` not custom state
- Check that navigation happens via React Router
- Verify browser history is being updated

### If direct URL access fails:
- In production, ensure server redirects all routes to index.html
- Check that BrowserRouter (not HashRouter) is used
- Verify routes are defined at root level

## Performance Check
Open browser Dev Tools → Network tab
- Check total bundle size (should be ~1.1MB, ~296KB gzipped)
- Verify no 404 errors
- Check that policy pages load quickly (<500ms)

## Checklist Summary
- [ ] Policy links work from homepage footer
- [ ] Policy links work from Settings
- [ ] URLs change when navigating
- [ ] Back button returns to previous page
- [ ] Can refresh on policy page without error
- [ ] Direct URL access works
- [ ] Meta tags visible in dev tools
- [ ] Page titles update correctly
- [ ] robots.txt accessible
- [ ] sitemap.xml accessible
- [ ] Build completes without errors
- [ ] No TypeScript errors

---

**Ready to Deploy**: Once all items checked ✅
**Next Step**: Deploy to production and run production tests
