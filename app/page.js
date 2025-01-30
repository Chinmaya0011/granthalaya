import React from 'react';
import PdfViewer from '@/components/PdfViewer';

const Page = () => {
  const pdfUrl = "/dummy.pdf";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-10">
      <div className="text-4xl font-semibold text-gray-800 mb-6">PDF Highlighter</div>
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <PdfViewer pdfUrl={pdfUrl} />
      </div>
    </div>
  );
};

export default Page;
