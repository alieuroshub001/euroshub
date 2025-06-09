// app/services/business/project-management/page.tsx
import ProjectManagement from '../../../../components/ServicePage/business/ProjectManagement';
import ServiceDetail from '../../../../components/ServicePage/ServiceDetail';

export default function ProjectManagementPage() {
  return (
    <div className="py-20">
      <ServiceDetail 
        service={ProjectManagement} 
        onBack={() => window.history.back()}
        serviceType="business"
      />
    </div>
  );
}