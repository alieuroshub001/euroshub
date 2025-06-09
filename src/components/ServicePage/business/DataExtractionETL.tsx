'use client';
import { Database } from 'lucide-react';
import { Service } from '../type';

const DataExtractionETL: Service = {
  id: 4,
  title: 'Data Extraction/ETL',
  icon: <Database className="w-8 h-8 text-[var(--primary)]" />,
  description: 'Structured data collection',
  longDescription: 'Our ETL (Extract, Transform, Load) services help you consolidate data from multiple sources into usable formats for analysis and decision making.',
  features: [
    'Web scraping and crawling',
    'API data extraction',
    'PDF/text extraction',
    'Data transformation',
    'Database migration',
    'Data warehousing'
  ],
  image: '/assets/services/extraction.jpg'
};

export default DataExtractionETL;