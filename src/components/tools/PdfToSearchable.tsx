'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '../ui/card';
import { ApiResponse, PdfToSearchableResponse } from '@/types/api';
import { convertPdfToSearchable } from '@/lib/api';
import Spinner from '../shared/Spinner';
import ResultCard from '../shared/ResultCard';
import { Search } from 'lucide-react'; // <-- IMPORT IKON

const PdfToSearchable = () => {
  const [file, setFile] = useState<File | null>(null);
  const [language, setLanguage] = useState('eng');
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
    const apiResponse = await convertPdfToSearchable(file, { language });
    setResult(apiResponse);
    setIsLoading(false);
  };

  const isSuccess = (res: ApiResponse | null): res is PdfToSearchableResponse => {
    return res !== null && 'success' in res && 'searchable' in res;
  }

  return (
    // Tambahkan kelas `relative` untuk state loading nanti
    <Card className="relative">
      <CardHeader>
        {/* STRUKTUR HEADER BARU YANG KONSISTEN */}
        <div className="flex items-center gap-3">
            <div className="bg-sky-600/20 p-2 rounded-lg">
              <Search className="h-6 w-6 text-sky-400" />
            </div>
            <CardTitle>Make Scanned PDF Searchable</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="file-searchable" className="block text-sm font-medium text-gray-300 mb-1">
              Scanned PDF File
            </label>
            <input
              id="file-searchable"
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-700 file:text-gray-200 hover:file:bg-gray-600"
              required
            />
          </div>

          <div>
            <label htmlFor="lang-searchable" className="block text-sm font-medium text-gray-300 mb-1">
              Document Language
            </label>
            <input
              id="lang-searchable"
              type="text"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              placeholder="Default: eng"
              className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !file}
            className="w-full flex justify-center items-center bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-lg disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? <Spinner /> : 'Make Searchable'}
          </button>
        </form>

        {isSuccess(result) ? (
          <div className="mt-6 bg-gray-800 border-gray-700 rounded-lg p-4 space-y-3">
            <p className="text-lg font-semibold text-green-400">Success!</p>
            <p className="text-gray-300">
              Your PDF is now fully searchable. <span className="font-bold text-white">{result.ocr_summary.pages_processed}</span> pages were processed.
            </p>
            <a
              href={result.downloadUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Download Searchable PDF
            </a>
          </div>
        ) : (
          result && <ResultCard result={result} />
        )}
      </CardContent>
    </Card>
  );
};

export default PdfToSearchable;