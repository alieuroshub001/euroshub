// app/services/business/virtual-assistance/page.tsx
import VirtualAssistance from '../../../../components/ServicePage/business/VirtualAssistance';
import ServiceDetail from '../../../../components/ServicePage/ServiceDetail';

export default function VirtualAssistancePage() {
  return (
    <div className="py-20">
      <ServiceDetail 
        service={VirtualAssistance} 
        onBack={() => window.history.back()}
        serviceType="business"
      />
    </div>
  );
}