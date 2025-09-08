import { useState, useEffect, useCallback } from 'react';

interface PriceData {
  price: number;
  timestamp: string;
  source: string;
}

interface UsePriceDataReturn {
  currentPrice: PriceData | null;
  priceHistory: PriceData[];
  isConnected: boolean;
  error: string | null;
}

export const usePriceData = (): UsePriceDataReturn => {
  const [currentPrice, setCurrentPrice] = useState<PriceData | null>(null);
  const [priceHistory, setPriceHistory] = useState<PriceData[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateMockPrice = useCallback((): PriceData => {
    const basePrice = 0.095;
    const variation = (Math.random() - 0.5) * 0.01; // ±0.005 variation
    const price = Math.max(0.08, basePrice + variation);
    
    const sources = ['stellar', 'csv', 'hardcoded'];
    const randomSource = sources[Math.floor(Math.random() * sources.length)];
    
    return {
      price: parseFloat(price.toFixed(6)),
      timestamp: new Date().toISOString(),
      source: randomSource
    };
  }, []);

  const fetchPriceData = useCallback(async () => {
    try {
      setIsConnected(true);
      setError(null);
      
      // Simulate API call - replace with actual backend integration
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newPrice = generateMockPrice();
      setCurrentPrice(newPrice);
      
      setPriceHistory(prev => {
        const updated = [...prev, newPrice];
        // Keep only last 50 data points for performance
        return updated.slice(-50);
      });
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch price data');
      setIsConnected(false);
    }
  }, [generateMockPrice]);

  useEffect(() => {
    // Load initial data
    fetchPriceData();
    
    // Set up polling interval (10 seconds to match Python script)
    const interval = setInterval(fetchPriceData, 10000);
    
    return () => clearInterval(interval);
  }, [fetchPriceData]);

  return {
    currentPrice,
    priceHistory,
    isConnected,
    error
  };
};