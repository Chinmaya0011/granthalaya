// HighlightedTexts.js
'use client';

import { usePdfViewerContext } from '@/context/pdfViewerContext';
import style from "../styles/pdfViewer.module.css";

const HighlightedTexts = () => {
  const { highlightedTexts } = usePdfViewerContext();

  return (
    <div className={style.highlightedTextsContainer}>
      <h3>Highlighted Texts:</h3>
      <ul>
        {highlightedTexts.map((text, index) => (
          <li key={index}>{text}</li>
        ))}
      </ul>
    </div>
  );
};

export default HighlightedTexts;
