// app/services/business/lead-generation/page.tsx
import LeadGeneration from '../../../../components/ServicePage/business/LeadGeneration';
import ServiceDetail from '../../../../components/ServicePage/ServiceDetail';

export default function LeadGenerationPage() {
  return (
    <div className="py-20">
      <ServiceDetail 
        service={LeadGeneration} 
        onBack={() => window.history.back()}
        serviceType="business"
      />
    </div>
  );
}