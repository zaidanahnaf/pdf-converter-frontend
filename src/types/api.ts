// Base success response
interface BaseSuccessResponse {
  success: true;
  downloadUrl: string;
  filename: string;
}

// PDF Info
export interface PdfInfo {
  page_count: number;
  title: string | null;
  author: string | null;
  subject: string | null;
}

export interface PdfInfoResponse {
  success: true;
  info: PdfInfo;
}

// PDF to Image (PNG/JPG/Images)
export interface PdfToImageResponse extends BaseSuccessResponse {
  page?: number;
  pageRange?: string;
  pageCount: number;
  quality?: number;
  isZip?: boolean;
}

// Merge PDFs
export type MergePdfsResponse = BaseSuccessResponse;

// Split PDF
export interface SplitPdfResponse extends BaseSuccessResponse {
  fileCount: number;
  isZip?: boolean;
}

// Rotate PDF
export interface RotatePdfResponse extends BaseSuccessResponse {
  rotations: Record<string, number>;
}

// Extract Text
export interface ExtractTextResponse extends BaseSuccessResponse {
  text_preview: Record<string, string>;
  total_pages: number;
}

// Extract Images
export interface ExtractImagesResponse extends BaseSuccessResponse {
  imageCount: number;
  isZip?: boolean;
  message?: string; // For "No images found" case
}

// Watermark PDF
export interface WatermarkPdfResponse extends BaseSuccessResponse {
  watermark: {
    text: string;
    position: string;
    opacity: number;
  };
}

// Compress PDF
export interface CompressPdfResponse extends BaseSuccessResponse {
  compression: {
    level: string;
    original_size: number;
    compressed_size: number;
    size_reduction: string;
  };
}

// 🤖 OCR & Text Recognition

// 14. Extract Text from Image (OCR)
export interface OcrFromImageResponse extends BaseSuccessResponse {
  text_preview: string;
  word_count: number;
  engine: string;
  language: string;
}

// Generic API Error
export interface ApiError {
  error: string;
}

// 15. Convert Scanned PDF to Searchable PDF
export interface PdfToSearchableResponse extends BaseSuccessResponse {
  total_pages: number;
  language: string;
  searchable: true;
  ocr_summary: {
    pages_processed: number;
    avg_word_count: number;
  };
}

// 16. Extract Tables from Image
interface ExtractTablesSuccessFound extends BaseSuccessResponse {
  table_count: number; // akan > 0
  rows: number;
  columns: number;
  format: 'json' | 'csv' | 'excel';
}

interface ExtractTablesSuccessNotFound {
  success: true;
  message: string;
  table_count: 0;
}

export type ExtractTablesResponse = ExtractTablesSuccessFound | ExtractTablesSuccessNotFound;

// 18. Batch OCR Processing
export interface BatchOcrResponse extends BaseSuccessResponse {
  total_images: number;
  successful: number;
  failed: number;
  engine: string;
  language: string;
}

// Union type for all possible API responses
export type ApiResponse =
  | PdfInfoResponse
  | PdfToImageResponse
  | MergePdfsResponse
  | SplitPdfResponse
  | RotatePdfResponse
  | ExtractTextResponse
  | ExtractImagesResponse
  | WatermarkPdfResponse
  | CompressPdfResponse
  | OcrFromImageResponse
  | PdfToSearchableResponse
  | ExtractTablesResponse
  | BatchOcrResponse
  | ApiError;