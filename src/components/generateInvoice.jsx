
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// const getInvoiceNumber = (type) => {
//   let lastInvoiceNumber = localStorage.getItem('lastInvoiceNumber');
//   lastInvoiceNumber = lastInvoiceNumber ? parseInt(lastInvoiceNumber) : 0;

//   if (type === 'original') {
//     lastInvoiceNumber += 1;
//     localStorage.setItem('lastInvoiceNumber', lastInvoiceNumber);
//   }

//   return lastInvoiceNumber;
// };

// const GenerateInvoicePDF = ({ to, products, type, toAddress }) => {
//   const doc = new jsPDF();

//   // Full page border
//   doc.rect(5, 5, 200, 287);

//   // Header
//   doc.setFontSize(16);
//   doc.setFont("helvetica", "bold");
//   doc.text("HARIHARAN TRADER", 75, 15);

//   doc.setFontSize(10);
//   doc.setFont("helvetica", "normal");
//   doc.text("No.3/1341/15, Sattur Road, Opp. Old PRC Bus Depot,", 62, 20);
//   doc.text("Near East Police Station, SIVAKASI – 626 189.", 65, 25);
//   doc.text("GST No:33AA1FH1506M12J", 83, 30);

//   doc.setFont("helvetica", "bold");
//   doc.text(`${type === "original" ? "Original" : "Duplicate"} for Transporter`, 150, 48);

//   doc.setFont("helvetica", "normal");
//   doc.text("BILL OF SUPPLY", 90, 43);
//   doc.text("(Composition in GST under Sec.10)", 75, 48);
//   doc.line(10, 50, 200, 50);

//   const date = new Date().toLocaleDateString();
//   const invoiceNumber = getInvoiceNumber(type);

//   // Box
//   const boxTopY = 55;
//   const boxHeight = 28;
//   doc.rect(14, boxTopY, 181, boxHeight);
//   const boxCenterX = 14 + 181 / 2;
//   doc.line(boxCenterX, boxTopY, boxCenterX, boxTopY + boxHeight);

//   // Left Side
// // "To:"
// doc.setFont("helvetica", "bold");
// doc.text("To:", 17, 60);   // Line 1 label
// doc.setFont("helvetica", "normal");
// // doc.text(to || "_____", 36, 60);  // Line 1 value
// const wrappedTo = doc.splitTextToSize(to || "_____", 60);

// // Print wrapped address starting at Y = 66
// doc.text(wrappedTo, 36, 60);

// // "Address:"
// doc.setFont("helvetica", "bold");
// doc.text("Address:", 17, 66);  // Line 2 label
// doc.setFont("helvetica", "normal");
// // doc.text(toAddress || "_____", 36, 66);  // Line 2 value
// // Automatically wrap the address to max 80mm width
// const wrappedAddress = doc.splitTextToSize(toAddress || "_____", 60);

// // Print wrapped address starting at Y = 66
// doc.text(wrappedAddress, 36, 66);


//   // Right Side
//   doc.setFont("helvetica", "bold");
//   doc.text("Invoice No:", boxCenterX + 5, 60);
//   doc.setFont("helvetica", "normal");
//   doc.text(`${invoiceNumber}`, boxCenterX + 40, 60);

//   doc.setFont("helvetica", "bold");
//   doc.text("Date:", boxCenterX + 5, 67);
//   doc.setFont("helvetica", "normal");
//   doc.text(date, boxCenterX + 40, 67);

//   doc.setFont("helvetica", "bold");
//   doc.text("HSN Code:", boxCenterX + 5, 74);
//   doc.setFont("helvetica", "normal");
//   doc.text("36041000", boxCenterX + 40, 74);

//   doc.setFont("helvetica", "bold");
//   doc.text("Total:", boxCenterX + 5, 81);
//   doc.setFont("helvetica", "normal");
//   doc.text(`${products.length} Case(s)`, boxCenterX + 40, 81);

//   // ==== Table Rows Generation with FILLING ====
//   const tableStartY = boxTopY + boxHeight + 5;
//   const maxRows = 13;
//   const actualRows = products.map((item, index) => [
//     index + 1,
//     item.name,
//     `${item.quantity} Box`,
//     item.rate,
//     item.quantity * item.rate
//   ]);

//   const totalAmount = products.reduce(
//     (acc, curr) => acc + curr.quantity * curr.rate,
//     0
//   );

//   // Fill empty rows to reach fixed row count
//   const blankRows = maxRows - actualRows.length;
//   for (let i = 0; i < blankRows; i++) {
//     actualRows.push(["", "", "", ""]);
//   }

//   // Render table with fixed number of rows
// autoTable(doc, {
//   startY: tableStartY,
//   head: [["S.No", "Product Particulars", "Quantity", "Rate", "Amount"]],
//   body: actualRows,
//   styles: {
//     fontSize: 10,
//     halign: 'center',   // ✅ Horizontal center
//     valign: 'middle',   // ✅ Vertical center
//     cellPadding: 3
//   },
//   headStyles: {
//     fillColor: [41, 128, 185],
//     textColor: 255,
//     halign: 'center',
//     valign: 'middle'
//   },
//   bodyStyles: {
//     halign: 'center',
//     valign: 'middle'
//   },
//   tableLineColor: 200,
//   tableLineWidth: 0.1
// });


//   const finalY = doc.lastAutoTable.finalY;

//   // ==== AMOUNT ROW ====
//   doc.setFont("helvetica", "bold");
//   doc.setFillColor(220, 220, 220);
//   doc.rect(14, finalY + 2, 122, 8, 'F');  // blank area
//   doc.rect(136, finalY + 2, 30, 8, 'F');  // label
//   doc.rect(166, finalY + 2, 29, 8, 'F');  // amount

//   doc.setTextColor(0);
//   doc.setFontSize(10);
//   doc.text('GRANDTOTAL', 140, finalY + 8);
//   doc.text(totalAmount.toFixed(2), 192, finalY + 8, { align: 'right' });

//   // ==== AMOUNT IN WORDS ====
// const inWords = (num) => {
//   const a = [
//     '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
//     'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen',
//     'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
//   ];
//   const b = [
//     '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty',
//     'Sixty', 'Seventy', 'Eighty', 'Ninety'
//   ];

//   const number = parseInt(num);
//   if (number === 0) return 'Zero';

//   let str = '';

//   const getWords = (n) => {
//     if (n < 20) return a[n];
//     const tens = Math.floor(n / 10);
//     const units = n % 10;
//     return b[tens] + (units ? ' ' + a[units] : '');
//   };

//   const lakh = Math.floor(number / 100000);
//   const thousand = Math.floor((number % 100000) / 1000);
//   const hundred = Math.floor((number % 1000) / 100);
//   const rest = number % 100;

//   if (lakh > 0) str += getWords(lakh) + ' Lakh ';
//   if (thousand > 0) str += getWords(thousand) + ' Thousand ';
//   if (hundred > 0) str += a[hundred] + ' Hundred ';
//   if (rest > 0) str += (str ? 'and ' : '') + getWords(rest);

//   return str.trim();
// };


//   const words = `Rs. ${inWords(totalAmount)} Only`;
//   doc.setFont("helvetica", "italic");
//   doc.setFontSize(10);
//   doc.setTextColor(0);
//   doc.text(words, 15, finalY + 18);

//   // ==== Footer ====
//   const pageHeight = doc.internal.pageSize.height;
//   doc.line(10, pageHeight - 30, 200, pageHeight - 30);
//   doc.setFont("helvetica", "normal");
//   doc.text("Prepared by", 15, pageHeight - 25);
//   doc.text("Checked by", 80, pageHeight - 25);
//   doc.text("For HARIHARAN TRADER", 145, pageHeight - 25);
//   doc.text("Authorised Signatory", 150, pageHeight - 20);

//   // Save
//   doc.save(`${to} - ${type}_invoice.pdf`);
// };

// export default GenerateInvoicePDF;

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const getInvoiceNumber = (type) => {
  let lastInvoiceNumber = localStorage.getItem('lastInvoiceNumber');
  lastInvoiceNumber = lastInvoiceNumber ? parseInt(lastInvoiceNumber) : 0;

  if (type === 'original') {
    lastInvoiceNumber += 1;
    localStorage.setItem('lastInvoiceNumber', lastInvoiceNumber);
  }

  return lastInvoiceNumber;
};

const GenerateInvoicePDF = ({ to, products, type, toAddress }) => {
  const doc = new jsPDF();

  doc.rect(5, 5, 200, 287);

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("HARIHARAN TRADER", 75, 15);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("No.3/1341/15, Sattur Road, Opp. Old PRC Bus Depot,", 62, 20);
  doc.text("Near East Police Station, SIVAKASI – 626 189.", 65, 25);
  doc.text("GST No:33AA1FH1506M12J", 83, 30);

  doc.setFont("helvetica", "bold");
  doc.text(`${type === "original" ? "Original" : "Duplicate"} for Transporter`, 150, 48);

  doc.setFont("helvetica", "normal");
  doc.text("BILL OF SUPPLY", 90, 43);
  doc.text("(Composition in GST under Sec.10)", 75, 48);
  doc.line(10, 50, 200, 50);

  const date = new Date().toLocaleDateString();
  const invoiceNumber = getInvoiceNumber(type);

  const wrappedTo = doc.splitTextToSize(to || "_____", 60);
  const wrappedAddress = doc.splitTextToSize(toAddress || "_____", 60);
  const addressHeight = (wrappedTo.length + wrappedAddress.length) * 5 + 15;
  const boxHeight = Math.max(28, addressHeight);

  const boxTopY = 55;
  const boxCenterX = 14 + 181 / 2;
  doc.rect(14, boxTopY, 181, boxHeight);
  doc.line(boxCenterX, boxTopY, boxCenterX, boxTopY + boxHeight);

  doc.setFont("helvetica", "bold");
  doc.text("To:", 17, 60);
  doc.setFont("helvetica", "normal");
  doc.text(wrappedTo, 36, 60);

  const addressY = 60 + wrappedTo.length * 5 + 2;
  doc.setFont("helvetica", "bold");
  doc.text("Address:", 17, addressY);
  doc.setFont("helvetica", "normal");
  doc.text(wrappedAddress, 36, addressY);

  const rightX = boxCenterX + 5;
  doc.setFont("helvetica", "bold");
  doc.text("Invoice No:", rightX, 60);
  doc.setFont("helvetica", "normal");
  doc.text(`${invoiceNumber}`, rightX + 35, 60);

  doc.setFont("helvetica", "bold");
  doc.text("Date:", rightX, 67);
  doc.setFont("helvetica", "normal");
  doc.text(date, rightX + 35, 67);

  doc.setFont("helvetica", "bold");
  doc.text("HSN Code:", rightX, 74);
  doc.setFont("helvetica", "normal");
  doc.text("36041000", rightX + 35, 74);

  doc.setFont("helvetica", "bold");
  doc.text("Total:", rightX, 81);
  doc.setFont("helvetica", "normal");
  doc.text(`${products.length} Case(s)`, rightX + 35, 81);

  const tableStartY = boxTopY + boxHeight + 5;
  const maxRows = 20;
  const actualRows = products.map((item, index) => [
    index + 1,
    item.name,
    `${item.quantity} Box`,
    item.rate,
    item.quantity * item.rate
  ]);

  const totalAmount = products.reduce(
    (acc, curr) => acc + curr.quantity * curr.rate,
    0
  );

  for (let i = 0; i < maxRows - actualRows.length; i++) {
    actualRows.push(["", "", "", "", ""]);
  }

  autoTable(doc, {
    startY: tableStartY,
    head: [["S.No", "Product Particulars", "Quantity", "Rate", "Amount"]],
    body: actualRows,
    styles: {
      fontSize: 10,
      halign: 'center',
      valign: 'middle',
      cellPadding: 3
    },
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255,
      halign: 'center',
      valign: 'middle'
    },
    bodyStyles: {
      halign: 'center',
      valign: 'middle'
    },
    tableLineColor: 200,
    tableLineWidth: 0.1
  });

  const finalY = doc.lastAutoTable.finalY;

  doc.setFont("helvetica", "bold");
  doc.setFillColor(220, 220, 220);
  doc.rect(14, finalY + 2, 122, 8, 'F');
  doc.rect(136, finalY + 2, 30, 8, 'F');
  doc.rect(166, finalY + 2, 29, 8, 'F');
  doc.setTextColor(0);
  doc.setFontSize(10);
  doc.text('GRANDTOTAL', 140, finalY + 8);
  doc.text(totalAmount.toFixed(2), 192, finalY + 8, { align: 'right' });

  const inWords = (num) => {
    const a = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
      'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen',
      'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty',
      'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    const number = parseInt(num);
    if (number === 0) return 'Zero';

    let str = '';

    const getWords = (n) => {
      if (n < 20) return a[n];
      const tens = Math.floor(n / 10);
      const units = n % 10;
      return b[tens] + (units ? ' ' + a[units] : '');
    };

    const lakh = Math.floor(number / 100000);
    const thousand = Math.floor((number % 100000) / 1000);
    const hundred = Math.floor((number % 1000) / 100);
    const rest = number % 100;

    if (lakh > 0) str += getWords(lakh) + ' Lakh ';
    if (thousand > 0) str += getWords(thousand) + ' Thousand ';
    if (hundred > 0) str += a[hundred] + ' Hundred ';
    if (rest > 0) str += (str ? 'and ' : '') + getWords(rest);

    return str.trim();
  };

  const words = `Rs. ${inWords(totalAmount)} Only`;
  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);
  doc.setTextColor(0);
  doc.text(words, 15, finalY + 18);

  const pageHeight = doc.internal.pageSize.height;
  doc.line(10, pageHeight - 30, 200, pageHeight - 30);
  doc.setFont("helvetica", "normal");
  doc.text("Prepared by", 15, pageHeight - 25);
  doc.text("Checked by", 80, pageHeight - 25);
  doc.text("For HARIHARAN TRADER", 145, pageHeight - 25);
  doc.text("Authorised Signatory", 150, pageHeight - 20);

  doc.save(`${to} - ${type}_invoice.pdf`);
};

export default GenerateInvoicePDF;
