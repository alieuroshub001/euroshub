// app/services/business/database-management/page.tsx
import DatabaseManagement from '../../../../components/ServicePage/business/DatabaseManagement';
import ServiceDetail from '../../../../components/ServicePage/ServiceDetail';

export default function DatabaseManagementPage() {
  return (
    <div className="py-20">
      <ServiceDetail 
        service={DatabaseManagement} 
        onBack={() => window.history.back()}
        serviceType="business"
      />
    </div>
  );
}