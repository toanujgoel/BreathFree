# Google OAuth Setup Guide for BreathFree

This guide will walk you through setting up Google OAuth authentication for the BreathFree app using Supabase.

## Prerequisites

- A Supabase project (already configured)
- A Google Cloud Console account

## Step 1: Create Google OAuth Credentials

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google+ API**:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google+ API"
   - Click "Enable"

4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - If prompted, configure the OAuth consent screen first:
     - Choose "External" user type
     - Fill in the required information:
       - App name: **CleverQuit** (or BreathFree)
       - User support email: Your email
       - Developer contact email: Your email
     - Add scopes (optional for basic authentication)
     - Click "Save and Continue"

5. Create the OAuth Client ID:
   - Application type: **Web application**
   - Name: **CleverQuit Web Client**
   - Authorized JavaScript origins:
     - `http://localhost:5173` (for local development)
     - Your production domain (e.g., `https://yourapp.com`)
   - Authorized redirect URIs:
     - `https://your-project-ref.supabase.co/auth/v1/callback`
     - Replace `your-project-ref` with your actual Supabase project reference
   - Click "Create"

6. Copy the **Client ID** and **Client Secret** that are displayed

## Step 2: Configure Supabase

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your BreathFree project
3. Navigate to **Authentication** > **Providers**
4. Find **Google** in the list and enable it
5. Paste the credentials you copied:
   - **Client ID**: Your Google OAuth Client ID
   - **Client Secret**: Your Google OAuth Client Secret
6. Copy the **Callback URL** shown in Supabase (it should look like: `https://your-project-ref.supabase.co/auth/v1/callback`)
7. Click "Save"

## Step 3: Update Google OAuth Redirect URIs (if needed)

If you didn't add the Supabase callback URL in Step 1, go back to Google Cloud Console:

1. Go to "APIs & Services" > "Credentials"
2. Click on your OAuth 2.0 Client ID
3. Add the Supabase callback URL to **Authorized redirect URIs**
4. Click "Save"

## Step 4: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the login screen
3. Click the "Sign in with Google" button
4. You should be redirected to Google's OAuth consent screen
5. After granting permissions, you'll be redirected back to your app

## Troubleshooting

### "Error 400: redirect_uri_mismatch"
- Make sure the redirect URI in Google Cloud Console exactly matches the callback URL from Supabase
- Check for trailing slashes or http vs https mismatches

### "Access blocked: This app's request is invalid"
- Ensure the Google+ API is enabled in your Google Cloud project
- Verify the OAuth consent screen is properly configured

### User not being created in database
- The app automatically handles profile creation for OAuth users
- Check the Supabase logs for any errors during profile creation

## Additional Configuration

### Production Setup

When deploying to production:

1. Add your production domain to Google OAuth:
   - Authorized JavaScript origins: `https://yourdomain.com`
   - Authorized redirect URIs: Keep the Supabase callback URL

2. Update your app's redirect URL if needed in `services/supabaseClient.ts`

### Email Verification

OAuth users are automatically verified by Google, so they don't need email confirmation like password-based signups.

## Security Notes

- Never commit your Google OAuth credentials to version control
- Store them securely in your Supabase dashboard
- The credentials are only used by Supabase's backend, not exposed to clients
- Users can revoke access at any time through their Google Account settings

## Support

If you encounter issues:
- Check the [Supabase Auth documentation](https://supabase.com/docs/guides/auth/social-login/auth-google)
- Review the [Google OAuth 2.0 documentation](https://developers.google.com/identity/protocols/oauth2)
