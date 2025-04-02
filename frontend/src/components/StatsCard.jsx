import React from 'react';

const StatsCard = ({ title, value, trend, icon, color }) => {
  const isPositive = trend.includes('↑');
  const trendColor = isPositive ? 'text-green-600' : 'text-red-600';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center text-lg" 
            style={{ backgroundColor: `${color}15` }}
          >
            <span style={{ color: color }}>{icon}</span>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-3xl font-bold text-gray-800 mb-1">{value}</div>
          <div className={`text-xs font-medium ${trendColor}`}>{trend}</div>
        </div>
      </div>
      <div className="h-1" style={{ backgroundColor: color }}></div>
    </div>
  );
};

export default StatsCard;