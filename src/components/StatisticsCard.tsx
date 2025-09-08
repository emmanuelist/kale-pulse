import React from 'react';
import { Activity, TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';

interface PriceData {
  price: number;
  timestamp: string;
  source: string;
}

interface StatisticsCardProps {
  priceHistory: PriceData[];
}

export const StatisticsCard: React.FC<StatisticsCardProps> = ({ priceHistory }) => {
  if (priceHistory.length === 0) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        <h3 className="text-white text-lg font-semibold mb-4 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2" />
          Statistics
        </h3>
        <div className="text-gray-400">No data available</div>
      </div>
    );
  }

  const prices = priceHistory.map(d => d.price);
  const currentPrice = prices[prices.length - 1];
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const avgPrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;

  const stats = [
    {
      label: 'Current Price',
      value: `$${currentPrice.toFixed(6)}`,
      icon: Activity,
      color: 'text-blue-400'
    },
    {
      label: '24h High',
      value: `$${maxPrice.toFixed(6)}`,
      icon: TrendingUp,
      color: 'text-emerald-400'
    },
    {
      label: '24h Low',
      value: `$${minPrice.toFixed(6)}`,
      icon: TrendingDown,
      color: 'text-red-400'
    },
    {
      label: 'Average',
      value: `$${avgPrice.toFixed(6)}`,
      icon: BarChart3,
      color: 'text-purple-400'
    }
  ];

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
      <h3 className="text-white text-lg font-semibold mb-6 flex items-center">
        <BarChart3 className="w-5 h-5 mr-2" />
        Statistics
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gray-700/30 rounded-lg p-4 hover:bg-gray-700/50 transition-colors duration-200">
            <div className="flex items-center mb-2">
              <stat.icon className={`w-4 h-4 ${stat.color} mr-2`} />
              <span className="text-gray-300 text-sm">{stat.label}</span>
            </div>
            <div className="text-white text-lg font-semibold">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-700/50">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Data Points</span>
          <span className="text-white font-medium">{priceHistory.length}</span>
        </div>
      </div>
    </div>
  );
};