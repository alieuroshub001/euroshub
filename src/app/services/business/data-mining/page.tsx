// app/services/business/data-mining/page.tsx
import DataMining from '../../../../components/ServicePage/business/DataMining';
import ServiceDetail from '../../../../components/ServicePage/ServiceDetail';

export default function DataMiningPage() {
  return (
    <div className="py-20">
      <ServiceDetail 
        service={DataMining} 
        onBack={() => window.history.back()}
        serviceType="business"
      />
    </div>
  );
}