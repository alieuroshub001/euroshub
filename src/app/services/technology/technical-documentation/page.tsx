// app/services/technology/technical-documentation/page.tsx
import TechnicalDocumentation from '../../../../components/ServicePage/technology/TechnicalDocumentation';
import ServiceDetail from '../../../../components/ServicePage/ServiceDetail';

export default function TechnicalDocumentationPage() {
  return (
    <div className="py-20">
      <ServiceDetail 
        service={TechnicalDocumentation} 
        onBack={() => window.history.back()}
        serviceType="tech"
      />
    </div>
  );
}