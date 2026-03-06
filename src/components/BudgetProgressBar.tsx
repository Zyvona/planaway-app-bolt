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
    transport: '#002147',
    accommodation: '#8B4513',
    food: '#DC143C',
    activity: '#228B22',
    shopping: '#D4AF37'
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
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Wallet className="w-7 h-7 text-[#D4AF37]" />
          <h3 className="text-3xl font-bold text-[#002147]">Budget Ledger</h3>
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 border-3 ${
          isOverBudget ? 'bg-red-100 text-red-900 border-red-900' : 'bg-green-100 text-green-900 border-green-900'
        }`}>
          <TrendingUp className="w-5 h-5" />
          <span className="text-base font-bold">
            {percentageUsed.toFixed(1)}% Used
          </span>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-[#FFFEF9] border-3 border-[#002147] p-4">
            <p className="text-sm text-[#002147] font-semibold mb-1">Total Budget</p>
            <p className="text-2xl font-bold text-[#002147]">${totalBudget.toLocaleString()}</p>
          </div>
          <div className="bg-[#FFFEF9] border-3 border-[#002147] p-4">
            <p className="text-sm text-[#002147] font-semibold mb-1">Total Spent</p>
            <p className={`text-2xl font-bold ${
              isOverBudget ? 'text-red-800' : 'text-[#D4AF37]'
            }`}>
              ${totalCost.toLocaleString()}
            </p>
          </div>
          <div className="bg-[#FFFEF9] border-3 border-[#002147] p-4">
            <p className="text-sm text-[#002147] font-semibold mb-1">Remaining</p>
            <p className={`text-2xl font-bold ${
              remaining >= 0 ? 'text-green-800' : 'text-red-800'
            }`}>
              ${Math.abs(remaining).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="relative h-10 bg-[#FDF5E6] border-3 border-[#002147] overflow-hidden">
          <div
            className={`h-full transition-all duration-1000 ease-out ${
              isOverBudget
                ? 'bg-gradient-to-r from-red-700 to-red-900'
                : 'bg-gradient-to-r from-[#D4AF37] to-[#C5A028]'
            }`}
            style={{ width: `${Math.min(percentageUsed, 100)}%` }}
          />
          {isOverBudget && (
            <div className="absolute inset-0 flex items-center justify-center text-white text-base font-bold">
              Over Budget!
            </div>
          )}
        </div>

        <div className="pt-6 border-t-4 border-[#002147]">
          <h4 className="text-lg font-bold text-[#002147] mb-4">Expenditure by Category</h4>
          <div className="space-y-4">
            {categories.map((category) => (
              <div key={category.key} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 border-2 border-[#002147]"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="font-bold text-[#002147]">{category.label}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[#002147] font-semibold">
                      {category.percentage.toFixed(1)}%
                    </span>
                    <span className="font-bold text-[#D4AF37] w-24 text-right">
                      ${category.value.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="h-3 bg-[#FDF5E6] border-2 border-[#002147] overflow-hidden">
                  <div
                    className="h-full transition-all duration-1000 ease-out"
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

        <div className="pt-6 border-t-4 border-[#002147]">
          <div className="flex items-start gap-3 text-base text-[#002147] bg-[#FFFEF9] border-3 border-[#002147] p-4">
            <DollarSign className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <p className="leading-relaxed">
              {isOverBudget ? (
                <span className="font-semibold">
                  This itinerary exceeds your budget by ${(totalCost - totalBudget).toLocaleString()}.
                  Consider adjusting activities or accommodations.
                </span>
              ) : (
                <span className="font-semibold">
                  Excellent planning! You have ${remaining.toLocaleString()} remaining in your budget for spontaneous adventures.
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
