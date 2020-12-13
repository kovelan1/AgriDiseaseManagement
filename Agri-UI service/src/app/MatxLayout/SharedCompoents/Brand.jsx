import React from "react";

const Brand = ({ children }) => {
  return (
    <div className="flex items-center justify-between brand-area">
      <div className="flex items-center brand">
        <img src="/assets/images/agrilogo.jpg" alt="company-logo" />
        <span className="brand__text">AgriSoft</span>
      </div>
      {children}
    </div>
  );
};

export default Brand;
