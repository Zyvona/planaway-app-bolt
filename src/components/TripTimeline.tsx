import React, { useState, useRef } from 'react';
import { MapPin, Clock, DollarSign, Calendar, Plane, Hotel, Utensils, Sparkles, ShoppingBag, Download, Shield } from 'lucide-react';
import { Day, Activity } from '../lib/mock-ai-data';
import { BudgetProgressBar } from './BudgetProgressBar';

type ViewMode = 'itinerary' | 'budget' | 'safety';

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
  transport: 'bg-blue-50 text-[#002147] border-[#002147]',
  accommodation: 'bg-[#F5E6D3] text-[#002147] border-[#002147]',
  food: 'bg-red-50 text-[#002147] border-[#002147]',
  activity: 'bg-green-50 text-[#002147] border-[#002147]',
  shopping: 'bg-[#FDF5E6] text-[#002147] border-[#D4AF37]'
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
  const [viewMode, setViewMode] = useState<ViewMode>('itinerary');
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
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="vintage-card p-10 mb-10">
          <div className="vintage-header -mx-10 -mt-10 mb-8 px-10 py-8">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <Plane className="w-12 h-12 text-[#D4AF37]" />
                  <h1 className="text-5xl font-bold text-[#D4AF37]">
                    {destination} Expedition
                  </h1>
                </div>
                <div className="flex items-center gap-8 text-[#D4AF37]">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span className="text-lg font-medium">{origin} → {destination}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span className="text-lg font-medium">
                      {new Date(startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleExportPDF}
                className="vintage-button flex items-center gap-2 px-6 py-3 text-[#002147] font-bold"
              >
                <Download className="w-5 h-5" />
                Export PDF
              </button>
            </div>
          </div>

          <div className="flex gap-2 mb-8">
            <button
              onClick={() => setViewMode('itinerary')}
              className={`luggage-tag ${viewMode === 'itinerary' ? 'active' : ''}`}
            >
              <Plane className="w-4 h-4 inline mr-2" />
              Itinerary
            </button>
            <button
              onClick={() => setViewMode('budget')}
              className={`luggage-tag ${viewMode === 'budget' ? 'active' : ''}`}
            >
              <DollarSign className="w-4 h-4 inline mr-2" />
              Budget
            </button>
            <button
              onClick={() => setViewMode('safety')}
              className={`luggage-tag ${viewMode === 'safety' ? 'active' : ''}`}
            >
              <Shield className="w-4 h-4 inline mr-2" />
              Safety
            </button>
          </div>
        </div>

        {viewMode === 'itinerary' && (
          <div ref={timelineRef} className="space-y-6">
            {days.map((day, index) => {
              const isExpanded = expandedDays.has(day.dayNumber);

              return (
                <div
                  key={day.dayNumber}
                  className="vintage-card overflow-hidden transition-all duration-300 hover:translate-y-[-2px]"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                  }}
                >
                  <button
                    onClick={() => toggleDay(day.dayNumber)}
                    className="w-full p-8 flex items-center justify-between hover:bg-[#F5E6D3] transition-colors duration-200"
                  >
                    <div className="flex items-center gap-6">
                      <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#D4AF37] to-[#C5A028] border-4 border-[#002147] text-[#002147] font-bold text-2xl shadow-lg">
                        {day.dayNumber}
                      </div>
                      <div className="text-left">
                        <h3 className="text-3xl font-bold text-[#002147]">{day.title}</h3>
                        <p className="text-base text-[#002147] mt-1 font-medium">
                          {new Date(day.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-sm text-[#002147] font-semibold">Daily Total</p>
                        <p className="text-3xl font-bold text-[#D4AF37]">${day.totalCost.toLocaleString()}</p>
                      </div>
                      <div className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                        <svg className="w-8 h-8 text-[#002147]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </button>

                  {isExpanded && (
                    <div
                      className="border-t-4 border-[#002147] bg-[#FFFEF9]"
                      style={{
                        animation: 'expandDown 0.4s ease-out both'
                      }}
                    >
                      <div className="p-8 space-y-5">
                        {day.activities.map((activity, actIndex) => {
                          const ActivityIcon = categoryIcons[activity.category];
                          return (
                            <div
                              key={activity.id}
                              className="bg-[#FDF5E6] border-3 border-[#002147] p-6 shadow-md hover:shadow-lg transition-all duration-300"
                              style={{
                                animation: `slideInRight 0.4s ease-out ${actIndex * 0.1}s both`
                              }}
                            >
                              <div className="flex gap-5">
                                <div className={`flex-shrink-0 w-14 h-14 flex items-center justify-center vintage-stamp ${categoryColors[activity.category]}`}>
                                  <ActivityIcon className="w-7 h-7" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                      <h4 className="text-xl font-bold text-[#002147]">{activity.title}</h4>
                                      <p className="text-base text-[#002147] mt-2 leading-relaxed">{activity.description}</p>
                                    </div>
                                    <div className="text-right ml-6">
                                      <p className="text-2xl font-bold text-[#D4AF37]">
                                        ${activity.cost.toLocaleString()}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex flex-wrap gap-6 mt-4 text-sm text-[#002147] font-medium">
                                    <div className="flex items-center gap-2">
                                      <Clock className="w-5 h-5" />
                                      <span>{activity.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <MapPin className="w-5 h-5" />
                                      <span>{activity.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Calendar className="w-5 h-5" />
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
        )}

        {viewMode === 'budget' && (
          <div className="vintage-card p-8">
            <BudgetProgressBar
              totalBudget={totalBudget}
              totalCost={totalCost}
              categoryBreakdown={categoryBreakdown as any}
            />
          </div>
        )}

        {viewMode === 'safety' && (
          <div className="vintage-card p-8">
            <h2 className="text-4xl font-bold text-[#002147] mb-8 text-center border-b-4 border-[#002147] pb-4">Safety Information</h2>
            <div className="space-y-6 text-[#002147]">
              <div className="passport-card">
                <h3 className="font-bold text-2xl mb-3 text-[#002147]">Emergency Contacts</h3>
                <p className="leading-relaxed text-base">Keep local emergency numbers handy and register with your embassy.</p>
              </div>
              <div className="passport-card">
                <h3 className="font-bold text-2xl mb-3 text-[#002147]">Travel Insurance</h3>
                <p className="leading-relaxed text-base">Ensure you have comprehensive travel insurance covering medical emergencies and trip cancellations.</p>
              </div>
              <div className="passport-card">
                <h3 className="font-bold text-2xl mb-3 text-[#002147]">Health Precautions</h3>
                <p className="leading-relaxed text-base">Check vaccination requirements and carry necessary medications with prescriptions.</p>
              </div>
            </div>
          </div>
        )}
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
