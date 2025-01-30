import React, { useState, useEffect, useCallback } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { selectionModePlugin } from "@react-pdf-viewer/selection-mode";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/selection-mode/lib/styles/index.css";
import "../styles/PdfViewer.css"; // Import the CSS file

const PdfViewer = ({ fileUrl }) => {
  const [selectedText, setSelectedText] = useState("");
  const selectionPluginInstance = selectionModePlugin();
  const { getSelectedText, onTextSelection } = selectionPluginInstance;

  // Function to update the selected text
  const handleTextSelection = useCallback(() => {
    const text = getSelectedText();
    console.log("Selected Text:", text); // Debugging
    if (text) {
      setSelectedText(text);
    } else {
      setSelectedText(""); // Clear selection if no text is selected
    }
  }, [getSelectedText]);

  useEffect(() => {
    onTextSelection(handleTextSelection);

    return () => {
      onTextSelection(null); // Cleanup listener
    };
  }, [onTextSelection, handleTextSelection]);

  const handleHighlight = () => {
    if (selectedText) {
      alert(`Highlighted text: ${selectedText}`);
      setSelectedText(""); // Clear selection after highlighting
    }
  };

  return (
    <div className="pdf-viewer-container">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <Viewer fileUrl={fileUrl} plugins={[selectionPluginInstance]} />
      </Worker>
      {selectedText && (
        <button className="highlight-button" onClick={handleHighlight}>
          Highlight
        </button>
      )}
    </div>
  );
};

export default PdfViewer;
