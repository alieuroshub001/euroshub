// app/services/technology/devops-services/page.tsx
import DevOpsServices from '../../../../components/ServicePage/technology/DevOpsServices';
import ServiceDetail from '../../../../components/ServicePage/ServiceDetail';

export default function DevOpsServicesPage() {
  return (
    <div className="py-20">
      <ServiceDetail 
        service={DevOpsServices} 
        onBack={() => window.history.back()}
        serviceType="tech"
      />
    </div>
  );
}