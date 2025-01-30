'use client';

import { usePdfViewerContext } from '@/context/pdfViewerContext';

const HighlightedTexts = () => {
  const { highlightedTexts } = usePdfViewerContext();

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Highlighted Texts:</h3>
      <ul className="list-disc pl-6">
        {highlightedTexts.map((text, index) => (
          <li key={index} className="text-gray-800">{text}</li>
        ))}
      </ul>
    </div>
  );
};

export default HighlightedTexts;
