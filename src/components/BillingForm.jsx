import React, { useState } from "react";
import "./BillingForm.css";
import GenerateInvoicePDF from "./generateInvoice";
import "jspdf-autotable"; 


const ProductForm = () => {
  const [toAddress, settoAddress] = useState("");
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

  // const removeProduct = (indexToRemove) => {
  //   const updated = products.filter((_, index) => index !== indexToRemove);
  //   setProducts(updated);
  // };

  const validateForm = () => {
    if (!toAddress.trim() || !to.trim()) {
      alert("Please fill in both 'From' and 'To' fields.");
      return false;
    }

    for (let i = 0; i < products.length; i++) {
      const { name, quantity, rate } = products[i];
      if (!name.trim() || !quantity || !rate) {
        alert(`Please fill in all fields for product #${i + 1}`);
        return false;
      }
    }

    return true;
  };

  // const handleOriginalPdf = () => {
  //   if (validateForm()) {
  //     console.log(products);
  //   }
  // };

  // const handleDuplicatePdf = () => {
  //   if (validateForm()) {
  //     console.log(products);
  //   }
  // };

  const handleOriginalPdf = () => {
  if (validateForm()) {
    console.log('mkmk');
    
    GenerateInvoicePDF({to, products, type: "original", toAddress });
  }
};

const handleDuplicatePdf = () => {
  if (validateForm()) {
    GenerateInvoicePDF({ to, products, type: "duplicate", toAddress });
  }
};

  return (
    <div className="main-container">
      <div className="glass-box">
        <h2 className="title">🎇 Invoice Downloader 🎇</h2>

        <div className="form-row">
        
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
            placeholder="Enter sender name"
            onChange={(e) => settoAddress(e.target.value)}
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
          {/* <GenerateInvoicePDF from={from} to={to} products={products} type="original" />
<GenerateInvoicePDF from={from} to={to} products={products} type="duplicate" /> */}
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
