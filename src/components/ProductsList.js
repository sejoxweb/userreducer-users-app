import React from "react";

const ProductsList = ({ products }) => {
  return (
    <ul>
      {products.map((product, i) => (
        <li key={i}>{product}</li>
      ))}
    </ul>
  );
};

export default ProductsList;
