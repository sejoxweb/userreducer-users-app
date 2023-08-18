import React, { useState } from "react";

const InputTwo = () => {
  const [value, setValue] = useState("");

  //   const handleChange = (e) => {
  //     setValue(e.target.value);
  //   };

  //Fragment <></>
  return (
    <>
      <input
        id="two"
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <div>{value}</div>
    </>
  );
};

export default InputTwo;
