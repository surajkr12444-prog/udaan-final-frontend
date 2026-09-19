# Udaan Frontend v5 UX + Auth + Voice Guide

Added:
- Udaan logo splash animation on initial page load.
- Auth gateway before the main site: users must sign in or sign up first.
- Email/password Login + Sign Up plus Google Sign-In.
- Centered account dashboard (no right-side auth drawer).
- Light/Dark mode with saved preference.
- English / Hindi / Hinglish selector with translated gateway, navigation, hero, how-it-works and chatbot UX.
- Voice chatbot: microphone input + spoken replies using browser Web Speech APIs.
- Chat language adapts to Hindi, Hinglish or English based on the user's message.
- Official portal guide mode. Apply links open the government portal in a new tab and automatically open Udaan AI with step-by-step guidance in the Udaan tab.
- Optional backend AI hook at `/api/assistant/chat`; local multilingual fallback still works if the AI provider key is not configured.

Important browser limitation:
A normal website cannot inject the Udaan chatbot directly inside a different government website because of browser cross-origin/security restrictions. This version opens the official site in a new tab and keeps Udaan open as the companion guide.
