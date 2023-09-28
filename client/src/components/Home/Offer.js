import React from "react";
import Offers from "./Offers";
import "../../style/Offer.css";
import data from "../../data/Data";

function Offer({ offer=data.offer }) {
  return (
    <>
      <div className=" mt-3 offer">
        {offer.map((element, index) => {
          return (
            <Offers
              index={index}
              src={element.image}
              url={element.url}
              key={element.image}
            />
          );
        })}
      </div>
    </>
  );
}

export default Offer;
