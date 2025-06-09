// app/services/technology/web-development/page.tsx
import WebDevelopment from '../../../../components/ServicePage/technology/WebDevelopment';
import ServiceDetail from '../../../../components/ServicePage/ServiceDetail';

export default function WebDevelopmentPage() {
  return (
    <div className="py-20">
      <ServiceDetail 
        service={WebDevelopment} 
        onBack={() => window.history.back()}
        serviceType="tech"
      />
    </div>
  );
}