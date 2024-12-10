import React from 'react';
import { PayPalButton } from './payement-btn';
import { PricingFeature } from '@/src/types/payement';

interface PricingCardProps {
  features: PricingFeature[];
  price: string;
  period: string;
}

export const PricingCard: React.FC<PricingCardProps> = ({ features, price, period }) => {
  return (
    <div className="w-full max-w-md border mx-auto rounded-xl shadow-lg overflow-hidden">
      <div className="px-6 py-8">
        <div className="text-center mb-8">
          <span className="text-5xl font-bold">{price}</span>
          <span className="text-gray-600 ml-2">{period}</span>
        </div>
        
        <ul className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center space-x-3">
              <span className="text-xl">{feature.icon}</span>
              <span className="text-muted-foreground">{feature.text}</span>
            </li>
          ))}
        </ul>

        <PayPalButton />
        
        <p className="text-center text-sm text-gray-600 mt-4">
          Satisfait ou remboursé sous 7 jours, sans poser de questions.
        </p>
      </div>
    </div>
  );
};