// Popup.js
'use client';

import { usePdfViewerContext } from '@/context/pdfViewerContext';
import style from "../styles/pdfViewer.module.css";

const Popup = ({ position }) => {
  const { handleSaveHighlight } = usePdfViewerContext();

  return (
    <div
      className={style.popup}
      style={{
        top: position.top, // Move the popup 10px above the selected area
        left: position.left,
      }}
    >
      <button
        onClick={handleSaveHighlight}
        className={style.saveButton}
      >
        Save Highlight
      </button>
    </div>
  );
};

export default Popup;
