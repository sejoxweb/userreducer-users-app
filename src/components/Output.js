const Output = (props) => {
  // console.log("props>>>", props);
  return (
    <div>
      {props.here} {props.value}
    </div>
  );
};

export default Output;

// function sum({a,b}){
//     return a + b
// }
// sum({a:1, b:4})
