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
    <div className="space-y-8">
      <div className="text-center border-b-4 border-[#002147] pb-6 mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Wallet className="w-8 h-8 text-[#D4AF37]" />
          <h3 className="text-4xl font-bold text-[#002147]">Expense Ledger</h3>
        </div>
        <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto mt-6">
          <div>
            <p className="text-sm text-[#002147] font-semibold mb-2 uppercase tracking-wider">Total Budget</p>
            <p className="text-5xl font-bold text-[#002147]" style={{ fontFamily: "'Playfair Display', serif" }}>
              ${totalBudget.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-[#002147] font-semibold mb-2 uppercase tracking-wider">Total Expended</p>
            <p className={`text-5xl font-bold ${
              isOverBudget ? 'text-red-800' : 'text-[#D4AF37]'
            }`} style={{ fontFamily: "'Playfair Display', serif" }}>
              ${totalCost.toLocaleString()}
            </p>
          </div>
        </div>
        <div className={`inline-flex items-center gap-2 px-6 py-3 border-3 mt-6 ${
          isOverBudget ? 'bg-red-100 text-red-900 border-red-900' : 'bg-green-100 text-green-900 border-green-900'
        }`}>
          <TrendingUp className="w-5 h-5" />
          <span className="text-lg font-bold">
            {percentageUsed.toFixed(1)}% Utilized
          </span>
        </div>
      </div>

      <div className="space-y-6">

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
          <h4 className="text-2xl font-bold text-[#002147] mb-6 text-center">Expenditure by Category</h4>
          <div className="space-y-6">
            {categories.map((category) => (
              <div key={category.key} className="bg-[#FFFEF9] border-2 border-[#002147] p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-5 h-5 border-2 border-[#002147]"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="font-bold text-[#002147] text-lg">{category.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#002147] font-semibold">
                      {category.percentage.toFixed(1)}%
                    </span>
                    <div className="border-b-2 border-dashed border-[#002147] w-12 mx-2"></div>
                    <span className="font-bold text-[#D4AF37] text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                      ${category.value.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="h-4 bg-[#FDF5E6] border-2 border-[#002147] overflow-hidden">
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
