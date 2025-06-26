import { ApiResponse, ApiError } from '@/types/api';
import React from 'react';
import { Card, CardContent } from '../ui/card';

interface ResultCardProps {
  result: ApiResponse | null;
}

const ResultCard = ({ result }: ResultCardProps) => {
  if (!result) return null;

  if ('error' in result) {
    return (
      <Card className="mt-6 bg-red-900/20 border-red-500">
        <CardContent>
          <p className="text-red-400 font-semibold">Error</p>
          <p className="text-red-300">{(result as ApiError).error}</p>
        </CardContent>
      </Card>
    );
  }

  const { downloadUrl, filename } = result as { downloadUrl?: string; filename?: string };

  return (
    <Card className="mt-6 bg-green-900/20 border-green-500">
      <CardContent>
        <p className="text-green-400 font-semibold">Success!</p>
        <p className="text-gray-300 break-all">File: {filename}</p>
        {downloadUrl && (
          <a
            href={downloadUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Download File
          </a>
        )}
      </CardContent>
    </Card>
  );
};

export default ResultCard;