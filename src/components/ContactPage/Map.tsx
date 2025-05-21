'use client';

import { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';

export default function ContactMap() {
  const [mapLoaded, setMapLoaded] = useState(false);
  
  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-[var(--card-bg)] border border-[var(--secondary)] rounded-xl p-6 md:p-8 h-full flex flex-col">
      <h2 className="text-2xl md:text-3xl font-bold mb-2">Find Us</h2>
      <p className="text-[var(--foreground)] opacity-70 mb-6">
        Visit our office or send mail to this address
      </p>
      
      <div className="relative flex-grow rounded-lg overflow-hidden">
        {/* Map placeholder with gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br from-[#17b6b2]/10 to-[#17b6b2]/5 ${
          mapLoaded ? 'opacity-0' : 'opacity-100'
        } transition-opacity duration-300`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
          </div>
        </div>
        
        {/* Updated map iframe with your new embed link */}
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.267333734396!2d73.0458115!3d33.5983675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df95237c77a5a1%3A0x3f4c08bddd97bf2b!2sEurosHub!5e0!3m2!1sen!2s!4v1747779399881!5m2!1sen!2s" 
          width="100%" 
          height="100%" 
          style={{ border: 0, minHeight: '400px' }} 
          allowFullScreen={true} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className={`${mapLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          onLoad={() => setMapLoaded(true)}
        ></iframe>
        
        {/* Custom Map Pin */}
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
          mapLoaded ? 'scale-100' : 'scale-0'
        } transition-transform duration-500 delay-300 z-10`}>
          <div className="relative">
            
          </div>
        </div>
      </div>
      
      <div className="mt-6 border-t border-[var(--secondary)] pt-6">
        <h3 className="font-semibold mb-2">Address</h3> 
        <address className="not-italic text-[var(--foreground)] opacity-80">
          Office 509, 5th Floor, Kohistan Tower, Saddar, <br />Rawalpindi, 46000
        </address>
      </div>
    </div>
  );
}