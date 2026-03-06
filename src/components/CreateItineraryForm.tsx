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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-900">Create Itinerary</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isLoading}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="origin" className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Starting City (Origin)
              </div>
            </label>
            <input
              type="text"
              id="origin"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              required
              placeholder="e.g., New York, USA"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <Plane className="w-4 h-4" />
                Destination
              </div>
            </label>
            <input
              type="text"
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
              placeholder="e.g., Paris, France"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Duration (days)
              </div>
            </label>
            <input
              type="number"
              id="duration"
              value={durationDays}
              onChange={(e) => setDurationDays(e.target.value)}
              required
              min="1"
              placeholder="e.g., 7"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Budget Level
              </div>
            </label>
            <select
              id="budget"
              value={budgetLevel}
              onChange={(e) => setBudgetLevel(e.target.value as 'Economy' | 'Standard' | 'Luxury')}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
              disabled={isLoading}
            >
              <option value="Economy">Economy</option>
              <option value="Standard">Standard</option>
              <option value="Luxury">Luxury</option>
            </select>
          </div>

          <div>
            <label htmlFor="travelStyle" className="block text-sm font-medium text-gray-700 mb-2">
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
              placeholder="e.g., Adventure, Relaxation, Cultural"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              disabled={isLoading}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create Itinerary'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
