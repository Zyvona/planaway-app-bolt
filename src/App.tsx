import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { AuthScreen } from './components/AuthScreen';
import { Dashboard } from './components/Dashboard';
import type { Session } from '@supabase/supabase-js';

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-gray-900 text-xl">Loading...</div>
      </div>
    );
  }

  return session ? <Dashboard /> : <AuthScreen />;
}

export default App;
