'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../ui/card';
import { convertPdfToPng } from '@/lib/api';
import { ApiResponse } from '@/types/api';
import Spinner from '../shared/Spinner';
import ResultCard from '../shared/ResultCard';

const PdfToPng = () => {
  const [file, setFile] = useState<File | null>(null);
  const [page, setPage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ApiResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a PDF file.');
      return;
    }

    setIsLoading(true);
    setResult(null);
    const apiResponse = await convertPdfToPng(file, page);
    setResult(apiResponse);
    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader>PDF to PNG Converter</CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="file-png" className="block text-sm font-medium text-gray-300 mb-1">
              PDF File
            </label>
            <input
              id="file-png"
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-700 file:text-gray-200 hover:file:bg-gray-600"
              required
            />
          </div>
          <div>
            <label htmlFor="page-png" className="block text-sm font-medium text-gray-300 mb-1">
              Page or Range (e.g., 2 or 2-5)
            </label>
            <input
              id="page-png"
              type="text"
              value={page}
              onChange={(e) => setPage(e.target.value)}
              placeholder="Default: 1"
              className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !file}
            className="w-full flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? <Spinner /> : 'Convert to PNG'}
          </button>
        </form>
        {result && <ResultCard result={result} />}
      </CardContent>
    </Card>
  );
};

export default PdfToPng;