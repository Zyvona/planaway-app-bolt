import React, { useState, useRef } from 'react';
import { MapPin, Clock, DollarSign, Calendar, Plane, Hotel, Utensils, Sparkles, ShoppingBag, Download } from 'lucide-react';
import { Day, Activity } from '../lib/mock-ai-data';
import { BudgetProgressBar } from './BudgetProgressBar';

interface TripTimelineProps {
  destination: string;
  origin: string;
  startDate: string;
  endDate: string;
  totalBudget: number;
  days: Day[];
  totalCost: number;
  budgetRemaining: number;
}

const categoryIcons = {
  transport: Plane,
  accommodation: Hotel,
  food: Utensils,
  activity: Sparkles,
  shopping: ShoppingBag
};

const categoryColors = {
  transport: 'bg-blue-50 text-blue-700 border-blue-200',
  accommodation: 'bg-purple-50 text-purple-700 border-purple-200',
  food: 'bg-pink-50 text-pink-700 border-pink-200',
  activity: 'bg-green-50 text-green-700 border-green-200',
  shopping: 'bg-amber-50 text-amber-700 border-amber-200'
};

export const TripTimeline: React.FC<TripTimelineProps> = ({
  destination,
  origin,
  startDate,
  endDate,
  totalBudget,
  days,
  totalCost
}) => {
  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set([1]));
  const timelineRef = useRef<HTMLDivElement>(null);

  const toggleDay = (dayNumber: number) => {
    const newExpanded = new Set(expandedDays);
    if (newExpanded.has(dayNumber)) {
      newExpanded.delete(dayNumber);
    } else {
      newExpanded.add(dayNumber);
    }
    setExpandedDays(newExpanded);
  };

  const categoryBreakdown = days.reduce((acc, day) => {
    day.activities.forEach(activity => {
      acc[activity.category] = (acc[activity.category] || 0) + activity.cost;
    });
    return acc;
  }, {} as Record<string, number>);

  const handleExportPDF = async () => {
    if (!timelineRef.current) return;

    try {
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).default;

      const element = timelineRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#f9fafb'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 10;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`${destination}-Trip-Itinerary.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-2xl p-8 mb-8 text-white">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Plane className="w-10 h-10" />
                <h1 className="text-4xl font-bold">Your {destination} Adventure</h1>
              </div>
              <div className="flex items-center gap-6 text-blue-100">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span className="text-lg">{origin} → {destination}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span className="text-lg">
                    {new Date(startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={handleExportPDF}
              className="flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Download className="w-5 h-5" />
              Export PDF
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div ref={timelineRef} className="space-y-6">
              {days.map((day, index) => {
                const isExpanded = expandedDays.has(day.dayNumber);
                const Icon = categoryIcons[day.activities[0]?.category || 'activity'];

                return (
                  <div
                    key={day.dayNumber}
                    className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl"
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                    }}
                  >
                    <button
                      onClick={() => toggleDay(day.dayNumber)}
                      className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-xl shadow-lg">
                          {day.dayNumber}
                        </div>
                        <div className="text-left">
                          <h3 className="text-2xl font-bold text-gray-900">{day.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {new Date(day.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Daily Total</p>
                          <p className="text-2xl font-bold text-blue-600">${day.totalCost.toLocaleString()}</p>
                        </div>
                        <div className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </button>

                    {isExpanded && (
                      <div
                        className="border-t border-gray-200 bg-gray-50"
                        style={{
                          animation: 'expandDown 0.4s ease-out both'
                        }}
                      >
                        <div className="p-6 space-y-4">
                          {day.activities.map((activity, actIndex) => {
                            const ActivityIcon = categoryIcons[activity.category];
                            return (
                              <div
                                key={activity.id}
                                className="bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                                style={{
                                  animation: `slideInRight 0.4s ease-out ${actIndex * 0.1}s both`
                                }}
                              >
                                <div className="flex gap-4">
                                  <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center border ${categoryColors[activity.category]}`}>
                                    <ActivityIcon className="w-6 h-6" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-start justify-between mb-2">
                                      <div className="flex-1">
                                        <h4 className="text-lg font-semibold text-gray-900">{activity.title}</h4>
                                        <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                                      </div>
                                      <div className="text-right ml-4">
                                        <p className="text-xl font-bold text-gray-900">
                                          ${activity.cost.toLocaleString()}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
                                      <div className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        <span>{activity.time}</span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4" />
                                        <span>{activity.location}</span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        <span>{activity.duration}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <BudgetProgressBar
                totalBudget={totalBudget}
                totalCost={totalCost}
                categoryBreakdown={categoryBreakdown as any}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes expandDown {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 2000px;
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};
