'use client';

import { useEffect, useRef } from 'react';
import { usePdfViewerContext } from '@/context/pdfViewerContext';
import style from "../styles/pdfViewer.module.css";

const Popup = ({ position }) => {
  const { handleSaveHighlight, setIsPopupVisible } = usePdfViewerContext();
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsPopupVisible(false); // Close popup when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsPopupVisible]);

  return (
    <div
      ref={popupRef}
      className={style.popup}
      style={{
        top: position.top,
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
