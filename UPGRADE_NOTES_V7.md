# Udaan Frontend v7 — Unified Theme + Left Dashboard

## What changed
- The dark forest-green / cream / gold visual language from the main Udaan site is now used for the splash screen, authentication screens, dashboard shell and chatbot.
- The authenticated site now uses a fixed left dashboard/sidebar on desktop and a collapsible drawer on mobile.
- Sidebar navigation includes Home, Business Loans, Student Scholarships, EMI Calculator, Official Portals, Saved, Match History, AI Chatbot, Profile and Settings.
- Microsoft login is not included. Email/password and Google sign-in remain.
- Udaan AI can now be opened directly from the left sidebar.
- The dashboard search box can send a typed question directly to Udaan AI.
- Existing portal-guide behavior is preserved: official portals open separately while Udaan remains available for step-by-step guidance.
- Hindi, Hinglish and English UI/chat support, mic input and voice replies are preserved.
- Existing matching, saved opportunities, history, account, schemes, scholarships and EMI functionality are preserved.

## Required frontend environment variables
VITE_API_URL=https://udaan-final-backend.onrender.com
VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com

## Backend
Use the existing Udaan backend v5 chatbot build. No Microsoft OAuth configuration is required.
