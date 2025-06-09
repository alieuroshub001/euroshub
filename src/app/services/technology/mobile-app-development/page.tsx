// app/services/technology/mobile-app-development/page.tsx
import MobileAppDevelopment from '../../../../components/ServicePage/technology/MobileAppDevelopment';
import ServiceDetail from '../../../../components/ServicePage/ServiceDetail';

export default function MobileAppDevelopmentPage() {
  return (
    <div className="py-20">
      <ServiceDetail 
        service={MobileAppDevelopment} 
        onBack={() => window.history.back()}
        serviceType="tech"
      />
    </div>
  );
}