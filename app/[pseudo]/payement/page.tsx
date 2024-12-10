/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { HeaderPayement } from '@/components/payement/header';
import { PricingCard } from '@/components/payement/pricing-card';
import { features } from '@/src/constants/products/abonnement-data';
import Image from 'next/image';
import React from 'react';



export default function PaymentPage({ params }: { params: { pseudo: string } }) {
  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <HeaderPayement 
        title="Profitez de l'Abonnement IPTV Premium - 12 Mois en Illimité !"
        subtitle="Des séries, films, chaînes TV, et matchs en direct, disponibles sur tous vos appareils."
      />
      
      <div className="max-w-7xl grid lg:grid-cols-2  mx-auto">
        <div className="flex justify-center mb-12">
          <Image width={1000} height={100}
            src="/12mois.png"
            alt="Streaming devices"
            className="rounded-lg shadow-xl max-w-2xl w-full object-cover"
          />
        </div>

        <PricingCard 
          features={features}
          price="59 €"
          period="/ 12 mois"
        />

      </div>
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600">
            Cliquez sur le bouton ci-dessous pour accéder à votre abonnement IPTV premium dès aujourd'hui.
          </p>
        </div>
    </div>
  );
};