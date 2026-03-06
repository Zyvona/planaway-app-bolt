import { useState } from 'react';
import { X, Plane, Calendar, DollarSign, Compass, MapPin } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface CreateItineraryFormProps {
  onClose: () => void;
  onSuccess: () => void;
  userId: string;
}

export function CreateItineraryForm({ onClose, onSuccess, userId }: CreateItineraryFormProps) {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [durationDays, setDurationDays] = useState('');
  const [totalBudget, setTotalBudget] = useState('');
  const [budgetLevel, setBudgetLevel] = useState<'Economy' | 'Standard' | 'Luxury'>('Standard');
  const [travelStyle, setTravelStyle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { error: insertError } = await supabase
        .from('itineraries')
        .insert({
          user_id: userId,
          origin,
          destination,
          duration_days: parseInt(durationDays),
          total_budget: totalBudget ? parseFloat(totalBudget) : null,
          budget_level: budgetLevel,
          travel_style: travelStyle,
        })
        .select()
        .maybeSingle();

      if (insertError) throw insertError;

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create itinerary');
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
      <div className="vintage-card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="vintage-header sticky top-0 px-8 py-8 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-[#d4a574] tracking-widest mb-2">SOLO ADVENTURE AWAITS</p>
            <h2 className="text-3xl font-bold text-white">Plan Your Perfect Trip</h2>
            <p className="text-sm text-[#8b9db0] mt-2">Tell us where you're headed and we'll handle the rest.</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-[#d4a574] transition-colors"
            disabled={isLoading}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-100 border-l-4 border-red-800 text-red-900 px-4 py-3 font-medium rounded">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="origin" className="block text-xs font-bold text-[#1a3a52] mb-2 uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Origin City
              </div>
            </label>
            <input
              type="text"
              id="origin"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              required
              placeholder="Where are you departing from?"
              className="vintage-input w-full px-0 py-2 text-base"
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="destination" className="block text-xs font-bold text-[#1a3a52] mb-2 uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <Plane className="w-4 h-4" />
                Destination City
              </div>
            </label>
            <input
              type="text"
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
              placeholder="Where do you want to go?"
              className="vintage-input w-full px-0 py-2 text-base"
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="totalBudget" className="block text-xs font-bold text-[#1a3a52] mb-2 uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Total Budget
              </div>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                <span className="text-[#8b9db0] font-normal text-base">$</span>
              </div>
              <input
                type="number"
                id="totalBudget"
                value={totalBudget}
                onChange={(e) => setTotalBudget(e.target.value)}
                min="0"
                step="1"
                placeholder="e.g. 2000"
                className="vintage-input w-full pl-5 pr-0 py-2 text-base"
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label htmlFor="duration" className="block text-xs font-bold text-[#1a3a52] mb-2 uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Number of Days
              </div>
            </label>
            <input
              type="number"
              id="duration"
              value={durationDays}
              onChange={(e) => setDurationDays(e.target.value)}
              required
              min="1"
              placeholder="e.g. 7"
              className="vintage-input w-full px-0 py-2 text-base"
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="travelStyle" className="block text-xs font-bold text-[#1a3a52] mb-2 uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4" />
                Travel Style
              </div>
            </label>
            <input
              type="text"
              id="travelStyle"
              value={travelStyle}
              onChange={(e) => setTravelStyle(e.target.value)}
              required
              placeholder="Adventure, Relaxation, Cultural"
              className="vintage-input w-full px-0 py-2 text-base"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1a3a52] mb-2 uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4" />
                Experience Level
              </div>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['Economy', 'Standard', 'Luxury'] as const).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setBudgetLevel(level)}
                  className={`px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    budgetLevel === level
                      ? 'bg-[#1a3a52] text-white'
                      : 'bg-[#f0f0f0] text-[#1a3a52] hover:bg-[#e0e0e0]'
                  }`}
                  disabled={isLoading}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full vintage-button px-6 py-4 font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              <Plane className="w-5 h-5" />
              {isLoading ? 'Preparing Journey...' : 'Plan My Trip'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full mt-3 px-6 py-3 bg-transparent text-[#1a3a52] font-medium hover:text-[#d4a574] transition-colors"
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
