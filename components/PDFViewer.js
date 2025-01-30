'use client';

import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { useState } from 'react';

const PdfViewer = ({ pdfUrl }) => {
  const [highlightedText, setHighlightedText] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  // Function to highlight selected text
  const handleHighlight = () => {
    setHighlightedText((prev) => [...prev, selectedText]);
    setShowPopup(false); // Hide popup after highlighting
  };

  // Handle text selection
  const handleTextSelection = () => {
    const selection = window.getSelection();
    const selected = selection.toString();
    if (selected.length > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setPopupPosition({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
      });
      setSelectedText(selected);
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  };

  return (
    <div style={{ height: '100vh', position: 'relative' }}>
      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
        <Viewer
          fileUrl={pdfUrl}
          renderMode="canvas" // default mode to render
          onTextLayerRender={(e) => {
            const textLayer = e.target.querySelector('.react-pdf__Page__textContent');
            if (textLayer) {
              // Add mouseup event listener for text selection
              textLayer.addEventListener('mouseup', handleTextSelection);
            }
          }}
        />
      </Worker>

      {/* Popup Button */}
      {showPopup && (
        <button
          onClick={handleHighlight}
          style={{
            position: 'absolute',
            top: popupPosition.top + 10, // Offset to avoid overlap
            left: popupPosition.left,
            padding: '5px 10px',
            backgroundColor: 'yellow',
            border: '1px solid black',
            cursor: 'pointer',
            zIndex: 9999, // Ensure it's on top of PDF
          }}
        >
          Highlight
        </button>
      )}

      {/* List of highlighted texts */}
      <div>
        <h3>Highlighted Text</h3>
        <ul>
          {highlightedText.map((highlight, index) => (
            <li key={index}>{highlight}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PdfViewer;
