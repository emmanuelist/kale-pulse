import React from 'react';
import { Wifi, WifiOff, Database, FileText, TestTube } from 'lucide-react';

interface StatusIndicatorProps {
  isConnected: boolean;
  lastUpdate: string;
  dataSource: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ 
  isConnected, 
  lastUpdate, 
  dataSource 
}) => {
  const getSourceIcon = () => {
    switch (dataSource) {
      case 'stellar': return <Database className="w-4 h-4" />;
      case 'csv': return <FileText className="w-4 h-4" />;
      case 'hardcoded': return <TestTube className="w-4 h-4" />;
      default: return <Database className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`flex items-center space-x-2 ${isConnected ? 'text-emerald-400' : 'text-red-400'}`}>
            {isConnected ? (
              <Wifi className="w-5 h-5" />
            ) : (
              <WifiOff className="w-5 h-5" />
            )}
            <span className="text-sm font-medium">
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
          
          {isConnected && (
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          )}
        </div>

        <div className="flex items-center space-x-2 text-gray-400">
          {getSourceIcon()}
          <span className="text-sm capitalize">{dataSource}</span>
        </div>
      </div>
      
      <div className="mt-3 text-xs text-gray-400">
        Last update: {lastUpdate}
      </div>
    </div>
  );
};