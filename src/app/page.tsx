// src/app/page.tsx

import ExtractTables from '@/components/tools/ExtractTables';
import PdfToSearchable from '@/components/tools/PdfToSearchable';
import BatchProcessing from '@/components/tools/BatchProcessing';
// Kita juga import komponen lama untuk mengisi grid
import OcrFromImage from '@/components/tools/OcrFromImage';
import PdfToPng from '@/components/tools/PdfToPng';

export default function Home() {
  return (
    // Menggunakan padding yang lebih lega untuk 'ruang napas'
    <main className="container mx-auto px-4 py-12 md:py-16">
      
      {/* 1. HERO SECTION */}
      {/* Bagian ini berfungsi sebagai "panggung utama" untuk menyambut pengguna */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Ubah Dokumen Berantakan Jadi Data Rapi Seketika.
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
          Stop ketik ulang invoice, struk, dan dokumen hasil scan. Biarkan AI kami yang bekerja untuk Anda.
        </p>
      </section>

      {/* 2. FEATURED TOOLS SECTION */}
      {/* Bagian ini menata semua kartu fitur ke dalam grid yang rapi */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Alat Unggulan Kami</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* 3. KARTU UNGGULAN DENGAN DIFERENSIASI */}
          {/* Pembungkus div ini memberikan border dan shadow ungu khusus */}
          <div className="border border-purple-500 rounded-xl shadow-lg shadow-purple-500/10">
            <ExtractTables />
          </div>
          
          {/* Kartu-kartu lainnya ditampilkan secara normal */}
          <PdfToSearchable />
          <BatchProcessing />
          
          {/* Anda bisa tambahkan lagi fitur lain yang sudah dibuat di sini */}
          {/* <OcrFromImage /> */}
          {/* <PdfToPng /> */}

        </div>
      </section>
    </main>
  );
}