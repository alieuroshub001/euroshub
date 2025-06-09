// app/services/business/data-extraction-etl/page.tsx
import DataExtractionETL from '../../../../components/ServicePage/business/DataExtractionETL';
import ServiceDetail from '../../../../components/ServicePage/ServiceDetail';

export default function DataExtractionETLPage() {
  return (
    <div className="py-20">
      <ServiceDetail 
        service={DataExtractionETL} 
        onBack={() => window.history.back()}
        serviceType="business"
      />
    </div>
  );
}