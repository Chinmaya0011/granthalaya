'use client';

import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { useState } from 'react';
import { pdfjs } from 'react-pdf';

const PdfViewer = ({ pdfUrl }) => {
  const [highlightedText, setHighlightedText] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  const handleHighlight = () => {
    setHighlightedText((prev) => [...prev, selectedText]);
    setShowPopup(false); // Hide the popup after highlight
  };

  const handleTextSelection = (event) => {
    const selection = window.getSelection();
    if (selection.toString().length > 0) {
      const rect = selection.getRangeAt(0).getBoundingClientRect();
      setPopupPosition({ top: rect.top + window.scrollY, left: rect.left + window.scrollX });
      setSelectedText(selection.toString());
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  };

  return (
    <div style={{ height: '100vh' }}>
      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
        <Viewer
          fileUrl={pdfUrl}
          renderMode="canvas" // default mode to render
          onTextLayerRender={(e) => {
            const textLayer = e.target.querySelector('.react-pdf__Page__textContent');
            if (textLayer) {
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
            top: popupPosition.top + 10,
            left: popupPosition.left,
            padding: '5px 10px',
            backgroundColor: 'yellow',
            border: '1px solid black',
            cursor: 'pointer',
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
