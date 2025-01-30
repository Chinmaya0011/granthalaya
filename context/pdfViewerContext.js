"use client";
import { createContext, useState, useContext, useEffect } from 'react';

const PdfViewerContext = createContext();

export const PdfViewerProvider = ({ children }) => {
  const [selectedText, setSelectedText] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [highlightedTexts, setHighlightedTexts] = useState([]);

  const highlightPluginInstance = {
    onHighlight: (highlightedText) => {
      if (highlightedText && highlightedText.trim() !== '') {
        setSelectedText(highlightedText);
        setIsPopupVisible(true);
      }
    },
  };

  const handleSaveHighlight = () => {
    if (selectedText) {
      setHighlightedTexts((prevHighlights) => [...prevHighlights, selectedText]);
      setIsPopupVisible(false);
      setSelectedText('');
    }
  };

  const handleMouseUp = (event) => {
    const selection = window.getSelection();
    if (selection && !selection.isCollapsed) {
      const { clientX, clientY } = event;
      setPopupPosition({
        top: clientY - 40,
        left: clientX - 50,
      });
      setSelectedText(selection.toString());
      setIsPopupVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <PdfViewerContext.Provider
      value={{
        selectedText,
        setSelectedText,
        isPopupVisible,
        setIsPopupVisible, // ✅ Added this function so Popup.js can close the popup
        popupPosition,
        setPopupPosition,
        highlightedTexts,
        setHighlightedTexts,
        highlightPluginInstance,
        handleSaveHighlight,
      }}
    >
      {children}
    </PdfViewerContext.Provider>
  );
};

export const usePdfViewerContext = () => useContext(PdfViewerContext);
