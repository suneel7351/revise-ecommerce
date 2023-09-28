import React from "react";
import './Heading.css'

function Heading(props) {
  return (
    <>
      <div className="heading mt-3">
        {" "}
        <div className=""></div>
        <p className="md:text-xl text-md">{props.text}</p>
        <div></div>
      </div>
    </>
  );
}

export default Heading;
