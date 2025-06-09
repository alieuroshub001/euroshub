'use client';
import { Search } from 'lucide-react';
import { Service } from '../type';

const MarketResearch: Service = {
  id: 8,
  title: 'Market Research',
  icon: <Search className="w-8 h-8 text-[var(--primary)]" />,
  description: 'Competitive intelligence',
  longDescription: 'We conduct comprehensive market research to help you understand your industry landscape, customer needs, and competitive positioning.',
  features: [
    'Competitor analysis',
    'Customer surveys',
    'Focus group facilitation',
    'Market sizing',
    'SWOT analysis',
    'Trend forecasting'
  ],
  image: '/assets/services/research.jpg'
};

export default MarketResearch;