'use client';

interface CompletenessIndicatorProps {
  percentage: number;
  className?: string;
}

export default function CompletenessIndicator({ percentage, className = '' }: CompletenessIndicatorProps) {
  const getColorClass = (percentage: number) => {
    if (percentage < 50) return 'bg-red-500';
    if (percentage < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getTextColor = (percentage: number) => {
    if (percentage < 50) return 'text-red-600';
    if (percentage < 70) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getStatusText = (percentage: number) => {
    if (percentage < 50) return 'Getting started';
    if (percentage < 70) return 'Almost ready';
    return 'Ready to generate';
  };

  return (
    <div className={`bg-white rounded-lg p-4 border border-gray-200 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-800">Prompt Completeness</span>
        <span className={`text-sm font-semibold ${getTextColor(percentage)}`}>
          {Math.round(percentage)}%
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${getColorClass(percentage)}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <span className={`text-xs ${getTextColor(percentage)}`}>
          {getStatusText(percentage)}
        </span>
        {percentage >= 70 && (
          <span className="text-xs text-green-600 font-medium">
            ✓ Ready to generate
          </span>
        )}
      </div>
    </div>
  );
}
