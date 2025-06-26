'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../ui/card';
import { ApiResponse, ExtractTablesResponse } from '@/types/api';
import { extractTablesFromImage } from '@/lib/api';
import Spinner from '../shared/Spinner';
import ResultCard from '../shared/ResultCard';

const ExtractTables = () => {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState<'json' | 'csv' | 'excel'>('json');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ApiResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      alert('Please select an image file.');
      return;
    }
    setIsLoading(true);
    setResult(null);
    const apiResponse = await extractTablesFromImage(file, { format });
    setResult(apiResponse);
    setIsLoading(false);
  };

  // Type guard untuk memeriksa apakah response adalah hasil sukses
  const isExtractTablesSuccess = (res: ApiResponse | null): res is ExtractTablesResponse => {
    return res !== null && 'success' in res && 'table_count' in res;
  }

  return (
    <Card>
      <CardHeader>Extract Tables from Image</CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="file-table" className="block text-sm font-medium text-gray-300 mb-1">
              Image File (Invoice, Receipt, etc.)
            </label>
            <input
              id="file-table"
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-700 file:text-gray-200 hover:file:bg-gray-600"
              required
            />
          </div>

          <div>
            <label htmlFor="format-table" className="block text-sm font-medium text-gray-300 mb-1">
              Output Format
            </label>
            <select
              id="format-table"
              value={format}
              onChange={(e) => setFormat(e.target.value as 'json' | 'csv' | 'excel')}
              className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="json">JSON</option>
              <option value="csv">CSV</option>
              <option value="excel">Excel (.xlsx)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading || !file}
            className="w-full flex justify-center items-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? <Spinner /> : 'Extract Tables'}
          </button>
        </form>

        {/* Tampilan Hasil Kustom untuk Ekstraksi Tabel */}
        {isExtractTablesSuccess(result) ? (
          <div className="mt-6 bg-gray-800 border-gray-700 rounded-lg p-4 space-y-3">
            {result.table_count > 0 && 'downloadUrl' in result ? (
              // Kasus: Tabel ditemukan
              <>
                <p className="text-lg font-semibold text-green-400">Success!</p>
                <p className="text-gray-300">
                  Successfully found <span className="font-bold text-white">{result.table_count}</span> table(s) 
                  with a total of <span className="font-bold text-white">{result.rows}</span> rows and <span className="font-bold text-white">{result.columns}</span> columns.
                </p>
                <a
                  href={result.downloadUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors"
                >
                  Download File ({result.filename})
                </a>
              </>
            ) : (
              // Kasus: Tidak ada tabel ditemukan
              <div className="text-center">
                 <p className="text-lg font-semibold text-yellow-400">Process Complete</p>
                 <p className="text-gray-300">No tables were detected in the provided image.</p>
              </div>
            )}
          </div>
        ) : (
          result && <ResultCard result={result} /> // Fallback untuk menampilkan pesan error
        )}
      </CardContent>
    </Card>
  );
};

export default ExtractTables;