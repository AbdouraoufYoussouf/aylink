/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useEffect } from 'react';

declare global {
  interface Window {
    paypal: any;
  }
}


export const PayPalButton: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://www.paypal.com/sdk/js?client-id=BAA2fl25MpDwbNGbwm4af5z4CdOvUCq9u16kVqR3WMqRk-gWyjAfsgdL9SyD7I5CCL2oYPWGNxqly8ciG8&components=hosted-buttons&disable-funding=venmo&currency=EUR";
    script.async = true;
    
    // script.onload = () => {
    //   if (window.paypal) {
    //     window.paypal.HostedButtons({
    //       hostedButtonId: "U8UUDRWS3BNU2",
    //     }).render("#paypal-container-U8UUDRWS3BNU2");
    //   }
    // };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="paypal-container-U8UUDRWS3BNU2" className="w-full" />;
};