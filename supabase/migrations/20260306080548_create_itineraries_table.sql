/*
  # Create Itineraries Table

  1. New Tables
    - `itineraries`
      - `id` (uuid, primary key) - Unique identifier for each itinerary
      - `user_id` (uuid, foreign key) - References auth.users, the owner of the itinerary
      - `origin` (text) - Starting location/city
      - `destination` (text) - Destination location/city
      - `duration_days` (integer) - Number of days for the trip
      - `total_budget` (numeric) - Total budget amount in dollars
      - `budget_level` (text) - Budget preference level: Economy, Standard, or Luxury
      - `travel_style` (text) - Type of travel experience desired
      - `created_at` (timestamptz) - When the itinerary was created
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `itineraries` table
    - Add policy for users to read their own itineraries
    - Add policy for users to create their own itineraries
    - Add policy for users to update their own itineraries
    - Add policy for users to delete their own itineraries

  3. Important Notes
    - All users can only access their own itineraries
    - `total_budget` is optional (nullable) to allow flexibility
    - `budget_level` has a check constraint to ensure valid values
*/

CREATE TABLE IF NOT EXISTS itineraries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  origin text NOT NULL,
  destination text NOT NULL,
  duration_days integer NOT NULL CHECK (duration_days > 0),
  total_budget numeric CHECK (total_budget >= 0),
  budget_level text NOT NULL CHECK (budget_level IN ('Economy', 'Standard', 'Luxury')),
  travel_style text NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE itineraries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own itineraries"
  ON itineraries
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own itineraries"
  ON itineraries
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own itineraries"
  ON itineraries
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own itineraries"
  ON itineraries
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_itineraries_user_id ON itineraries(user_id);
CREATE INDEX IF NOT EXISTS idx_itineraries_created_at ON itineraries(created_at DESC);
