# CleverQuit - Supabase Integration Setup Guide

## 🚀 Quick Setup Instructions

### 1. Supabase Project Setup

1. **Create a Supabase Account**: Go to [supabase.com](https://supabase.com) and sign up
2. **Create a New Project**:
   - Click "New Project"
   - Choose your organization
   - Set project name: `cleverquit-app`
   - Create a strong database password
   - Choose a region close to your users
   - Click "Create new project"

### 2. Environment Configuration

1. **Get your Supabase credentials**:
   - Go to Project Settings → API
   - Copy your `Project URL`
   - Copy your `anon public` key

2. **Update your `.env.local` file**:
   ```bash
   GEMINI_API_KEY=your_gemini_api_key_here
   VITE_SUPABASE_URL=your_supabase_project_url_here
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

### 3. Database Setup

1. **Run the database schema**:
   - Go to your Supabase Dashboard
   - Navigate to SQL Editor
   - Copy and paste the contents of `database-schema.sql`
   - Click "Run" to create all tables and security policies

### 4. Test the Integration

1. **Start your app**:
   ```bash
   npm run dev
   ```

2. **Test the flow**:
   - App should show login/signup screen
   - Create a new account
   - Check your email for confirmation (if email confirmation is enabled)
   - Complete onboarding
   - Verify data is being saved in Supabase Dashboard

## 📊 Database Tables Created

- **`profiles`** - User profile information
- **`progress_entries`** - Daily progress tracking
- **`chat_messages`** - AI coach conversation history
- **`weekly_plans`** - Weekly quit plans and progress

## 🔒 Security Features

- **Row Level Security (RLS)** enabled on all tables
- Users can only access their own data
- Automatic profile creation on signup
- Secure authentication with Supabase Auth

## 🛠️ Files Created/Modified

### New Files:
- `services/supabaseClient.ts` - Supabase client configuration
- `services/databaseService.ts` - Database operations
- `components/AuthContext.tsx` - Authentication state management
- `components/AuthScreen.tsx` - Login/signup UI
- `database-schema.sql` - Database setup script

### Modified Files:
- `App.tsx` - Integrated with authentication
- `types.ts` - Added Supabase-compatible types
- `.env.local` - Added Supabase configuration

## 🔧 Integration Features

### Authentication
- ✅ Email/password signup and login
- ✅ Automatic profile creation
- ✅ Session management
- ✅ Logout functionality

### Data Persistence
- ✅ User profiles stored in database
- ✅ Progress tracking across sessions
- ✅ Chat history preservation
- ✅ Weekly plan progress

### Security
- ✅ Row Level Security policies
- ✅ User data isolation
- ✅ Secure API keys
- ✅ Authentication required for all data

## 🚨 Important Notes

1. **Email Confirmation**: By default, Supabase requires email confirmation. You can disable this in Authentication → Settings → Email Auth if needed for testing.

2. **API Keys**: Never commit your actual API keys to version control. The `.env.local` file is already in `.gitignore`.

3. **Database Policies**: The RLS policies ensure users can only access their own data. Don't modify these unless you understand the security implications.

## 🐛 Troubleshooting

### Common Issues:

1. **"Missing Supabase environment variables"**
   - Make sure you've added the correct URLs and keys to `.env.local`
   - Restart your development server after adding environment variables

2. **"Failed to create profile"**
   - Check that the database schema has been properly executed
   - Verify RLS policies are correctly set up

3. **Login not working**
   - Check Supabase Authentication settings
   - Verify email confirmation settings match your setup

### Development Tips:

- Use Supabase Dashboard to monitor real-time data changes
- Check the Authentication tab to see registered users
- Use the Table Editor to view and modify data during development
- Monitor the Logs section for any database errors

## 🎯 Next Steps

Once everything is working:

1. **Update Components**: Modify existing components to use the new database service
2. **Add Real-time Features**: Use Supabase subscriptions for live updates
3. **Implement Data Sync**: Ensure all user actions save to the database
4. **Add Error Handling**: Implement proper error handling for network issues
5. **Optimize Performance**: Add caching and efficient data fetching

Your CleverQuit app is now fully integrated with Supabase! 🎉