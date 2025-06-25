import React from 'react';

export const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-6 ${className}`}>
    {children}
  </div>
);

export const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-4">
    <h3 className="text-xl font-semibold text-white">{children}</h3>
  </div>
);

export const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);