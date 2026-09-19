import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../lib/auth';

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: { client_id: string; callback: (response: { credential: string }) => void }) => void;
          renderButton: (element: HTMLElement, options: Record<string, unknown>) => void;
        };
      };
    };
  }
}

export default function GoogleSignIn() {
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const [error, setError] = useState('');
  const { loginWithGoogleCredential } = useAuth();
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

  useEffect(() => {
    if (!clientId || !buttonRef.current) return;

    const render = () => {
      if (!window.google || !buttonRef.current) return;
      buttonRef.current.innerHTML = '';
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: async ({ credential }) => {
          try {
            setError('');
            await loginWithGoogleCredential(credential);
          } catch (e) {
            setError(e instanceof Error ? e.message : 'Google sign-in failed');
          }
        },
      });
      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: 'outline',
        size: 'large',
        shape: 'pill',
        text: 'continue_with',
        width: 300,
      });
    };

    if (window.google) {
      render();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>('script[data-udaan-google-signin]');
    if (existing) {
      existing.addEventListener('load', render, { once: true });
      return () => existing.removeEventListener('load', render);
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.dataset.udaanGoogleSignin = 'true';
    script.onload = render;
    script.onerror = () => setError('Could not load Google Sign-In');
    document.head.appendChild(script);
  }, [clientId, loginWithGoogleCredential]);

  if (!clientId) {
    return (
      <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-xs text-amber-900">
        Google Sign-In is ready in the code, but <strong>VITE_GOOGLE_CLIENT_ID</strong> is not configured yet.
      </div>
    );
  }

  return (
    <div>
      <div ref={buttonRef} className="min-h-11" />
      {error && <p className="mt-2 text-xs font-semibold text-terracotta">{error}</p>}
    </div>
  );
}
