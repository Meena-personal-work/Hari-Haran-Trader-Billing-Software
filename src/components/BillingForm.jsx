import React, { useState } from "react";
import "./BillingForm.css";
import GenerateInvoicePDF from "./generateInvoice";
import "jspdf-autotable"; 


const ProductForm = () => {
  const [toAddress, settoAddress] = useState("");
  const [toInvoiceNo, settoInvoiceNo] = useState("");
  const [toGstNo, settoGstNo] = useState("");
  const [toPhoneNo, settoPhoneNo] = useState("");
  const [to, setTo] = useState("");
  const [products, setProducts] = useState([
    { name: "", quantity: "", rate: "" },
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...products];
    updated[index][field] = value;
    setProducts(updated);
  };

  const addProduct = () => {
    setProducts([...products, { name: "", quantity: "", rate: "" }]);
  };

  const validateForm = () => {
  if (!toInvoiceNo.trim()) {
    alert("Please enter the Invoice Number.");
    return false;
  }

  if (!to.trim()) {
    alert("Please fill in the 'To' field.");
    return false;
  }

  if (!toAddress.trim()) {
    alert("Please fill in the Address field.");
    return false;
  }

  if (!toPhoneNo.trim()) {
    alert("Please fill in the Phone Number field.");
    return false;
  }

  for (let i = 0; i < products.length; i++) {
    const { name, quantity, rate } = products[i];
    if (!name.trim() || !quantity || !rate) {
      alert(`Please fill in all fields for product #${i + 1}`);
      return false;
    }
  }

  // GST Number is optional – no validation

  return true;
};


  const handleOriginalPdf = () => {
  if (validateForm()) {
    console.log('mkmk');
    
    GenerateInvoicePDF({to, products, type: "original", toAddress, toGstNo,toPhoneNo,toInvoiceNo });
  }
};

const handleDuplicatePdf = () => {
  if (validateForm()) {
    GenerateInvoicePDF({ to, products, type: "duplicate", toAddress, toGstNo,toPhoneNo,toInvoiceNo });
  }
};

const handleReset = () => {
  setTo("");
  settoAddress("");
  settoInvoiceNo("");
  settoGstNo("");
  settoPhoneNo("");
  setProducts([{ name: "", quantity: "", rate: "" }]);

  window.scrollTo({ top: 0, behavior: "smooth" }); // ⬅️ scroll to top
};


  return (
    <div className="main-container">
      <div className="glass-box">
        <h2 className="title">🎇 Invoice Downloader 🎇</h2>

        <div className="form-row">
          <label>Invoice Number</label>
          <input
            type="number"
            value={toInvoiceNo}
            placeholder="Enter Invoice Number"
            onChange={(e) => settoInvoiceNo(e.target.value)}
          />        
          <label>To</label>
          <input
            type="text"
            value={to}
            placeholder="Enter receiver name"
            onChange={(e) => setTo(e.target.value)}
          />
            <label>Address</label>
          <input
            type="text"
            value={toAddress}
            placeholder="Enter address"
            onChange={(e) => settoAddress(e.target.value)}
          />
          <label>Phone Number</label>
          <input
            type="number"
            value={toPhoneNo}
            placeholder="Enter Phone Number"
            onChange={(e) => settoPhoneNo(e.target.value)}
          />
          <label>GST Number</label>
          <input
            type="text"
            value={toGstNo}
            placeholder="Enter GST Number"
            onChange={(e) => settoGstNo(e.target.value)}
          />
        </div>

        <h3 className="section-title">Products</h3>
        {products.map((item, index) => (
      <div key={index} className="products-container">
  <input
    className="input-mobile product-name"
    type="text"
    placeholder="Product Name"
    value={item.name}
    onChange={(e) => handleChange(index, "name", e.target.value)}
  />
  <input
    className="input-mobile product-quantity"
    type="number"
    placeholder="Quantity"
    value={item.quantity}
    onChange={(e) => handleChange(index, "quantity", e.target.value)}
  />
  <input
    className="input-mobile product-rate"
    type="number"
    placeholder="Rate"
    value={item.rate}
    onChange={(e) => handleChange(index, "rate", e.target.value)}
  />
  {products.length > 1 && (
    <button className="remove-button" onClick={() => {
      const newProducts = [...products];
      newProducts.splice(index, 1);
      setProducts(newProducts);
    }}>
      ❌
    </button>
  )}
</div>

        ))}

        <button className="add-button" onClick={addProduct}>
          + Add Product
        </button>

        <div className="button-group">
          <button className="download original" onClick={handleOriginalPdf}>
            Download Original
          </button>
          <button className="download duplicate" onClick={handleDuplicatePdf}>
            Download Duplicate
          </button>
          <button className="download" onClick={handleReset}>
            Reset
          </button>
          {/* <GenerateInvoicePDF from={from} to={to} products={products} type="original" />
<GenerateInvoicePDF from={from} to={to} products={products} type="duplicate" /> */}
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
