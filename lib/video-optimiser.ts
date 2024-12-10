/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

export const getOptimalBufferSize = () => {
  // Adjust buffer size based on network conditions
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    if (connection.effectiveType === '4g') {
      return 30; // 30 seconds buffer for fast connections
    } else if (connection.effectiveType === '3g') {
      return 15; // 15 seconds for medium connections
    }
  }
  return 20; // Default buffer size
};

export const calculateOptimalQuality = () => {
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    if (connection.effectiveType === '4g') {
      return 'high';
    } else if (connection.effectiveType === '3g') {
      return 'medium';
    }
  }
  return 'auto';
};