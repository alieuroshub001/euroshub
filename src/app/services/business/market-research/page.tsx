// app/services/business/market-research/page.tsx
import MarketResearch from '../../../../components/ServicePage/business/MarketResearch';
import ServiceDetail from '../../../../components/ServicePage/ServiceDetail';

export default function MarketResearchPage() {
  return (
    <div className="py-20">
      <ServiceDetail 
        service={MarketResearch} 
        onBack={() => window.history.back()}
        serviceType="business"
      />
    </div>
  );
}