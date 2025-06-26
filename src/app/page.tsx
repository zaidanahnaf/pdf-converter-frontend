import ExtractTables from '@/components/tools/ExtractTables';
import PdfToSearchable from '@/components/tools/PdfToSearchable';
import PdfToPng from '@/components/tools/PdfToPng';
// import MergePdfs from '@/components/tools/MergePdfs'; // Uncomment jika sudah dibuat
import OcrFromImage from '@/components/tools/OcrFromImage';

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          The Ultimate PDF Toolkit
        </h2>
        <p className="mt-4 text-lg text-gray-400">
          All the tools you need to work with PDFs, right here in your browser.
        </p>
      </div>
      
      {/* Grid untuk semua tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ExtractTables />
        <PdfToSearchable />
        {/* Uncomment jika sudah dibuat */}
        {/* <MergePdfs /> */}
        <PdfToPng />
        {/* <MergePdfs /> */}
        <OcrFromImage />
        {/* Tambahkan komponen tool lainnya di sini */}
        
        {/* Placeholder untuk tool lain */}
        <div className="bg-gray-800 border border-dashed border-gray-700 rounded-lg p-6 flex items-center justify-center">
          <p className="text-gray-500">More tools coming soon...</p>
        </div>
        <div className="bg-gray-800 border border-dashed border-gray-700 rounded-lg p-6 flex items-center justify-center">
          <p className="text-gray-500">More tools coming soon...</p>
        </div>
      </div>
    </div>
  );
}