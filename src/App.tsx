import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { AuthScreen } from './components/AuthScreen';
import { Dashboard } from './components/Dashboard';
import type { Session } from '@supabase/supabase-js';

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  console.log('Current Session:', session);

  useEffect(() => {
    // Check if we're on localhost and handle OAuth callback
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

    if (isLocalhost && window.location.pathname === '/auth/callback') {
      // For localhost, redirect to root to complete auth
      window.history.replaceState({}, document.title, '/');
    }

    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (!error) {
        console.log('✅ Supabase Connected');
      } else {
        console.error('❌ Supabase Connection Error:', error);
      }
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      (async () => {
        setSession(session);
      })();
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return session ? <Dashboard /> : <AuthScreen />;
}

export default App;
