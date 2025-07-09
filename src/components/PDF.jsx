// File: GenerateInvoicePDF.jsx
import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const GenerateInvoicePDF = ({ from, to, products, type }) => {
  const handleDownload = () => {
    const doc = new jsPDF();

    // Title Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('VISHVAM CRACKERS', 105, 15, { align: 'center' });

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Dealer Of Fireworks & Fancy Crackers', 105, 21, { align: 'center' });
    doc.text('2/582-A, Ningampuram Village, SIVAKASI - 626189', 105, 26, { align: 'center' });
    doc.text('GSTIN: 33AAMFV7889A1ZR', 105, 31, { align: 'center' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('BILL OF SUPPLY', 105, 40, { align: 'center' });
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('(Composition in GST under Sec.10)', 105, 45, { align: 'center' });
    doc.setFont('helvetica', 'italic');
    doc.text(type === 'duplicate' ? 'Duplicate for Transporter' : 'Original Copy', 170, 45);

    // Border box (optional)
    doc.setDrawColor(0);
    doc.rect(10, 10, 190, 270);

    // Invoice Metadata
    doc.setFontSize(10);
    doc.text(`To: ${to}`, 15, 55);
    doc.text(`Invoice No: VCD/${Math.floor(100 + Math.random() * 900)}`, 140, 55);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 140, 60);
    doc.text(`From: ${from}`, 15, 60);
    doc.text(`HSN Code: 3604`, 140, 65);

    // Table
    const tableData = products.map((p, index) => [
      index + 1,
      p.name,
      p.quantity,
      p.rate,
      (parseFloat(p.quantity || 0) * parseFloat(p.rate || 0)).toFixed(2)
    ]);

    autoTable(doc, {
      startY: 75,
      head: [['S.No', 'Product Particulars', 'Quantity', 'Rate', 'Amount']],
      body: tableData,
      styles: { fontSize: 10 },
      theme: 'grid',
      headStyles: { fillColor: [200, 200, 200] },
    });

    // Total Section
    const finalY = doc.lastAutoTable.finalY + 10;
    const total = tableData.reduce((sum, row) => sum + parseFloat(row[4]), 0);
    const discount = total * 0.22;
    const net = total - discount;

    doc.setFont('helvetica', 'normal');
    doc.text(`Goods Value: ₹${total.toFixed(2)}`, 140, finalY);
    doc.text(`Discount: ₹${discount.toFixed(2)}`, 140, finalY + 5);
    doc.setFont('helvetica', 'bold');
    doc.text(`NET AMOUNT: ₹${net.toFixed(2)}`, 140, finalY + 12);

    // Amount in words
    doc.setFont('helvetica', 'normal');
    doc.text(`Rs. ${convertToWords(net)} Only`, 15, finalY + 20);

    // Footer
    doc.text('Prepared by', 15, finalY + 30);
    doc.text('Checked by', 80, finalY + 30);
    doc.text('For VISHVAM CRACKERS', 140, finalY + 30);
    doc.text('Authorised Signatory', 150, finalY + 35);

    // Save file
    doc.save(`Cracker_Invoice_${type}.pdf`);
  };

  // Utility: Convert number to words (basic)
  const convertToWords = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    })
      .format(amount)
      .replace('₹', '')
      .replace('INR', '')
      .trim();
  };

  return (
    <button className={`download ${type}`} onClick={handleDownload}>
      {type === 'original' ? 'Download Original' : 'Download Duplicate'}
    </button>
  );
};

export default GenerateInvoicePDF;