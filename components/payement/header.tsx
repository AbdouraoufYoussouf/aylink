import React from 'react';

interface HeaderProps {
  title: string;
  subtitle: string;
}

export const HeaderPayement: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {title}
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        {subtitle}
      </p>
    </div>
  );
};