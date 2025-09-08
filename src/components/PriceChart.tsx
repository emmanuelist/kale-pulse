import React, { useMemo, useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Clock, ZoomIn, ZoomOut } from 'lucide-react';

interface PriceData {
  price: number;
  timestamp: string;
  source: string;
}

interface PriceChartProps {
  priceHistory: PriceData[];
}

export const PriceChart: React.FC<PriceChartProps> = ({ priceHistory }) => {
  // Initialize selectedRange from localStorage or default to '24H'
  const [selectedRange, setSelectedRange] = useState<string>(() => {
    try {
      const savedRange = localStorage.getItem('kaleChartTimeRange');
      return savedRange || '24H';
    } catch (error) {
      console.warn('Failed to read chart time range from localStorage:', error);
      return '24H';
    }
  });
  const [showAverage, setShowAverage] = useState<boolean>(true);

  const timeRanges = [
    { label: '1H', value: '1H', hours: 1 },
    { label: '6H', value: '6H', hours: 6 },
    { label: '24H', value: '24H', hours: 24 },
    { label: '7D', value: '7D', hours: 168 },
    { label: 'ALL', value: 'ALL', hours: null }
  ];

  // Save selectedRange to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('kaleChartTimeRange', selectedRange);
    } catch (error) {
      console.warn('Failed to save chart time range to localStorage:', error);
    }
  }, [selectedRange]);

  const filteredData = useMemo(() => {
    if (selectedRange === 'ALL') {
      return priceHistory;
    }

    const range = timeRanges.find(r => r.value === selectedRange);
    if (!range || !range.hours) return priceHistory;

    const cutoffTime = new Date();
    cutoffTime.setHours(cutoffTime.getHours() - range.hours);

    return priceHistory.filter(data => {
      const dataTime = new Date(data.timestamp);
      return dataTime >= cutoffTime;
    });
  }, [priceHistory, selectedRange]);

  const chartData = useMemo(() => {
    const isLongRange = selectedRange === '7D' || selectedRange === 'ALL';
    
    return filteredData.map((data, index) => ({
      ...data,
      time: isLongRange 
        ? new Date(data.timestamp).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        : new Date(data.timestamp).toLocaleTimeString('en-US', { 
            hour12: false,
            hour: '2-digit',
            minute: '2-digit'
          }),
      index
    }));
  }, [filteredData, selectedRange]);

  const averagePrice = useMemo(() => {
    if (filteredData.length === 0) return 0;
    return filteredData.reduce((sum, data) => sum + data.price, 0) / filteredData.length;
  }, [filteredData]);

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'stellar': return '#3b82f6';
      case 'csv': return '#f97316';
      case 'hardcoded': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-800/95 backdrop-blur-sm border border-gray-600/50 rounded-lg p-3 shadow-xl">
          <p className="text-gray-300 text-sm mb-1">Time: {label}</p>
          <p className="text-white font-semibold">Price: ${data.price.toFixed(6)} USD</p>
          <p className="text-gray-400 text-xs mt-1">Source: {data.source}</p>
        </div>
      );
    }
    return null;
  };

  if (chartData.length === 0) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 h-96 flex items-center justify-center">
        <div className="text-center">
          <Clock className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <div className="text-gray-400">No price data available for selected range</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white text-lg font-semibold flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Price History
        </h3>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowAverage(!showAverage)}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              showAverage 
                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' 
                : 'bg-gray-700/50 text-gray-400 border border-gray-600/50 hover:bg-gray-600/50'
            }`}
          >
            Avg Line
          </button>
        </div>
      </div>

      {/* Time Range Selection */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-1 bg-gray-700/30 rounded-lg p-1">
          {timeRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => setSelectedRange(range.value)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                selectedRange === range.value
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                  : 'text-gray-400 hover:text-white hover:bg-gray-600/50'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <ZoomIn className="w-4 h-4" />
          <span>{filteredData.length} points</span>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
            <XAxis 
              dataKey="time" 
              stroke="#9ca3af"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#9ca3af"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value.toFixed(4)}`}
            />
            <Tooltip content={<CustomTooltip />} />
            {showAverage && (
              <ReferenceLine 
                y={averagePrice} 
                stroke="#8b5cf6" 
                strokeDasharray="5 5" 
                strokeOpacity={0.6}
                label={{ value: "Average", position: "insideTopRight", style: { fill: '#8b5cf6', fontSize: 12 } }}
              />
            )}
            <Line
              type="monotone"
              dataKey="price"
              stroke="#10b981"
              strokeWidth={2}
              dot={(props) => {
                const { cx, cy, payload } = props;
                return (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={3}
                    fill={getSourceColor(payload.source)}
                    stroke="#1f2937"
                    strokeWidth={2}
                  />
                );
              }}
              activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2, fill: '#10b981' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      {/* Chart Legend and Stats */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-6 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
            <span className="text-gray-400">Stellar</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
            <span className="text-gray-400">CSV</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <span className="text-gray-400">Hardcoded</span>
          </div>
        </div>

        {filteredData.length > 0 && (
          <div className="text-xs text-gray-400">
            Range: ${Math.min(...filteredData.map(d => d.price)).toFixed(4)} - ${Math.max(...filteredData.map(d => d.price)).toFixed(4)}
          </div>
        )}
      </div>

      {/* Quick Stats for Selected Range */}
      {filteredData.length > 1 && (
        <div className="mt-4 pt-4 border-t border-gray-700/50">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-xs text-gray-400 mb-1">First</div>
              <div className="text-sm font-medium text-white">${filteredData[0].price.toFixed(4)}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Last</div>
              <div className="text-sm font-medium text-white">${filteredData[filteredData.length - 1].price.toFixed(4)}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Change</div>
              <div className={`text-sm font-medium ${
                filteredData[filteredData.length - 1].price >= filteredData[0].price 
                  ? 'text-emerald-400' 
                  : 'text-red-400'
              }`}>
                {((filteredData[filteredData.length - 1].price - filteredData[0].price) / filteredData[0].price * 100).toFixed(2)}%
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Volatility</div>
              <div className="text-sm font-medium text-white">
                {(Math.max(...filteredData.map(d => d.price)) - Math.min(...filteredData.map(d => d.price))).toFixed(4)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};