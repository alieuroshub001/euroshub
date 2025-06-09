// app/services/technology/ai-solutions/page.tsx
import AISolutions from '../../../../components/ServicePage/technology/AISolutions';
import ServiceDetail from '../../../../components/ServicePage/ServiceDetail';

export default function AISolutionsPage() {
  return (
    <div className="py-20">
      <ServiceDetail 
        service={AISolutions} 
        onBack={() => window.history.back()}
        serviceType="tech"
      />
    </div>
  );
}