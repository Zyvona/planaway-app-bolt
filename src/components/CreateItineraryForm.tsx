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
        <div className="vintage-header sticky top-0 px-8 py-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-[#D4AF37]">Plan Your Trip</h2>
          <button
            onClick={onClose}
            className="text-[#D4AF37] hover:text-white transition-colors"
            disabled={isLoading}
          >
            <X className="w-7 h-7" strokeWidth={3} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-100 border-3 border-red-800 text-red-900 px-4 py-3 font-medium">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="origin" className="block text-base font-semibold text-[#002147] mb-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Departure City
              </div>
            </label>
            <input
              type="text"
              id="origin"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              required
              placeholder="New York, USA"
              className="vintage-input w-full px-4 py-3 text-base"
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="destination" className="block text-base font-semibold text-[#002147] mb-3">
              <div className="flex items-center gap-2">
                <Plane className="w-5 h-5" />
                Destination
              </div>
            </label>
            <input
              type="text"
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
              placeholder="Paris, France"
              className="vintage-input w-full px-4 py-3 text-base"
              disabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="duration" className="block text-base font-semibold text-[#002147] mb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Duration
                </div>
              </label>
              <input
                type="number"
                id="duration"
                value={durationDays}
                onChange={(e) => setDurationDays(e.target.value)}
                required
                min="1"
                placeholder="7 days"
                className="vintage-input w-full px-4 py-3 text-base"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="totalBudget" className="block text-base font-semibold text-[#002147] mb-3">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Total Budget
                </div>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-[#002147] font-bold text-lg">$</span>
                </div>
                <input
                  type="number"
                  id="totalBudget"
                  value={totalBudget}
                  onChange={(e) => setTotalBudget(e.target.value)}
                  min="0"
                  step="1"
                  placeholder="2000"
                  className="vintage-input w-full pl-9 pr-4 py-3 text-base"
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-base font-semibold text-[#002147] mb-3">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5" />
                Experience Level
              </div>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['Economy', 'Standard', 'Luxury'] as const).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setBudgetLevel(level)}
                  className={`px-4 py-3 border-3 font-bold transition-all duration-200 ${
                    budgetLevel === level
                      ? 'bg-[#D4AF37] text-[#002147] border-[#002147] shadow-lg scale-105'
                      : 'bg-[#FFFEF9] text-[#002147] border-[#002147] hover:bg-[#F5E6D3]'
                  }`}
                  disabled={isLoading}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="travelStyle" className="block text-base font-semibold text-[#002147] mb-3">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5" />
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
              className="vintage-input w-full px-4 py-3 text-base"
              disabled={isLoading}
            />
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-3 border-[#002147] bg-[#FFFEF9] text-[#002147] font-bold hover:bg-[#F5E6D3] transition-colors"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 vintage-button px-6 py-3 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? 'Preparing Journey...' : 'Create Itinerary'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
