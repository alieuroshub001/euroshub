// app/services/business/data-entry-transcription/page.tsx
import DataEntryTranscription from '../../../../components/ServicePage/business/DataEntryTranscription';
import ServiceDetail from '../../../../components/ServicePage/ServiceDetail';

export default function DataEntryTranscriptionPage() {
  return (
    <div className="py-20">
      <ServiceDetail 
        service={DataEntryTranscription} 
        onBack={() => window.history.back()}
        serviceType="business"
      />
    </div>
  );
}