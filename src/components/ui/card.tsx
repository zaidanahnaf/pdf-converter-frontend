import React from 'react';

// Menambahkan ...props untuk fleksibilitas
export const Card = ({ children, className, ...props }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-6 ${className}`} {...props}>
    {children}
  </div>
);

// Menambahkan ...props
export const CardHeader = ({ children, ...props }: { children: React.ReactNode }) => (
  <div className="mb-4" {...props}>
    {children}
  </div>
);

// Menambahkan ...props dan mengubah h3 menjadi div untuk fleksibilitas header
export const CardTitle = ({ children, ...props }: { children: React.ReactNode }) => (
    <h3 className="text-xl font-semibold text-white" {...props}>{children}</h3>
);


// Menambahkan ...props
export const CardContent = ({ children, ...props }: { children: React.ReactNode }) => (
  <div {...props}>{children}</div>
);