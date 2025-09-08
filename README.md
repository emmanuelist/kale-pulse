# KALE Pulse 📊

**Real-time KALE Token Price Monitoring Dashboard**

A modern, responsive web application built for tracking KALE cryptocurrency prices in real-time. Designed specifically for the Stellar blockchain ecosystem, KALE Pulse provides comprehensive price analytics, trend visualization, and multi-source data aggregation.

![KALE Pulse Dashboard](https://img.shields.io/badge/Status-Live-brightgreen) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)

## 🚀 Features

### 📈 Real-Time Price Tracking

- **Live Price Updates**: Automated price fetching every 10 seconds
- **Multi-Source Data**: Aggregates data from Stellar network, CSV files, and hardcoded values
- **Historical Analysis**: Maintains rolling 50-point price history for trend analysis

### 📊 Advanced Analytics

- **Interactive Charts**: Dynamic price visualization using Recharts library
- **Statistical Insights**: Price variance, trend analysis, and volatility metrics
- **Data Source Breakdown**: Transparent tracking of data sources and reliability

### 🎨 Modern UI/UX

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark Theme**: Professional dark mode interface with gradient backgrounds
- **Real-Time Status**: Connection status indicators and error handling
- **Smooth Animations**: Fluid transitions and micro-interactions

## 🛠️ Technology Stack

| Category | Technology | Purpose |
|----------|------------|---------|
| **Frontend** | React 18 + TypeScript | Modern UI development with type safety |
| **Build Tool** | Vite | Lightning-fast development and building |
| **Styling** | Tailwind CSS + PostCSS | Utility-first CSS framework |
| **Charts** | Recharts | Interactive data visualization |
| **Icons** | Lucide React | Beautiful, customizable icons |
| **Code Quality** | ESLint + TypeScript ESLint | Code linting and consistency |

## 📦 Installation & Setup

### Prerequisites

- **Node.js** >= 16.0.0
- **npm** >= 8.0.0

### Quick Start

```bash
# Clone the repository
git clone https://github.com/emmanuelist/kale-pulse.git
cd kale-pulse

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Commands

```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Lint code
npm run lint

# Preview production build locally
npm run preview
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── PriceCard.tsx         # Current price display component
│   ├── PriceChart.tsx        # Historical price chart
│   ├── StatisticsCard.tsx    # Analytics and statistics
│   └── StatusIndicator.tsx   # Connection status indicator
├── hooks/
│   └── usePriceData.ts       # Custom hook for price data management
├── App.tsx                   # Main application component
├── main.tsx                  # Application entry point
├── index.css                 # Global styles and Tailwind imports
└── vite-env.d.ts            # Vite environment types
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```bash
# API Configuration (Optional - currently using mock data)
VITE_API_BASE_URL=https://your-api-endpoint.com
VITE_UPDATE_INTERVAL=10000

# Stellar Network Configuration
VITE_STELLAR_NETWORK=public
VITE_KALE_ASSET_CODE=KALE
```

### Tailwind Configuration

The project uses a custom Tailwind configuration optimized for the dark theme dashboard aesthetic. Modify `tailwind.config.js` for styling customizations.

## 📊 Data Sources

KALE Pulse aggregates price data from multiple sources:

1. **Stellar Network**: Direct integration with Stellar blockchain
2. **CSV Data**: Historical price data from CSV files
3. **Hardcoded Values**: Fallback data for testing and demonstration

## 🔄 Real-Time Updates

The application implements a polling strategy with:

- **Update Frequency**: 10-second intervals
- **Data Retention**: Rolling window of 50 most recent price points
- **Error Handling**: Automatic retry logic with user feedback
- **Connection Status**: Visual indicators for data source connectivity

## 📱 Responsive Design

KALE Pulse is fully responsive across all device sizes:

- **Desktop**: Full-featured dashboard with side-by-side layouts
- **Tablet**: Adaptive grid system with optimized touch targets
- **Mobile**: Stack layout with swipe-friendly interactions

## 🎯 Performance Optimizations

- **Bundle Splitting**: Optimized chunk sizes for faster loading
- **Tree Shaking**: Eliminates unused code in production builds
- **Memory Management**: Efficient data retention with sliding window
- **Lazy Loading**: Components and routes loaded on demand

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Netlify

```bash
# Build the project
npm run build

# Deploy dist/ folder to Netlify
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🔮 Roadmap

### Phase 1 - Core Enhancement

- [ ] WebSocket integration for true real-time updates
- [ ] Enhanced error handling and offline support
- [ ] Price alerts and notifications

### Phase 2 - Advanced Features

- [ ] Historical data export (CSV, JSON)
- [ ] Technical indicators (RSI, MACD, Bollinger Bands)
- [ ] Portfolio tracking integration

### Phase 3 - Platform Integration

- [ ] Stellar wallet integration
- [ ] Trading interface
- [ ] Multi-asset support

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Emmanuel List**

- GitHub: [@emmanuelist](https://github.com/emmanuelist)
- Project: [KALE Pulse](https://github.com/emmanuelist/kale-pulse)

## 🙏 Acknowledgments

- **Stellar Development Foundation** for blockchain infrastructure
- **React Community** for excellent development tools
- **Tailwind CSS Team** for the utility-first CSS framework
- **Recharts Contributors** for powerful charting components

---

<div align="center">

**Built with ❤️ for the Stellar Ecosystem**

[Report Bug](https://github.com/emmanuelist/kale-pulse/issues) • [Request Feature](https://github.com/emmanuelist/kale-pulse/issues) • [Documentation](https://github.com/emmanuelist/kale-pulse/wiki)

</div>
