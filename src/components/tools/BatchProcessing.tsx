'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '../ui/card';
import { ApiResponse, BatchOcrResponse } from '@/types/api';
import { processBatchOcr } from '@/lib/api';
import Spinner from '../shared/Spinner';
import ResultCard from '../shared/ResultCard';
import { Files } from 'lucide-react'; // <-- IMPORT IKON

const BatchProcessing = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [engine, setEngine] = useState('tesseract');
  const [language, setLanguage] = useState('eng');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ApiResponse | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (indexToRemove: number) => {
    setFiles(files.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (files.length === 0) {
      alert('Please select at least one image file.');
      return;
    }
    setIsLoading(true);
    setResult(null);
    const apiResponse = await processBatchOcr(files, { engine, language });
    setResult(apiResponse);
    setIsLoading(false);
  };
  
  const isSuccess = (res: ApiResponse | null): res is BatchOcrResponse => {
    return res !== null && 'success' in res && 'total_images' in res;
  }

  return (
    <Card className="relative">
      <CardHeader>
        {/* STRUKTUR HEADER BARU YANG KONSISTEN */}
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600/20 p-2 rounded-lg">
            <Files className="h-6 w-6 text-indigo-400" />
          </div>
          <CardTitle>Batch Image OCR</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="file-batch" className="block w-full text-center py-4 px-6 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:bg-gray-800/50">
              <span className="text-gray-400">Drag & drop files or click to select</span>
              <input
                id="file-batch"
                type="file"
                accept="image/png, image/jpeg"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          {files.length > 0 && (
            <div className="space-y-2 max-h-48 overflow-y-auto p-2 border border-gray-700 rounded-md">
              <p className="font-semibold text-sm text-gray-300">{files.length} file(s) selected:</p>
              <ul className="space-y-1">
                {files.map((file, index) => (
                  <li key={index} className="flex justify-between items-center text-xs bg-gray-900/50 p-2 rounded">
                    <span className="text-gray-400 truncate pr-2">{file.name}</span>
                    <button type="button" onClick={() => removeFile(index)} className="text-red-500 hover:text-red-400 font-bold">&times;</button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* OPSI ENGINE DAN BAHASA YANG SUDAH DILENGKAPI & DISTYLING */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="engine-batch" className="block text-sm font-medium text-gray-300 mb-1">
                OCR Engine
              </label>
              <select
                id="engine-batch"
                value={engine}
                onChange={(e) => setEngine(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500"
              >
                <option value="tesseract">Tesseract</option>
                <option value="easyocr">EasyOCR</option>
              </select>
            </div>
            <div>
              <label htmlFor="lang-batch" className="block text-sm font-medium text-gray-300 mb-1">
                Language Code
              </label>
              <input
                id="lang-batch"
                type="text"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                placeholder="e.g., eng, ind"
                className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || files.length === 0}
            className="w-full flex justify-center items-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? <Spinner /> : `Process ${files.length} Images`}
          </button>
        </form>
        
        {isSuccess(result) ? (
          <div className="mt-6 bg-gray-800 border-gray-700 rounded-lg p-4 space-y-3">
             <p className="text-lg font-semibold text-green-400">Batch Process Complete!</p>
             <p className="text-gray-300">
                Processed <span className="font-bold text-white">{result.total_images}</span> images. 
                Successful: <span className="font-bold text-green-500">{result.successful}</span>, 
                Failed: <span className="font-bold text-red-500">{result.failed}</span>.
             </p>
             <a
              href={result.downloadUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Download Results Summary
            </a>
          </div>
        ) : (
          result && <ResultCard result={result} />
        )}
      </CardContent>
    </Card>
  );
};

export default BatchProcessing;
