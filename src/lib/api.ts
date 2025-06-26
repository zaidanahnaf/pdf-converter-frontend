import { ApiError, ApiResponse } from '@/types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Helper untuk menangani response
async function handleResponse<T>(response: Response): Promise<T | ApiError> {
  const data = await response.json();
  if (!response.ok) {
    return data as ApiError;
  }
  return data as T;
}

// 1. Get PDF Info
export const getPdfInfo = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/convert/pdf-info`, {
    method: 'POST',
    body: formData,
  });
  return handleResponse<ApiResponse>(response);
};

// 3. Convert PDF to PNG
export const convertPdfToPng = async (file: File, page?: string) => {
  const formData = new FormData();
  formData.append('file', file);
  if (page) formData.append('page', page);

  const response = await fetch(`${API_BASE_URL}/convert/pdf-to-png`, {
    method: 'POST',
    body: formData,
  });
  return handleResponse<ApiResponse>(response);
};

// 6. Merge PDFs
export const mergePdfs = async (files: File[]) => {
  const formData = new FormData();
  files.forEach(file => {
    formData.append('files', file);
  });

  const response = await fetch(`${API_BASE_URL}/merge/pdf`, {
    method: 'POST',
    body: formData,
  });
  return handleResponse<ApiResponse>(response);
};

// 14. Extract Text from Image (OCR)
export const extractTextFromImage = async (
  file: File,
  options?: {
    engine?: string;
    language?: string;
    preprocess?: string; // API mengharapkan string 'true' atau 'false'
  }
) => {
  const formData = new FormData();
  formData.append('file', file);

  // Hanya tambahkan parameter jika nilainya ada/valid
  if (options?.engine) {
    formData.append('engine', options.engine);
  }
  if (options?.language) {
    formData.append('language', options.language);
  }
  if (options?.preprocess) {
    formData.append('preprocess', options.preprocess);
  }

  const response = await fetch(`${API_BASE_URL}/ocr/extract-text`, {
    method: 'POST',
    body: formData,
  });
  return handleResponse<ApiResponse>(response);
};

// 15. Convert Scanned PDF to Searchable PDF
export const convertPdfToSearchable = async (
  file: File,
  options?: {
    language?: string;
  }
) => {
  const formData = new FormData();
  formData.append('file', file);

  if (options?.language) {
    formData.append('language', options.language);
  }

  const response = await fetch(`${API_BASE_URL}/ocr/pdf-to-searchable`, {
    method: 'POST',
    body: formData,
  });
  return handleResponse<ApiResponse>(response);
};

// 16. Extract Tables from Image
export const extractTablesFromImage = async (
  file: File,
  options?: {
    format?: 'json' | 'csv' | 'excel';
  }
) => {
  const formData = new FormData();
  formData.append('file', file);

  if (options?.format) {
    formData.append('format', options.format);
  }

  const response = await fetch(`${API_BASE_URL}/ocr/extract-tables`, {
    method: 'POST',
    body: formData,
  });
  return handleResponse<ApiResponse>(response);
};

// Tambahkan fungsi lain di sini mengikuti pola yang sama
// Contoh: convertPdfToJpg, splitPdf, rotatePdf, dll.