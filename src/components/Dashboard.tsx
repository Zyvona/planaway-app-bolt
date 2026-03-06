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
        <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowMockTrip(false)}
                className="flex items-center gap-2 text-slate-700 hover:text-slate-900 font-medium transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Dashboard
              </button>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                <LogOut className="w-4 h-4" />
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-xl">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900">PlanAway</h1>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Welcome to Your Dashboard
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Your AI-powered travel itinerary planner is ready to help you create
            unforgettable journeys around the world.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-white rounded-2xl shadow-md p-8 border border-slate-200 hover:shadow-lg hover:border-blue-300 transition-all duration-200 cursor-pointer text-left"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Create Itinerary
              </h3>
              <p className="text-slate-600">
                Generate personalized travel plans with AI assistance
              </p>
            </button>

            <div className="bg-white rounded-2xl shadow-md p-8 border border-slate-200">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                My Trips
              </h3>
              <p className="text-slate-600">
                View and manage your saved travel itineraries
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8 border border-slate-200">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Explore Destinations
              </h3>
              <p className="text-slate-600">
                Discover new places and travel inspiration
              </p>
            </div>
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
