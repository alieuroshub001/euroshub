'use client';
import { Keyboard } from 'lucide-react';
import { Service } from '../type';

const DataEntryTranscription: Service = {
  id: 3,
  title: 'Data Entry & Transcription',
  icon: <Keyboard className="w-8 h-8 text-[var(--primary)]" />,
  description: 'Accurate data processing services',
  longDescription: 'We provide meticulous data entry and transcription services with 99.9% accuracy. Our team handles all types of data conversion needs with strict confidentiality protocols.',
  features: [
    'Document digitization',
    'Survey data entry',
    'Audio/video transcription',
    'Database population',
    'Data cleaning and validation',
    'OCR processing'
  ],
  image: '/assets/services/data-entry.jpg'
};

export default DataEntryTranscription;