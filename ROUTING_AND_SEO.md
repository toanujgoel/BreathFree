# Routing and SEO Implementation Guide

## Overview
CleverQuit now uses React Router for proper URL routing and includes comprehensive SEO optimization for search engine visibility.

## URL Structure

### Public Routes (Accessible to Everyone)
- `/` - Home/Onboarding page
- `/terms` - Terms and Conditions
- `/privacy` - Privacy Policy
- `/refund` - Refund & Cancellation Policy
- `/contact` - Contact Us page

### Authenticated Routes (Require Login)
- `/dashboard` - Main dashboard (internal navigation)
- All other authenticated views (Progress, Content, Chat, Settings) are handled via internal state

## React Router Implementation

### App Structure
```
BrowserRouter
├── Policy Routes (Public)
│   ├── /terms → TermsPage
│   ├── /privacy → PrivacyPage
│   ├── /refund → RefundPage
│   └── /contact → ContactPage
└── Main App Route (/*) → AuthenticatedApp
```

### Key Components

#### Policy Page Components
Each policy page is wrapped with:
1. **SEO Component** - Dynamic meta tags
2. **Policy Component** - The actual content
3. **Navigate Hook** - For back navigation

Example:
```tsx
const TermsPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <SEO 
        title="Terms and Conditions"
        description="Terms and conditions for using CleverQuit..."
        canonical="https://cleverquit.com/terms"
      />
      <TermsAndConditions onBack={() => navigate(-1)} />
    </>
  );
};
```

#### Navigation
Policy pages are accessible from:
1. **Pre-login screens** (AuthScreen, ValueFirstOnboarding) - Footer links
2. **Settings page** (logged-in users) - Legal & Support section

Navigation uses:
```tsx
onNavigateToPolicy={(page) => navigate(`/${page}`)}
```

## SEO Components

### SEO Helper Component (`components/SEO.tsx`)
Dynamic meta tag management that updates:
- Page title
- Meta description
- Keywords
- Open Graph tags (Facebook, LinkedIn)
- Twitter Card tags
- Canonical URLs

### SEO Implementation per Route

#### Home/Onboarding
```tsx
<SEO 
  title="Quit Smoking with AI-Powered Support"
  description="Join CleverQuit and break free from smoking..."
  keywords="quit smoking, stop smoking, smoking cessation, AI coach"
  canonical="https://cleverquit.com"
/>
```

#### Dashboard (Authenticated)
```tsx
<SEO 
  title="Dashboard"
  description="Track your smoke-free journey with personalized insights."
  canonical="https://cleverquit.com/dashboard"
/>
```

#### Policy Pages
Each policy page has specific SEO tags with:
- Descriptive title
- Relevant description
- Canonical URL

## Search Engine Optimization Files

### robots.txt (`public/robots.txt`)
```
User-agent: *
Allow: /
Disallow: /dashboard
Disallow: /settings
Disallow: /chat
Disallow: /progress
Disallow: /content

Sitemap: https://cleverquit.com/sitemap.xml
```

**Purpose**: 
- Allows search engines to crawl public pages
- Prevents indexing of authenticated pages
- Points to sitemap

### sitemap.xml (`public/sitemap.xml`)
Lists all public pages with:
- Priority (1.0 for home, 0.5-0.6 for policies)
- Change frequency
- Last modification date

**Pages included**:
- Homepage (/)
- Terms (/terms)
- Privacy (/privacy)
- Refund (/refund)
- Contact (/contact)

### Meta Tags (`index.html`)
Comprehensive meta tags including:
- Primary meta tags (title, description, keywords)
- Open Graph tags (og:title, og:description, og:image, og:url)
- Twitter Cards (twitter:card, twitter:title, twitter:description)
- Structured Data (JSON-LD for organization)
- Theme colors for mobile browsers
- Viewport settings

## Benefits

### For Users
1. **Shareable Links** - Policy pages have proper URLs that can be copied and shared
2. **Browser History** - Back button works correctly
3. **Bookmarkable** - Users can bookmark specific policy pages
4. **Deep Linking** - Can link directly to any policy page

### For Search Engines
1. **Crawlable Structure** - Search engines can discover and index public pages
2. **Rich Snippets** - Structured data enables enhanced search results
3. **Social Sharing** - Open Graph and Twitter Cards for better social media previews
4. **Mobile Optimization** - Proper viewport and theme color tags

### For Business
1. **Compliance** - Policy pages accessible before payment (payment gateway requirement)
2. **Transparency** - Terms, privacy, and refund policies visible to all
3. **SEO Ranking** - Optimized for search engine discovery
4. **Professional Appearance** - Proper URLs instead of state-based views

## Testing

### Manual Testing
1. **Navigation**: Click policy links from AuthScreen, ValueFirstOnboarding, and Settings
2. **URLs**: Verify browser URL changes to /terms, /privacy, etc.
3. **Back Button**: Ensure browser back button returns to previous page
4. **Direct Access**: Enter `cleverquit.com/contact` directly in browser
5. **SEO Tags**: Use browser dev tools to inspect meta tags on each page

### Build Verification
```bash
npm run build
```
Should complete successfully with no errors.

### Local Testing
```bash
npm run dev
```
Navigate to policy pages and verify:
- URL changes correctly
- Page content displays
- Back navigation works
- Meta tags update (check dev tools)

## Future Enhancements

### Potential Improvements
1. **Dynamic Sitemap Generation** - Auto-generate based on routes
2. **Blog/Content Routes** - Add /blog, /resources if content hub expands
3. **Multilingual SEO** - Add hreflang tags for international versions
4. **Performance Tracking** - Google Analytics, Google Search Console integration
5. **Code Splitting** - Break up large bundle using dynamic imports

### Analytics Integration
Consider adding:
```tsx
// Track page views
useEffect(() => {
  // Google Analytics or similar
  window.gtag?.('config', 'GA_MEASUREMENT_ID', {
    page_path: location.pathname,
  });
}, [location]);
```

## Maintenance Notes

### When Adding New Pages
1. Create the page component
2. Add SEO component with appropriate meta tags
3. Add route to App.tsx
4. Update sitemap.xml with new URL
5. Test navigation and meta tags

### When Updating Content
- Policy pages: Update content directly in components
- SEO tags: Update in respective route wrappers
- Sitemap: Update `lastmod` date in sitemap.xml

### Common Issues

**Issue**: Policy page shows but URL doesn't change
- **Fix**: Ensure using `navigate()` not `setState()`

**Issue**: Meta tags don't update
- **Fix**: Check SEO component is rendered before content

**Issue**: 404 on direct access to policy page
- **Fix**: Ensure BrowserRouter is wrapping entire app

**Issue**: Back button doesn't work
- **Fix**: Use `navigate(-1)` instead of custom state management

## Package Dependencies

Required packages:
- `react-router-dom` - Client-side routing (v6+)

Installed via:
```bash
npm install react-router-dom
```

## Performance Notes

Current bundle size: ~1.1MB (296KB gzipped)

Consider implementing:
1. **Route-based code splitting**: Use React.lazy() for routes
2. **Component lazy loading**: Split large components
3. **Image optimization**: Optimize og-image.jpg for social sharing

## Compliance Checklist

✅ Policy pages accessible before login
✅ Policy pages have unique URLs
✅ Contact information visible (Email: smokefree@cleverquit.com)
✅ Terms clearly state "all sales final"
✅ Privacy policy covers data collection
✅ Refund policy emphasizes no-refund terms
✅ All policy pages linked from multiple locations

This implementation ensures CleverQuit is:
- Payment gateway compliant
- SEO optimized for search engines
- User-friendly with proper navigation
- Professionally structured with clean URLs
