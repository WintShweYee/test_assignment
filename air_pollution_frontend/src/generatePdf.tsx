import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ExportToPdf = async () => {
  const mapElement = document.getElementById('map');

  if (mapElement) {
    const canvas = await html2canvas(mapElement);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const aspectRatio = canvas.width / canvas.height;

    const imgWidth = pdfWidth;
    const imgHeight = imgWidth / aspectRatio;

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save('air-pollution-map.pdf');
  }
};

export default ExportToPdf;
