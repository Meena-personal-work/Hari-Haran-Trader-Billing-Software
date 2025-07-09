import React, { useState } from "react";
import "./BillingForm.css";
import GenerateInvoicePDF from "./generateInvoice";
import "jspdf-autotable"; 


const ProductForm = () => {
  const [from, setFrom] = useState("");
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
    if (!from.trim() || !to.trim()) {
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
    
    GenerateInvoicePDF({to, products, type: "original" });
  }
};

const handleDuplicatePdf = () => {
  if (validateForm()) {
    GenerateInvoicePDF({ to, products, type: "duplicate" });
  }
};

  return (
    <div className="main-container">
      <div className="glass-box">
        <h2 className="title">🎇 Invoice Downloader 🎇</h2>

        <div className="form-row">
          <label>From</label>
          <input
            type="text"
            value={from}
            placeholder="Enter sender name"
            onChange={(e) => setFrom(e.target.value)}
          />
          <label>To</label>
          <input
            type="text"
            value={to}
            placeholder="Enter receiver name"
            onChange={(e) => setTo(e.target.value)}
          />
        </div>

        <h3 className="section-title">Products</h3>
        {products.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              marginBottom: "25px",
            }}
          >
            <input
              type="text"
              placeholder="Product Name"
              value={item.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
              style={{ flex: 1, padding: "10px" }}
            />
            <input
              type="number"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) => handleChange(index, "quantity", e.target.value)}
              style={{ width: "100px", padding: "10px" }}
            />
            <input
              type="number"
              placeholder="Rate"
              value={item.rate}
              onChange={(e) => handleChange(index, "rate", e.target.value)}
              style={{ width: "100px", padding: "10px" }}
            />
            {products.length > 1 && (
              <button
                onClick={() => {
                  const newProducts = [...products];
                  newProducts.splice(index, 1);
                  setProducts(newProducts);
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "red",
                  cursor: "pointer",
                }}
              >
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
