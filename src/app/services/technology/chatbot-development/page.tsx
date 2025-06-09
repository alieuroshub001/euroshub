// app/services/technology/chatbot-development/page.tsx
import ChatbotDevelopment from '../../../../components/ServicePage/technology/ChatbotDevelopment';
import ServiceDetail from '../../../../components/ServicePage/ServiceDetail';

export default function ChatbotDevelopmentPage() {
  return (
    <div className="py-20">
      <ServiceDetail 
        service={ChatbotDevelopment} 
        onBack={() => window.history.back()}
        serviceType="tech"
      />
    </div>
  );
}