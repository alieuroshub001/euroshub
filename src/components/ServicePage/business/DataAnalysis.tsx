'use client';
import { BarChart2 } from 'lucide-react';
import { Service } from '../type';

const DataAnalysis: Service = {
  id: 9,
  title: 'Data Analysis',
  icon: <BarChart2 className="w-8 h-8 text-[var(--primary)]" />,
  description: 'Statistical business insights',
  longDescription: 'Our data analysts transform your raw data into actionable insights through advanced statistical techniques and clear visualizations.',
  features: [
    'Descriptive analytics',
    'Diagnostic analysis',
    'Predictive modeling',
    'Data visualization',
    'KPI development',
    'Performance dashboards'
  ],
  image: '/assets/services/analysis.jpeg'
};

export default DataAnalysis;