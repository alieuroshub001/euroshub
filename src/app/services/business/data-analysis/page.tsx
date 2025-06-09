// app/services/business/data-analysis/page.tsx
import DataAnalysis from '../../../../components/ServicePage/business/DataAnalysis';
import ServiceDetail from '../../../../components/ServicePage/ServiceDetail';

export default function DataAnalysisPage() {
  return (
    <div className="py-20">
      <ServiceDetail 
        service={DataAnalysis} 
        onBack={() => window.history.back()}
        serviceType="business"
      />
    </div>
  );
}