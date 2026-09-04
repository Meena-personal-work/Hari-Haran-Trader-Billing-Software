// import React, { useState } from "react";
// import "./BillingForm.css";
// import GenerateInvoicePDF from "./generateInvoice";
// import "jspdf-autotable"; 


// const ProductForm = () => {
//   const [toAddress, settoAddress] = useState("");
//   const [toInvoiceNo, settoInvoiceNo] = useState("");
//   const [toGstNo, settoGstNo] = useState("");
//   const [toPhoneNo, settoPhoneNo] = useState("");
//   const [to, setTo] = useState("");
//   const [products, setProducts] = useState([
//     { name: "", quantity: "", rate: "" },
//   ]);

//   const handleChange = (index, field, value) => {
//     const updated = [...products];
//     updated[index][field] = value;
//     setProducts(updated);
//   };

//   const addProduct = () => {
//     setProducts([...products, { name: "", quantity: "", rate: "" }]);
//   };

//   const validateForm = () => {
//   if (!toInvoiceNo.trim()) {
//     alert("Please enter the Invoice Number.");
//     return false;
//   }

//   if (!to.trim()) {
//     alert("Please fill in the 'To' field.");
//     return false;
//   }

//   if (!toAddress.trim()) {
//     alert("Please fill in the Address field.");
//     return false;
//   }

//   if (!toPhoneNo.trim()) {
//     alert("Please fill in the Phone Number field.");
//     return false;
//   }

//   for (let i = 0; i < products.length; i++) {
//     const { name, quantity, rate } = products[i];
//     if (!name.trim() || !quantity || !rate) {
//       alert(`Please fill in all fields for product #${i + 1}`);
//       return false;
//     }
//   }

//   // GST Number is optional – no validation

//   return true;
// };


//   const handleOriginalPdf = () => {
//   if (validateForm()) {
//     GenerateInvoicePDF({to, products, type: "original", toAddress, toGstNo,toPhoneNo,toInvoiceNo });
//   }
// };

// const handleDuplicatePdf = () => {
//   if (validateForm()) {
//     GenerateInvoicePDF({ to, products, type: "duplicate", toAddress, toGstNo,toPhoneNo,toInvoiceNo });
//   }
// };

// const handleReset = () => {
//   setTo("");
//   settoAddress("");
//   settoInvoiceNo("");
//   settoGstNo("");
//   settoPhoneNo("");
//   setProducts([{ name: "", quantity: "", rate: "" }]);

//   window.scrollTo({ top: 0, behavior: "smooth" }); // ⬅️ scroll to top
// };


//   return (
//     <div className="main-container">
//       <div className="glass-box">
//         <h2 className="title">🎇 Invoice Downloader 🎇</h2>

//         <div className="form-row">
//           <label>Invoice Number</label>
//           <input
//             type="number"
//             value={toInvoiceNo}
//             placeholder="Enter Invoice Number"
//             onChange={(e) => settoInvoiceNo(e.target.value)}
//           />        
//           <label>To</label>
//           <input
//             type="text"
//             value={to}
//             placeholder="Enter receiver name"
//             onChange={(e) => setTo(e.target.value)}
//           />
//             <label>Address</label>
//           <input
//             type="text"
//             value={toAddress}
//             placeholder="Enter address"
//             onChange={(e) => settoAddress(e.target.value)}
//           />
//           <label>Phone Number</label>
//           <input
//             type="number"
//             value={toPhoneNo}
//             placeholder="Enter Phone Number"
//             onChange={(e) => settoPhoneNo(e.target.value)}
//           />
//           <label>GST Number</label>
//           <input
//             type="text"
//             value={toGstNo}
//             placeholder="Enter GST Number"
//             onChange={(e) => settoGstNo(e.target.value)}
//           />
//         </div>

//         <h3 className="section-title">Products</h3>
//         {products.map((item, index) => (
//       <div key={index} className="products-container">
//   <input
//     className="input-mobile product-name"
//     type="text"
//     placeholder="Product Name"
//     value={item.name}
//     onChange={(e) => handleChange(index, "name", e.target.value)}
//   />
//   <input
//     className="input-mobile product-quantity"
//     type="number"
//     placeholder="Quantity"
//     value={item.quantity}
//     onChange={(e) => handleChange(index, "quantity", e.target.value)}
//   />
//   <input
//     className="input-mobile product-rate"
//     type="number"
//     placeholder="Rate"
//     value={item.rate}
//     onChange={(e) => handleChange(index, "rate", e.target.value)}
//   />
//   {products.length > 1 && (
//     <button className="remove-button" onClick={() => {
//       const newProducts = [...products];
//       newProducts.splice(index, 1);
//       setProducts(newProducts);
//     }}>
//       ❌
//     </button>
//   )}
// </div>

//         ))}

//         <button className="add-button" onClick={addProduct}>
//           + Add Product
//         </button>

//         <div className="button-group">
//           <button className="download original" onClick={handleOriginalPdf}>
//             Download Original
//           </button>
//           <button className="download duplicate" onClick={handleDuplicatePdf}>
//             Download Duplicate
//           </button>
//           <button className="download reset" onClick={handleReset}>
//             Reset
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductForm;


import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const GenerateInvoicePDF = ({
  to,
  products,
  type,
  toAddress,
  toGstNo,
  toPhoneNo,
  toInvoiceNo,
  toInvoiceDate, // optional - pass a custom date string, e.g. "05/09/2026"
}) => {
  const doc = new jsPDF();

  doc.rect(5, 5, 200, 287);

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("HARIHARAN TRADER", 75, 15);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("No.3/1341/15, Sattur Road, Opp. Old PRC Bus Depot,", 62, 20);
  doc.text("Near East Police Station, SIVAKASI – 626 189.", 65, 25);
  doc.text("GST No:33AA1FH1506M12Z", 83, 30);

  doc.setFont("helvetica", "bold");
  doc.text(`${type === "original" ? "Original for Receiptor" : "Duplicate for Transporter"}`, 150, 48);

  doc.setFont("helvetica", "normal");
  doc.text("BILL OF SUPPLY", 90, 43);
  doc.text("(Composition in GST under Sec.10)", 75, 48);
  doc.line(10, 50, 200, 50);

  // Use provided date if given, otherwise default to today
  const date = toInvoiceDate || new Date().toLocaleDateString();

  const wrappedTo = doc.splitTextToSize(to || "_____", 65);
  const wrappedAddress = doc.splitTextToSize(toAddress || "_____", 65);
  const wrappedPhoneNo = doc.splitTextToSize(toPhoneNo || "_____", 65);
  const wrappedGSTNo = toGstNo ? doc.splitTextToSize(toGstNo, 65) : [];

  // Calculate dynamic height
  let totalLineCount = wrappedTo.length + wrappedAddress.length + wrappedPhoneNo.length + 3;
  if (wrappedGSTNo.length > 0) totalLineCount += wrappedGSTNo.length;
  const boxHeight = Math.max(28, totalLineCount * 5);

  const boxTopY = 55;
  const boxCenterX = 14 + 181 / 2;
  doc.rect(14, boxTopY, 181, boxHeight);
  doc.line(boxCenterX, boxTopY, boxCenterX, boxTopY + boxHeight);

  // Left Side Block
  let currentY = 60;

  doc.setFont("helvetica", "bold");
  doc.text("To:", 17, currentY);
  doc.setFont("helvetica", "normal");
  doc.text(wrappedTo, 36, currentY);
  currentY += wrappedTo.length * 5 + 2;

  doc.setFont("helvetica", "bold");
  doc.text("Address:", 17, currentY);
  doc.setFont("helvetica", "normal");
  doc.text(wrappedAddress, 36, currentY);
  currentY += wrappedAddress.length * 5 + 2;

  doc.setFont("helvetica", "bold");
  doc.text("Phone No:", 17, currentY);
  doc.setFont("helvetica", "normal");
  doc.text(wrappedPhoneNo, 36, currentY);
  currentY += wrappedPhoneNo.length * 5 + 2;

  if (wrappedGSTNo.length > 0) {
    doc.setFont("helvetica", "bold");
    doc.text("GST No:", 17, currentY);
    doc.setFont("helvetica", "normal");
    doc.text(wrappedGSTNo, 36, currentY);
    currentY += wrappedGSTNo.length * 5 + 2;
  }

  // Right Side Details
  const rightX = boxCenterX + 5;
  doc.setFont("helvetica", "bold");
  doc.text("Invoice No:", rightX, 60);
  doc.setFont("helvetica", "normal");
  doc.text(`${toInvoiceNo}`, rightX + 35, 60);

  doc.setFont("helvetica", "bold");
  doc.text("Date:", rightX, 67);
  doc.setFont("helvetica", "normal");
  doc.text(date, rightX + 35, 67);

  doc.setFont("helvetica", "bold");
  doc.text("HSN Code:", rightX, 74);
  doc.setFont("helvetica", "normal");
  doc.text("36041000", rightX + 35, 74);

  const totalCases = products.reduce((acc, curr) => acc + parseFloat(curr.quantity || 0), 0);
  doc.setFont("helvetica", "bold");
  doc.text("Total:", rightX, 81);
  doc.setFont("helvetica", "normal");
  doc.text(`${totalCases} Case(s)`, rightX + 35, 81);

  // Table
  const tableStartY = boxTopY + boxHeight + 5;
  const maxRows = 20;
  const actualRows = products.map((item, index) => [
    index + 1,
    item.name,
    `${item.quantity} Box`,
    item.rate,
    item.quantity * item.rate,
  ]);

  const totalAmount = products.reduce((acc, curr) => acc + curr.quantity * curr.rate, 0);

  for (let i = 0; i < maxRows - actualRows.length; i++) {
    actualRows.push(["", "", "", "", ""]);
  }

  autoTable(doc, {
    startY: tableStartY,
    head: [["S.No", "Product Particulars", "Cases", "Rate", "Amount"]],
    body: actualRows,
    styles: {
      fontSize: 10,
      halign: "center",
      valign: "middle",
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255,
      halign: "center",
      valign: "middle",
    },
    bodyStyles: {
      halign: "center",
      valign: "middle",
    },
    tableLineColor: 200,
    tableLineWidth: 0.1,
  });

  const finalY = doc.lastAutoTable.finalY;

  doc.setFont("helvetica", "bold");
  doc.setFillColor(220, 220, 220);
  doc.rect(14, finalY + 2, 122, 8, "F");
  doc.rect(136, finalY + 2, 30, 8, "F");
  doc.rect(166, finalY + 2, 29, 8, "F");
  doc.setTextColor(0);
  doc.setFontSize(10);
  doc.text("GRANDTOTAL", 140, finalY + 8);
  doc.text(totalAmount.toFixed(2), 192, finalY + 8, { align: "right" });

  const inWords = (num) => {
    const a = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const b = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    const number = parseInt(num);
    if (number === 0) return "Zero";

    let str = "";

    const getWords = (n) => {
      if (n < 20) return a[n];
      const tens = Math.floor(n / 10);
      const units = n % 10;
      return b[tens] + (units ? " " + a[units] : "");
    };

    const lakh = Math.floor(number / 100000);
    const thousand = Math.floor((number % 100000) / 1000);
    const hundred = Math.floor((number % 1000) / 100);
    const rest = number % 100;

    if (lakh > 0) str += getWords(lakh) + " Lakh ";
    if (thousand > 0) str += getWords(thousand) + " Thousand ";
    if (hundred > 0) str += a[hundred] + " Hundred ";
    if (rest > 0) str += (str ? "and " : "") + getWords(rest);

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
  doc.text("Authorised Signatory", 150, pageHeight - 11);

  doc.save(`${to} - ${type}_invoice.pdf`);
};

export default GenerateInvoicePDF;
