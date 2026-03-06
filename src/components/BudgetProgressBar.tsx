import React from 'react';
import { DollarSign, TrendingUp, Wallet } from 'lucide-react';

interface BudgetProgressBarProps {
  totalBudget: number;
  totalCost: number;
  categoryBreakdown: {
    transport: number;
    accommodation: number;
    food: number;
    activity: number;
    shopping: number;
  };
}

export const BudgetProgressBar: React.FC<BudgetProgressBarProps> = ({
  totalBudget,
  totalCost,
  categoryBreakdown
}) => {
  const percentageUsed = (totalCost / totalBudget) * 100;
  const remaining = totalBudget - totalCost;
  const isOverBudget = totalCost > totalBudget;

  const categoryColors: Record<string, string> = {
    transport: '#3b82f6',
    accommodation: '#8b5cf6',
    food: '#ec4899',
    activity: '#10b981',
    shopping: '#f59e0b'
  };

  const categoryLabels: Record<string, string> = {
    transport: 'Transport',
    accommodation: 'Accommodation',
    food: 'Food & Dining',
    activity: 'Activities',
    shopping: 'Shopping'
  };

  const categories = Object.entries(categoryBreakdown)
    .map(([key, value]) => ({
      key,
      value,
      percentage: (value / totalCost) * 100,
      color: categoryColors[key],
      label: categoryLabels[key]
    }))
    .sort((a, b) => b.value - a.value);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Wallet className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-bold text-gray-900">Budget Breakdown</h3>
        </div>
        <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${
          isOverBudget ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
        }`}>
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm font-semibold">
            {percentageUsed.toFixed(1)}% Used
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-baseline">
          <div>
            <p className="text-sm text-gray-600">Total Budget</p>
            <p className="text-2xl font-bold text-gray-900">${totalBudget.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Total Spent</p>
            <p className={`text-2xl font-bold ${
              isOverBudget ? 'text-red-600' : 'text-blue-600'
            }`}>
              ${totalCost.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Remaining</p>
            <p className={`text-2xl font-bold ${
              remaining >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              ${Math.abs(remaining).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ease-out ${
              isOverBudget
                ? 'bg-gradient-to-r from-red-500 to-red-600'
                : 'bg-gradient-to-r from-blue-500 to-blue-600'
            }`}
            style={{ width: `${Math.min(percentageUsed, 100)}%` }}
          />
          {isOverBudget && (
            <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-semibold">
              Over Budget!
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Spending by Category</h4>
          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category.key} className="space-y-1">
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="font-medium text-gray-700">{category.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600">
                      {category.percentage.toFixed(1)}%
                    </span>
                    <span className="font-semibold text-gray-900 w-20 text-right">
                      ${category.value.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${category.percentage}%`,
                      backgroundColor: category.color
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <DollarSign className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <p>
              {isOverBudget ? (
                <span className="text-red-600 font-medium">
                  This itinerary exceeds your budget by ${(totalCost - totalBudget).toLocaleString()}.
                  Consider adjusting activities or accommodations.
                </span>
              ) : (
                <span className="text-green-600 font-medium">
                  Great planning! You have ${remaining.toLocaleString()} remaining in your budget for spontaneous adventures.
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
