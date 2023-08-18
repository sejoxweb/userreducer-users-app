import React, { useState, useEffect } from "react";

const CounterTwo = ({ firstCounterValue, currentButton }) => {
  const [countii, setCounterii] = useState(0);

  useEffect(() => {
    if (currentButton === "increment") {
      debugger;
      console.log("firstCounterValue>>>", firstCounterValue);
      setCounterii(countii + 1);
    }

    if (currentButton === "decrement") {
      debugger;
      setCounterii(countii - 1);
    }
  }, [firstCounterValue, currentButton]);

  const handleInrease = () => {
    setCounterii(countii + 1);
  };

  const handleDerease = () => {
    setCounterii(countii - 1);
  };

  console.log("countii", countii);

  return (
    <div style={{ margin: "50px" }}>
      count two <button onClick={handleDerease}>-</button>
      {/* <span style={{ padding: "10px" }}>{firstCounterValue}</span> */}
      <span> {countii} </span>
      <button onClick={handleInrease}>+</button>
    </div>
  );
};

export default CounterTwo;
