export interface Activity {
  id: string;
  time: string;
  title: string;
  description: string;
  cost: number;
  category: 'transport' | 'accommodation' | 'food' | 'activity' | 'shopping';
  location: string;
  duration: string;
}

export interface Day {
  dayNumber: number;
  date: string;
  title: string;
  activities: Activity[];
  totalCost: number;
}

export interface MockTrip {
  destination: string;
  origin: string;
  startDate: string;
  endDate: string;
  totalBudget: number;
  days: Day[];
  totalCost: number;
  budgetRemaining: number;
}

export const getMockTokyoTrip = (): MockTrip => {
  const days: Day[] = [
    {
      dayNumber: 1,
      date: '2026-04-15',
      title: 'Arrival & Shibuya Exploration',
      activities: [
        {
          id: 'day1-1',
          time: '09:00 AM',
          title: 'Flight to Tokyo',
          description: 'Direct flight from JFK to Haneda Airport (HND)',
          cost: 850,
          category: 'transport',
          location: 'New York JFK → Tokyo HND',
          duration: '14h 30m'
        },
        {
          id: 'day1-2',
          time: '02:00 PM',
          title: 'Hotel Check-in',
          description: 'Modern hotel in Shibuya district with city views',
          cost: 180,
          category: 'accommodation',
          location: 'Shibuya Hotel Luna',
          duration: '30m'
        },
        {
          id: 'day1-3',
          time: '04:00 PM',
          title: 'Shibuya Crossing Experience',
          description: 'Visit the famous scramble crossing and explore Shibuya 109',
          cost: 0,
          category: 'activity',
          location: 'Shibuya Crossing',
          duration: '2h'
        },
        {
          id: 'day1-4',
          time: '07:00 PM',
          title: 'Izakaya Dinner',
          description: 'Traditional Japanese pub experience with local sake',
          cost: 45,
          category: 'food',
          location: 'Uobei Shibuya Dogenzaka',
          duration: '1h 30m'
        }
      ],
      totalCost: 1075
    },
    {
      dayNumber: 2,
      date: '2026-04-16',
      title: 'Traditional Tokyo - Asakusa & Ueno',
      activities: [
        {
          id: 'day2-1',
          time: '08:00 AM',
          title: 'Breakfast at Hotel',
          description: 'Japanese and Western breakfast buffet',
          cost: 25,
          category: 'food',
          location: 'Hotel Restaurant',
          duration: '1h'
        },
        {
          id: 'day2-2',
          time: '10:00 AM',
          title: 'Senso-ji Temple',
          description: 'Explore Tokyo\'s oldest temple and Nakamise shopping street',
          cost: 0,
          category: 'activity',
          location: 'Asakusa',
          duration: '2h 30m'
        },
        {
          id: 'day2-3',
          time: '01:00 PM',
          title: 'Ramen Lunch',
          description: 'Authentic tonkotsu ramen at a local favorite',
          cost: 15,
          category: 'food',
          location: 'Ichiran Asakusa',
          duration: '45m'
        },
        {
          id: 'day2-4',
          time: '03:00 PM',
          title: 'Ueno Park & Museums',
          description: 'Visit Tokyo National Museum and stroll through cherry blossom park',
          cost: 12,
          category: 'activity',
          location: 'Ueno Park',
          duration: '3h'
        },
        {
          id: 'day2-5',
          time: '07:00 PM',
          title: 'Yakitori Street Food',
          description: 'Sample grilled skewers at Ameyoko market',
          cost: 30,
          category: 'food',
          location: 'Ameyoko Market',
          duration: '1h'
        },
        {
          id: 'day2-6',
          time: '08:30 PM',
          title: 'Hotel Night',
          description: 'Rest at Shibuya Hotel Luna',
          cost: 180,
          category: 'accommodation',
          location: 'Shibuya Hotel Luna',
          duration: '12h'
        }
      ],
      totalCost: 262
    },
    {
      dayNumber: 3,
      date: '2026-04-17',
      title: 'Modern Tokyo - Harajuku & Shinjuku',
      activities: [
        {
          id: 'day3-1',
          time: '09:00 AM',
          title: 'Harajuku Breakfast',
          description: 'Fluffy Japanese pancakes and matcha latte',
          cost: 20,
          category: 'food',
          location: 'A Happy Pancake Harajuku',
          duration: '1h'
        },
        {
          id: 'day3-2',
          time: '10:30 AM',
          title: 'Meiji Shrine',
          description: 'Peaceful shrine walk through forested grounds',
          cost: 0,
          category: 'activity',
          location: 'Meiji Jingu',
          duration: '1h 30m'
        },
        {
          id: 'day3-3',
          time: '12:30 PM',
          title: 'Takeshita Street Shopping',
          description: 'Explore quirky shops and street fashion',
          cost: 80,
          category: 'shopping',
          location: 'Harajuku',
          duration: '2h'
        },
        {
          id: 'day3-4',
          time: '03:00 PM',
          title: 'teamLab Borderless',
          description: 'Immersive digital art museum experience',
          cost: 38,
          category: 'activity',
          location: 'Azabudai Hills',
          duration: '2h 30m'
        },
        {
          id: 'day3-5',
          time: '07:00 PM',
          title: 'Omoide Yokocho Dinner',
          description: 'Tiny yakitori alley with authentic atmosphere',
          cost: 35,
          category: 'food',
          location: 'Shinjuku Memory Lane',
          duration: '1h 30m'
        },
        {
          id: 'day3-6',
          time: '09:00 PM',
          title: 'Hotel Night',
          description: 'Rest at Shibuya Hotel Luna',
          cost: 180,
          category: 'accommodation',
          location: 'Shibuya Hotel Luna',
          duration: '11h'
        }
      ],
      totalCost: 353
    },
    {
      dayNumber: 4,
      date: '2026-04-18',
      title: 'Day Trip to Nikko',
      activities: [
        {
          id: 'day4-1',
          time: '07:00 AM',
          title: 'Train to Nikko',
          description: 'Scenic train ride through Japanese countryside',
          cost: 28,
          category: 'transport',
          location: 'Shinjuku → Nikko',
          duration: '2h'
        },
        {
          id: 'day4-2',
          time: '09:30 AM',
          title: 'Toshogu Shrine',
          description: 'UNESCO World Heritage shrine with ornate decorations',
          cost: 15,
          category: 'activity',
          location: 'Nikko Toshogu',
          duration: '2h'
        },
        {
          id: 'day4-3',
          time: '12:00 PM',
          title: 'Yuba Lunch',
          description: 'Local specialty tofu skin cuisine',
          cost: 32,
          category: 'food',
          location: 'Nikko Restaurant',
          duration: '1h'
        },
        {
          id: 'day4-4',
          time: '02:00 PM',
          title: 'Lake Chuzenji',
          description: 'Beautiful mountain lake and Kegon Falls',
          cost: 0,
          category: 'activity',
          location: 'Lake Chuzenji',
          duration: '2h 30m'
        },
        {
          id: 'day4-5',
          time: '05:00 PM',
          title: 'Return to Tokyo',
          description: 'Train back to Shinjuku',
          cost: 28,
          category: 'transport',
          location: 'Nikko → Shinjuku',
          duration: '2h'
        },
        {
          id: 'day4-6',
          time: '08:00 PM',
          title: 'Conveyor Belt Sushi',
          description: 'Fun and affordable sushi experience',
          cost: 40,
          category: 'food',
          location: 'Genki Sushi Shibuya',
          duration: '1h'
        },
        {
          id: 'day4-7',
          time: '09:30 PM',
          title: 'Hotel Night',
          description: 'Rest at Shibuya Hotel Luna',
          cost: 180,
          category: 'accommodation',
          location: 'Shibuya Hotel Luna',
          duration: '10h'
        }
      ],
      totalCost: 323
    },
    {
      dayNumber: 5,
      date: '2026-04-19',
      title: 'Last Day - Tsukiji & Departure',
      activities: [
        {
          id: 'day5-1',
          time: '06:00 AM',
          title: 'Tsukiji Outer Market',
          description: 'Fresh sushi breakfast and market exploration',
          cost: 45,
          category: 'food',
          location: 'Tsukiji Market',
          duration: '2h'
        },
        {
          id: 'day5-2',
          time: '09:00 AM',
          title: 'Last-minute Shopping',
          description: 'Souvenirs and gifts at Tokyo Station',
          cost: 120,
          category: 'shopping',
          location: 'Tokyo Station',
          duration: '2h'
        },
        {
          id: 'day5-3',
          time: '12:00 PM',
          title: 'Hotel Check-out',
          description: 'Final check-out and luggage collection',
          cost: 0,
          category: 'accommodation',
          location: 'Shibuya Hotel Luna',
          duration: '30m'
        },
        {
          id: 'day5-4',
          time: '01:00 PM',
          title: 'Airport Transfer',
          description: 'Limousine bus to Haneda Airport',
          cost: 15,
          category: 'transport',
          location: 'Shibuya → Haneda Airport',
          duration: '1h'
        },
        {
          id: 'day5-5',
          time: '04:00 PM',
          title: 'Return Flight',
          description: 'Direct flight back to New York JFK',
          cost: 850,
          category: 'transport',
          location: 'Tokyo HND → New York JFK',
          duration: '13h 30m'
        }
      ],
      totalCost: 1030
    }
  ];

  const totalCost = days.reduce((sum, day) => sum + day.totalCost, 0);
  const totalBudget = 3500;

  return {
    destination: 'Tokyo',
    origin: 'New York',
    startDate: '2026-04-15',
    endDate: '2026-04-19',
    totalBudget,
    days,
    totalCost,
    budgetRemaining: totalBudget - totalCost
  };
};
