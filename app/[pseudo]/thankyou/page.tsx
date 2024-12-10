/* eslint-disable react/no-unescaped-entities */
import { HeaderPayement } from '@/components/payement/header';
import Image from 'next/image';
import React from 'react';

 const ThankYouPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <HeaderPayement
        title="Merci pour votre achat ! 🎉"
        subtitle="Votre abonnement IPTV est activé avec succès."
      />
      
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <Image width={1000} height={1000} 
            src="/12mois.png"
            alt="Success"
            className="rounded-lg shadow-md mx-auto mb-6 max-w-md w-full object-cover"
          />
        </div>

        <div className="space-y-6 text-center">
          <p className="text-lg text-gray-700">
            Vous recevrez vos codes et instructions dans quelques minutes par email ou WhatsApp.
          </p>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-blue-800">
              En cas de problème ou de question, contactez-nous via WhatsApp ou par email : 
              <a href="mailto:support@iptvservice.com" className="font-semibold hover:underline">
                support@iptvservice.com
              </a>
            </p>
          </div>

          <p className="text-green-600 font-semibold">
            Rappelez-vous, satisfait ou remboursé sous 7 jours !
          </p>

          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Voir les instructions d'installation
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;