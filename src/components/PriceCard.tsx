import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface PriceData {
  price: number;
  timestamp: string;
  source: string;
}

interface PriceCardProps {
  currentPrice: PriceData | null;
  previousPrice: number | null;
}

export const PriceCard: React.FC<PriceCardProps> = ({ currentPrice, previousPrice }) => {
  if (!currentPrice) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 animate-pulse">
        <div className="h-8 bg-gray-700 rounded mb-4"></div>
        <div className="h-12 bg-gray-700 rounded"></div>
      </div>
    );
  }

  const priceChange = previousPrice ? currentPrice.price - previousPrice : 0;
  const priceChangePercent = previousPrice ? (priceChange / previousPrice) * 100 : 0;

  const getTrendIcon = () => {
    if (priceChange > 0) return <TrendingUp className="w-6 h-6 text-emerald-400" />;
    if (priceChange < 0) return <TrendingDown className="w-6 h-6 text-red-400" />;
    return <Minus className="w-6 h-6 text-gray-400" />;
  };

  const getTrendColor = () => {
    if (priceChange > 0) return 'text-emerald-400';
    if (priceChange < 0) return 'text-red-400';
    return 'text-gray-400';
  };

  const getSourceBadgeColor = () => {
    switch (currentPrice.source) {
      case 'stellar': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'csv': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'hardcoded': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 hover:border-gray-600/50 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
            <span className="text-emerald-400 font-bold text-lg">K</span>
          </div>
          <div>
            <h3 className="text-white text-xl font-semibold">KALE</h3>
            <p className="text-gray-400 text-sm">Kale Token</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full border text-xs font-medium ${getSourceBadgeColor()}`}>
          {currentPrice.source.toUpperCase()}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-baseline space-x-3">
          <span className="text-white text-4xl font-bold">
            ${currentPrice.price.toFixed(6)}
          </span>
          <span className="text-gray-400 text-lg">USD</span>
        </div>

        {previousPrice && (
          <div className="flex items-center space-x-2">
            {getTrendIcon()}
            <span className={`text-sm font-medium ${getTrendColor()}`}>
              {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(6)} ({priceChangePercent >= 0 ? '+' : ''}{priceChangePercent.toFixed(2)}%)
            </span>
          </div>
        )}

        <div className="text-gray-400 text-xs">
          Last updated: {new Date(currentPrice.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};