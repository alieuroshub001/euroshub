// app/services/technology/cloud-solutions/page.tsx
import CloudSolutions from '../../../../components/ServicePage/technology/CloudSolutions';
import ServiceDetail from '../../../../components/ServicePage/ServiceDetail';

export default function CloudSolutionsPage() {
  return (
    <div className="py-20">
      <ServiceDetail 
        service={CloudSolutions} 
        onBack={() => window.history.back()}
        serviceType="tech"
      />
    </div>
  );
}