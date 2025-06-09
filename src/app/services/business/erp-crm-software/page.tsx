// app/services/business/erp-crm-software/page.tsx
import ERPCRMSoftware from '../../../../components/ServicePage/business/ERPCRMSoftware';
import ServiceDetail from '../../../../components/ServicePage/ServiceDetail';

export default function ERPCRMSoftwarePage() {
  return (
    <div className="py-20">
      <ServiceDetail 
        service={ERPCRMSoftware} 
        onBack={() => window.history.back()}
        serviceType="business"
      />
    </div>
  );
}