import { useState, useEffect } from 'react';
import { LogOut, Plane } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { CreateItineraryForm } from './CreateItineraryForm';
import { Toast } from './Toast';
import { TripTimeline } from './TripTimeline';
import { getMockTokyoTrip } from '../lib/mock-ai-data';

export function Dashboard() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showMockTrip, setShowMockTrip] = useState(false);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUserId(session.user.id);
      }
    });
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const handleCreateSuccess = () => {
    setShowCreateForm(false);
    setShowToast(true);
    setShowMockTrip(true);
  };

  const mockTrip = getMockTokyoTrip();

  if (showMockTrip) {
    return (
      <div className="min-h-screen">
        <header className="vintage-header sticky top-0 z-50 px-4 py-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowMockTrip(false)}
                className="flex items-center gap-2 text-yellow-200 hover:text-white font-semibold transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Dashboard
              </button>
              <button
                onClick={handleSignOut}
                className="vintage-button text-[#002147] font-bold py-2 px-6 rounded-sm"
              >
                <LogOut className="w-4 h-4 inline mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </header>
        <TripTimeline {...mockTrip} />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="vintage-header px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-[#D4AF37] to-[#C5A028] p-3 border-3 border-[#FDF5E6] rounded-sm shadow-lg">
                <Plane className="w-7 h-7 text-[#002147]" />
              </div>
              <h1 className="text-3xl font-bold text-[#D4AF37] tracking-wide">PlanAway</h1>
            </div>
            <button
              onClick={handleSignOut}
              className="vintage-button text-[#002147] font-bold py-2 px-6 rounded-sm"
            >
              <LogOut className="w-4 h-4 inline mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-6xl font-bold text-[#FDF5E6] mb-6 drop-shadow-lg" style={{ textShadow: '3px 3px 0 #002147, -1px -1px 0 #002147, 1px -1px 0 #002147, -1px 1px 0 #002147' }}>
            Adventure Awaits
          </h2>
          <p className="text-xl text-[#FDF5E6] max-w-2xl mx-auto font-medium drop-shadow-md">
            Your passport to extraordinary journeys around the globe
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <button
            onClick={() => setShowCreateForm(true)}
            className="vintage-card p-10 hover:translate-y-[-4px] transition-all duration-300 text-left group"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#C5A028] border-3 border-[#002147] rounded-sm flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
              <svg
                className="w-8 h-8 text-[#002147]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[#002147] mb-3 text-center">
              Plan Your Journey
            </h3>
            <p className="text-[#002147] text-center leading-relaxed">
              Craft bespoke travel itineraries with intelligent assistance
            </p>
          </button>

          <div className="vintage-card p-10">
            <div className="w-16 h-16 bg-[#002147] border-3 border-[#D4AF37] rounded-sm flex items-center justify-center mb-6 mx-auto">
              <svg
                className="w-8 h-8 text-[#D4AF37]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[#002147] mb-3 text-center">
              My Expeditions
            </h3>
            <p className="text-[#002147] text-center leading-relaxed">
              Review and manage your collection of adventures
            </p>
          </div>

          <div className="vintage-card p-10">
            <div className="w-16 h-16 bg-[#002147] border-3 border-[#D4AF37] rounded-sm flex items-center justify-center mb-6 mx-auto">
              <svg
                className="w-8 h-8 text-[#D4AF37]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[#002147] mb-3 text-center">
              Discover Destinations
            </h3>
            <p className="text-[#002147] text-center leading-relaxed">
              Explore remarkable places waiting to be discovered
            </p>
          </div>
        </div>
      </main>

      {showCreateForm && (
        <CreateItineraryForm
          onClose={() => setShowCreateForm(false)}
          onSuccess={handleCreateSuccess}
          userId={userId}
        />
      )}

      {showToast && (
        <Toast
          message="Trip Saved!"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}
