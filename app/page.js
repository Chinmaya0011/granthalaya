"use client"; // Ensure it's a client component if needed

import PdfViewer from "../components/PdfViewer";

const Page = () => {
  return (
    <div>
      <h2>PDF Viewer</h2>
      {/* Correct file URL */}
      <PdfViewer fileUrl="/dummy.pdf" />
    </div>
  );
};

export default Page;
