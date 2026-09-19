# Login / Sign Up UI update

This build adds:
- Visible Login and Sign Up buttons in the top navigation when signed out.
- A homepage account section with Login and Create Account calls-to-action.
- Login / Sign Up state inside the account drawer.
- Google Identity sign-in for both flows. The first successful Google sign-in creates the Udaan user record; future sign-ins log the same user in.

Required frontend environment variables:

VITE_API_URL=https://udaan-final-backend.onrender.com
VITE_GOOGLE_CLIENT_ID=<your Google OAuth web client ID>

The backend must also have GOOGLE_CLIENT_ID set to the same client ID.
