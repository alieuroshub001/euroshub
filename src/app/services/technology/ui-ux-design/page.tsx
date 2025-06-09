// app/services/technology/ui-ux-design/page.tsx
import UIUXDesign from '../../../../components/ServicePage/technology/UIUXDesign';
import ServiceDetail from '../../../../components/ServicePage/ServiceDetail';

export default function UIUXDesignPage() {
  return (
    <div className="py-20">
      <ServiceDetail 
        service={UIUXDesign} 
        onBack={() => window.history.back()}
        serviceType="tech"
      />
    </div>
  );
}