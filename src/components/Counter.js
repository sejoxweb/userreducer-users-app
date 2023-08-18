import React, { useState } from "react";

const Counter = ({ increment, decrement, count }) => {
  return (
    <div style={{ margin: "50px" }}>
      count one <button onClick={decrement}>-</button>
      <span style={{ padding: "10px" }}>{count}</span>
      <button onClick={increment}>+</button>
    </div>
  );
};

export default Counter;
