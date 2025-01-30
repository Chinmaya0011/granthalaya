import React from 'react'
import PdfViewer from '@/components/PDFViewer'
const page = () => {
  const pdfUrl="/dummy.pdf";

  return (
    <>
      <div>page</div>
      <PdfViewer pdfUrl={pdfUrl}/>
    </>
  )
}

export default page