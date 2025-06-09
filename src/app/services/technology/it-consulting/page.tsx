// app/services/technology/it-consulting/page.tsx
import ITConsulting from '../../../../components/ServicePage/technology/ITConsulting';
import ServiceDetail from '../../../../components/ServicePage/ServiceDetail';

export default function ITConsultingPage() {
  return (
    <div className="py-20">
      <ServiceDetail 
        service={ITConsulting} 
        onBack={() => window.history.back()}
        serviceType="tech"
      />
    </div>
  );
}