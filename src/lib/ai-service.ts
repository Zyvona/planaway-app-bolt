interface Activity {
  time: string;
  title: string;
  description: string;
  cost: number;
  category: 'transport' | 'accommodation' | 'food' | 'activity' | 'shopping';
  location: string;
  duration: string;
}

interface DayPlan {
  dayNumber: number;
  date: string;
  title: string;
  activities: Activity[];
  totalCost: number;
  proTips: string[];
}

interface ItineraryResponse {
  summary: string;
  dailySpendingTarget: number;
  days: DayPlan[];
  totalCost: number;
}

interface GenerateItineraryParams {
  origin: string;
  destination: string;
  durationDays: number;
  totalBudget?: number;
  budgetLevel: 'Economy' | 'Standard' | 'Luxury';
  travelStyle: string;
}

export async function generateItinerary(params: GenerateItineraryParams): Promise<ItineraryResponse> {
  const { origin, destination, durationDays, totalBudget, budgetLevel, travelStyle } = params;

  const dailyBudget = totalBudget ? Math.floor(totalBudget / durationDays) : null;

  const budgetGuidance = totalBudget
    ? `The user has a Total Budget of $${totalBudget.toLocaleString()} for the entire trip. This means approximately $${dailyBudget} per day.`
    : `The user wants a ${budgetLevel} style experience.`;

  const prompt = `You are a professional travel agent. Plan a ${durationDays}-day trip from ${origin} to ${destination}.

TRAVEL REQUIREMENTS:
- Origin: ${origin}
- Destination: ${destination}
- Duration: ${durationDays} days
- Budget Level: ${budgetLevel}
- Travel Style: ${travelStyle}
- ${budgetGuidance}

BUDGET GUIDELINES BY LEVEL:
- Economy: Budget hotels, street food, public transport, free/low-cost activities
- Standard: Mid-range hotels, mix of restaurants, some taxis, popular attractions
- Luxury: Premium hotels, fine dining, private transport, exclusive experiences

DAILY SPENDING CALCULATION:
${totalBudget ? `- Total Budget: $${totalBudget}
- Daily Allowance: $${dailyBudget}
- Use this daily allowance to suggest specific hotels, restaurants, and activities that fit within this budget.
- Track costs for flights, hotels, meals, and activities to stay within the total budget.` : `- Suggest appropriate options for the ${budgetLevel} level.`}

RETURN FORMAT - You MUST return valid JSON in this exact structure:
{
  "summary": "A brief 2-3 sentence overview of the trip highlights",
  "dailySpendingTarget": ${dailyBudget || 0},
  "totalCost": 0,
  "days": [
    {
      "dayNumber": 1,
      "date": "YYYY-MM-DD",
      "title": "Short descriptive title for the day",
      "activities": [
        {
          "time": "HH:MM AM/PM",
          "title": "Activity name",
          "description": "Brief description of the activity",
          "cost": 0,
          "category": "transport|accommodation|food|activity|shopping",
          "location": "Specific location name",
          "duration": "Xh Ym"
        }
      ],
      "totalCost": 0,
      "proTips": ["Helpful tip 1", "Helpful tip 2"]
    }
  ]
}

REQUIREMENTS:
1. Include realistic costs for ALL activities, meals, transport, and accommodation
2. Ensure activities match the ${budgetLevel} budget level
3. Include arrival and departure day activities
4. Add 2-3 pro tips for each day
5. Calculate accurate daily totals
6. Suggest specific venues with names
7. Return ONLY valid JSON, no additional text`;

  try {
    const mockResponse: ItineraryResponse = {
      summary: `A ${durationDays}-day adventure from ${origin} to ${destination} combining ${travelStyle} experiences within a ${budgetLevel} budget.`,
      dailySpendingTarget: dailyBudget || 0,
      days: [],
      totalCost: 0
    };

    return mockResponse;
  } catch (error) {
    console.error('Error generating itinerary:', error);
    throw new Error('Failed to generate itinerary. Please try again.');
  }
}

export async function generatePlan(params: GenerateItineraryParams): Promise<string> {
  const { origin, destination, durationDays, totalBudget, budgetLevel, travelStyle } = params;

  const dailyBudget = totalBudget ? Math.floor(totalBudget / durationDays) : null;
  const budgetGuidance = totalBudget
    ? `Total Budget: $${totalBudget.toLocaleString()} (approx. $${dailyBudget}/day)`
    : `Budget Level: ${budgetLevel}`;

  const prompt = `You are a professional travel agent. Plan a ${durationDays}-day trip from ${origin} to ${destination}.

Travel Details:
- Origin: ${origin}
- Destination: ${destination}
- Duration: ${durationDays} days
- ${budgetGuidance}
- Travel Style: ${travelStyle}

${totalBudget ? `Calculate a daily allowance by dividing the total budget ($${totalBudget}) by the number of days (${durationDays}) = $${dailyBudget} per day. Use this to suggest specific hotels and restaurants that fit within the budget.` : ''}

Please provide a detailed itinerary with realistic costs and practical recommendations.`;

  return prompt;
}
