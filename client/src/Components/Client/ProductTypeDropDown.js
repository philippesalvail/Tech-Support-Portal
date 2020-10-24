import React from "react";

const ProductTypeDropDown = () => {
  return (
    <select value={productTypeSelected} onChange={setProductTypeSelected}>
      <option selected value="Hardware">
        Hardware
      </option>
      <option value="Software">Software</option>
      <option value="CellPhone">CellPhone</option>
    </select>
  );
};
