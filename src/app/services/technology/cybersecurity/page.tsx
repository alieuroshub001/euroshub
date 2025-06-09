// app/services/technology/cybersecurity/page.tsx
import Cybersecurity from '../../../../components/ServicePage/technology/CyberSecurity';
import ServiceDetail from '../../../../components/ServicePage/ServiceDetail';

export default function CybersecurityPage() {
  return (
    <div className="py-20">
      <ServiceDetail 
        service={Cybersecurity} 
        onBack={() => window.history.back()}
        serviceType="tech"
      />
    </div>
  );
}