'use client';
import { HardDrive } from 'lucide-react';
import { Service } from '../type';

const DataMining: Service = {
  id: 7,
  title: 'Data Mining',
  icon: <HardDrive className="w-8 h-8 text-[var(--primary)]" />,
  description: 'Insight extraction from data',
  longDescription: 'Our data mining services uncover valuable patterns and relationships in your data that can drive strategic decisions and competitive advantage.',
  features: [
    'Pattern recognition',
    'Predictive modeling',
    'Market basket analysis',
    'Customer segmentation',
    'Anomaly detection',
    'Trend analysis'
  ],
  image: '/assets/services/mining.jpg'
};

export default DataMining;