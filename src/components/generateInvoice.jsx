
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// const getInvoiceNumber = (type) => {
//   let lastInvoiceNumber = localStorage.getItem('lastInvoiceNumber');

//   if (!lastInvoiceNumber) {
//     lastInvoiceNumber = 0;
//   } else {
//     lastInvoiceNumber = parseInt(lastInvoiceNumber);
//   }

//   if (type === 'original') {
//     lastInvoiceNumber += 1;
//     localStorage.setItem('lastInvoiceNumber', lastInvoiceNumber);
//   }

//   return lastInvoiceNumber;
// };

// const GenerateInvoicePDF = ({ to, products, type }) => {
//   const doc = new jsPDF();
//   // Full page border (A4 size = 210mm x 297mm)
// doc.rect(5, 5, 200, 287);  // x, y, width, height


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
//    const invoiceNumber = getInvoiceNumber(type);

//   // Box and Divider
//   doc.rect(14, 55, 181, 20);
//   const boxCenterX = 14 + 181 / 2;
//   doc.line(boxCenterX, 55, boxCenterX, 75);

//   // Left
//   doc.text("To:", 17, 60);
//   doc.text(to || "_____", 28, 60);

//   // doc.text("Destination:", 17, 74);

//   // Right
//   doc.text("Invoice No:", boxCenterX + 5, 60);
//   doc.text(`${invoiceNumber}`, boxCenterX + 40, 60);
//   doc.text("Date:", boxCenterX + 5, 67);
//   doc.text(date, boxCenterX + 40, 67);
//   doc.text("HSN Code:", boxCenterX + 5, 74);
//   doc.text("36041000", boxCenterX + 40, 74);
//   doc.text("Total:", boxCenterX + 5, 82);
//   doc.text(`${products.length} Case(s)`, boxCenterX + 40, 82);

//   // Prepare product rows
//   const productRows = products.map((item, index) => [
//     index + 1,
//     item.name,
//     `${item.quantity} Box`,
//     item.rate
//   ]);

//   const totalAmount = products.reduce(
//     (acc, curr) => acc + curr.quantity * curr.rate,
//     0
//   );
//   // const discount = totalAmount * 0.22;
//   // const netAmount = totalAmount - discount;

//   // Add footer row inside the table
//   productRows.push([
//     { content: '', colSpan: 2, styles: { halign: 'right', fillColor: [220, 220, 220], textColor: 20, fontStyle: 'bold' } },
//     { content: 'AMOUNT', styles: { fillColor: [220, 220, 220], fontStyle: 'bold' } },
//     { content: totalAmount.toFixed(2), styles: { halign: 'right', fillColor: [220, 220, 220], fontStyle: 'bold' } }
//   ]);

//   autoTable(doc, {
//     startY: 80,
//     head: [["S.No", "Product Particulars", "Quantity", "Rate"]],
//     body: productRows,
//     styles: { fontSize: 10 },
//     headStyles: { fillColor: [41, 128, 185], textColor: 255, halign: 'center' },
//     bodyStyles: { halign: 'left' }
//   });

//   const finalY = doc.lastAutoTable.finalY + 5;

//   // Amount in Words (below table)
//   const inWords = (num) => {
//     const a = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight",
//       "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen",
//       "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
//     const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy",
//       "Eighty", "Ninety"];
//     const number = parseInt(num);
//     if (number === 0) return "Zero";
//     const numStr = number.toString();
//     if (numStr.length > 6) return "Amount too large";
//     let n = ("000000" + numStr).substr(-6).match(/^(\d{2})(\d{2})(\d{2})$/);
//     if (!n) return;
//     let str = "";
//     str += +n[1] !== 0 ? (a[+n[1]] || b[n[1][0]] + " " + a[n[1][1]]) + " Lakh " : "";
//     str += +n[2] !== 0 ? (a[+n[2]] || b[n[2][0]] + " " + a[n[2][1]]) + " Thousand " : "";
//     str += +n[3] !== 0 ? (a[+n[3]] || b[n[3][0]] + " " + a[n[3][1]]) + " " : "";
//     return str.trim();
//   };

//   const words = `Rs. ${inWords(totalAmount)} Only`;

//   doc.setFont("helvetica", "italic");
//   doc.text(words, 15, finalY + 5);

//   // Footer
//   const pageHeight = doc.internal.pageSize.height;
//   doc.setFont("helvetica", "normal");
//   doc.text("Prepared by", 15, pageHeight - 25);
//   doc.text("Checked by", 80, pageHeight - 25);
//   doc.text("For HARIHARAN TRADER", 145, pageHeight - 25);
//   doc.text("Authorised Signatory", 150, pageHeight - 20);

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

const GenerateInvoicePDF = ({ to, products, type }) => {
  const doc = new jsPDF();

  // Full page border
  doc.rect(5, 5, 200, 287);

  // Header
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

  // Box (Increased height to 25)
// Box Coordinates
const boxTopY = 55;
const boxHeight = 28;  // Increased height for better spacing
doc.rect(14, boxTopY, 181, boxHeight);

const boxCenterX = 14 + 181 / 2;
doc.line(boxCenterX, boxTopY, boxCenterX, boxTopY + boxHeight);

// Left Side
doc.setFont("helvetica", "bold");
doc.text("To:", 17, 60);
doc.setFont("helvetica", "normal");
doc.text(to || "_____", 28, 60);

// Right Side
doc.setFont("helvetica", "bold");
doc.text("Invoice No:", boxCenterX + 5, 60);
doc.setFont("helvetica", "normal");
doc.text(`${invoiceNumber}`, boxCenterX + 40, 60);

doc.setFont("helvetica", "bold");
doc.text("Date:", boxCenterX + 5, 67);
doc.setFont("helvetica", "normal");
doc.text(date, boxCenterX + 40, 67);

doc.setFont("helvetica", "bold");
doc.text("HSN Code:", boxCenterX + 5, 74);
doc.setFont("helvetica", "normal");
doc.text("36041000", boxCenterX + 40, 74);

doc.setFont("helvetica", "bold");
doc.text("Total:", boxCenterX + 5, 81);
doc.setFont("helvetica", "normal");
doc.text(`${products.length} Case(s)`, boxCenterX + 40, 81);


  // Product Table
  const productRows = products.map((item, index) => [
    index + 1,
    item.name,
    `${item.quantity} Box`,
    item.rate
  ]);

  const totalAmount = products.reduce(
    (acc, curr) => acc + curr.quantity * curr.rate,
    0
  );

  productRows.push([
    { content: '', colSpan: 2, styles: { halign: 'right', fillColor: [220, 220, 220], fontStyle: 'bold' } },
    { content: 'AMOUNT', styles: { fillColor: [220, 220, 220], fontStyle: 'bold' } },
    { content: totalAmount.toFixed(2), styles: { halign: 'right', fillColor: [220, 220, 220], fontStyle: 'bold' } }
  ]);

  autoTable(doc, {
    startY: boxTopY + boxHeight + 5, // ensures correct spacing after box
    head: [["S.No", "Product Particulars", "Quantity", "Rate"]],
    body: productRows,
    styles: { fontSize: 10 },
    headStyles: { fillColor: [41, 128, 185], textColor: 255, halign: 'center' },
    bodyStyles: { halign: 'left' }
  });

  const finalY = doc.lastAutoTable.finalY + 5;

  // Amount in Words
  const inWords = (num) => {
    const a = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    const number = parseInt(num);
    if (number === 0) return "Zero";
    const numStr = number.toString();
    if (numStr.length > 6) return "Amount too large";
    const n = ("000000" + numStr).substr(-6).match(/^(\d{2})(\d{2})(\d{2})$/);
    if (!n) return;
    let str = "";
    str += +n[1] !== 0 ? (a[+n[1]] || b[n[1][0]] + " " + a[n[1][1]]) + " Lakh " : "";
    str += +n[2] !== 0 ? (a[+n[2]] || b[n[2][0]] + " " + a[n[2][1]]) + " Thousand " : "";
    str += +n[3] !== 0 ? (a[+n[3]] || b[n[3][0]] + " " + a[n[3][1]]) + " " : "";
    return str.trim();
  };

  const words = `Rs. ${inWords(totalAmount)} Only`;
  doc.setFont("helvetica", "italic");
  doc.text(words, 15, finalY + 5);

  // Footer
  const pageHeight = doc.internal.pageSize.height;
  doc.line(10, pageHeight - 30, 200, pageHeight - 30);  // x1, y1, x2, y2
  doc.setFont("helvetica", "normal");
  doc.text("Prepared by", 15, pageHeight - 25);
  doc.text("Checked by", 80, pageHeight - 25);
  doc.text("For HARIHARAN TRADER", 145, pageHeight - 25);
  doc.text("Authorised Signatory", 150, pageHeight - 20);

  doc.save(`${to} - ${type}_invoice.pdf`);
};

export default GenerateInvoicePDF;
