import React from 'react';
import { Activity, TrendingUp, Clock } from 'lucide-react';
import { PriceCard } from './components/PriceCard';
import { StatisticsCard } from './components/StatisticsCard';
import { PriceChart } from './components/PriceChart';
import { StatusIndicator } from './components/StatusIndicator';
import { usePriceData } from './hooks/usePriceData';

function App() {
  const { currentPrice, priceHistory, isConnected, error } = usePriceData();

  const previousPrice = priceHistory.length > 1 ? priceHistory[priceHistory.length - 2].price : null;
  const lastUpdate = currentPrice ? new Date(currentPrice.timestamp).toLocaleTimeString() : 'Never';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-700/50 bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">KALE Pulse</h1>
                <p className="text-gray-400 text-sm">Real-time cryptocurrency monitoring</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-400">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Updates every 10s</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Display */}
        {error && (
          <div className="mb-6 bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg">
            <p className="text-sm">⚠️ {error}</p>
          </div>
        )}

        {/* Status and Price Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <PriceCard currentPrice={currentPrice} previousPrice={previousPrice} />
          </div>
          <div>
            <StatusIndicator 
              isConnected={isConnected}
              lastUpdate={lastUpdate}
              dataSource={currentPrice?.source || 'unknown'}
            />
          </div>
        </div>

        {/* Chart and Statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <PriceChart priceHistory={priceHistory} />
          </div>
          <div>
            <StatisticsCard priceHistory={priceHistory} />
          </div>
        </div>

        {/* Data Points Summary */}
        {priceHistory.length > 0 && (
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="text-white font-semibold">Data Collection</h3>
                  <p className="text-gray-400 text-sm">Tracking KALE token price movements</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{priceHistory.length}</div>
                <div className="text-gray-400 text-sm">Data Points</div>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-3 gap-4">
              {['stellar', 'csv', 'hardcoded'].map(source => {
                const count = priceHistory.filter(p => p.source === source).length;
                const percentage = priceHistory.length > 0 ? (count / priceHistory.length) * 100 : 0;
                
                return (
                  <div key={source} className="bg-gray-700/30 rounded-lg p-3">
                    <div className="text-sm text-gray-300 capitalize mb-1">{source}</div>
                    <div className="text-xl font-semibold text-white">{count}</div>
                    <div className="text-xs text-gray-400">{percentage.toFixed(1)}%</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-700/50 bg-gray-800/30 backdrop-blur-sm mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-400 text-sm">
            <p>KALE Pulse • Built with React & TypeScript • Real-time price monitoring</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;