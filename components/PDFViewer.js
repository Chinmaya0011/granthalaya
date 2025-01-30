// PdfViewer.js
'use client';

import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { usePdfViewerContext } from '@/context/pdfViewerContext';
import style from "../styles/pdfViewer.module.css";
import Popup from './Popup';
import HighlightedTexts from './HighlightedTexts';

const PdfViewer = ({ pdfUrl }) => {
  const {
    selectedText,
    isPopupVisible,
    popupPosition,
    highlightPluginInstance,
  } = usePdfViewerContext();

  return (
    <div className={style.pdfViewerContainer}>
      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
        <Viewer fileUrl={pdfUrl} plugins={[highlightPluginInstance]} />
      </Worker>

      {/* Display popup if there is selected text */}
      {isPopupVisible && selectedText && (
        <Popup position={popupPosition} />
      )}

      {/* Display the list of highlighted texts */}
      <HighlightedTexts />
    </div>
  );
};

export default PdfViewer;
