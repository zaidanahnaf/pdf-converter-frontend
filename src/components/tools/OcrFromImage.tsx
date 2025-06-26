'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../ui/card';
import { ApiResponse, OcrFromImageResponse } from '@/types/api';
import { extractTextFromImage } from '@/lib/api';
import Spinner from '../shared/Spinner';
import ResultCard from '../shared/ResultCard';

const OcrFromImage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [engine, setEngine] = useState('tesseract');
  const [language, setLanguage] = useState('eng');
  const [preprocess, setPreprocess] = useState(true);

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

    const apiResponse = await extractTextFromImage(file, {
      engine,
      language,
      preprocess: String(preprocess), // Ubah boolean ke string 'true'/'false'
    });

    setResult(apiResponse);
    setIsLoading(false);
  };

  const isOcrSuccess = (res: ApiResponse | null): res is OcrFromImageResponse => {
    return res !== null && 'success' in res && 'text_preview' in res;
  }

  return (
    <Card>
      <CardHeader>Extract Text from Image (OCR)</CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="file-ocr" className="block text-sm font-medium text-gray-300 mb-1">
              Image File (PNG, JPG, TIFF)
            </label>
            <input
              id="file-ocr"
              type="file"
              accept="image/png, image/jpeg, image/tiff, image/bmp"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-700 file:text-gray-200 hover:file:bg-gray-600"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="engine-ocr" className="block text-sm font-medium text-gray-300 mb-1">
                OCR Engine
              </label>
              <select
                id="engine-ocr"
                value={engine}
                onChange={(e) => setEngine(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="tesseract">Tesseract</option>
                <option value="easyocr">EasyOCR</option>
              </select>
            </div>
            <div>
              <label htmlFor="lang-ocr" className="block text-sm font-medium text-gray-300 mb-1">
                Language Code
              </label>
              <input
                id="lang-ocr"
                type="text"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                placeholder="e.g., eng, ind, jpn"
                className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="preprocess-ocr"
              type="checkbox"
              checked={preprocess}
              onChange={(e) => setPreprocess(e.target.checked)}
              className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-600"
            />
            <label htmlFor="preprocess-ocr" className="ml-2 block text-sm text-gray-300">
              Enable Image Preprocessing
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading || !file}
            className="w-full flex justify-center items-center bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? <Spinner /> : 'Extract Text'}
          </button>
        </form>
        
        {/* Tampilan Hasil Kustom untuk OCR */}
        {isOcrSuccess(result) ? (
          <div className="mt-6 bg-gray-800 border border-gray-700 rounded-lg p-4 space-y-3">
            <p className="text-lg font-semibold text-green-400">OCR Success!</p>
            <div>
              <p className="text-sm font-medium text-gray-400">Text Preview:</p>
              <blockquote className="border-l-4 border-gray-600 pl-4 py-2 my-2 bg-gray-900/50 text-gray-300 italic">
                {result.text_preview}
              </blockquote>
            </div>
            <div className="text-sm text-gray-400 grid grid-cols-2 gap-x-4 gap-y-1">
              <span>Word Count: <span className="font-medium text-white">{result.word_count}</span></span>
              <span>Engine: <span className="font-medium text-white">{result.engine}</span></span>
              <span>Language: <span className="font-medium text-white">{result.language}</span></span>
            </div>
            <a
              href={result.downloadUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Download Full Result (.json)
            </a>
          </div>
        ) : (
          result && <ResultCard result={result} /> // Fallback ke ResultCard standar jika error
        )}
      </CardContent>
    </Card>
  );
};

export default OcrFromImage;