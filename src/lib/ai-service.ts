interface GeneratePlanParams {
  origin: string;
  destination: string;
  durationDays: number;
  budgetLevel: string;
  travelStyle: string;
}

export async function generatePlan(params: GeneratePlanParams): Promise<string> {
  const { origin, destination, durationDays, budgetLevel, travelStyle } = params;

  const prompt = `Create a detailed ${durationDays}-day travel itinerary starting from ${origin} to ${destination}.

Travel Details:
- Origin: ${origin}
- Destination: ${destination}
- Duration: ${durationDays} days
- Budget Level: ${budgetLevel}
- Travel Style: ${travelStyle}

Please provide:
1. Day-by-day breakdown of activities
2. Recommended accommodations for the ${budgetLevel} budget
3. Transportation suggestions from ${origin} to ${destination}
4. Must-see attractions and experiences
5. Dining recommendations
6. Estimated costs for the ${budgetLevel} budget level
7. Tips specific to the ${travelStyle} travel style

Format the itinerary in a clear, organized manner with proper headings and bullet points.`;

  return prompt;
}
