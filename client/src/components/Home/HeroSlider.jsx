import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import data from "../../data/Data";

function HeroSlider() {
    return (
        <Carousel fade>
        {data?.banner?.start?.map((items, index) => {
          return (
            <Carousel.Item>
              <img className="d-block w-100" key={index} src={items} alt={index} />
            </Carousel.Item>
          );
        })}
      </Carousel>
    );
}

export default HeroSlider;
