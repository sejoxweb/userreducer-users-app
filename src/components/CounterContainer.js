import React, { useState } from "react";
import Counter from "./Counter";
import CounterTwo from "./CounterTwo";

const CounterContainer = () => {
  const [count, setCounter] = useState(0);
  const [currentButton, setCurrentButton] = useState("");
  function increment() {
    //count++ equalt to coutner = count+1
    setCurrentButton("increment");
    setCounter(count + 1);
  }

  function decrement() {
    setCurrentButton("decrement");
    setCounter(count - 1);
  }
  return (
    <div>
      {/* firstCounter */}
      <Counter increment={increment} decrement={decrement} count={count} />
      {/* secondCounter */}
      <CounterTwo firstCounterValue={count} currentButton={currentButton} />
    </div>
  );
};

export default CounterContainer;
