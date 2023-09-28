import React, { useState, useEffect } from "react";
import "../../style/NavOption.css";
import Navcard from "./Navcard.js";

function NavOption(
  {
    miphones,
    audio,
    home,
    accessories,
    redmiphones,
    tv,
    laptop,
    fitnessLifestyle,
  },
  props
) {
  const [miphoneToggle, setmiphoneToggle] = useState(false);
  const [redmiphoneToggle, setredmiphoneToggle] = useState(false);
  const [tvToggle, settvToggle] = useState(false);
  const [fitnessLifestyleToggle, setfitnessLifestyleToggle] = useState(false);
  const [homeToggle, sethomeToggle] = useState(false);
  const [audioToggle, setaudioToggle] = useState(false);
  const [accessoriesToggle, setaccessoriesToggle] = useState(false);
  const [laptopToggle, setlaptopToggle] = useState(false);


console.log(window.location.pathname);
  useEffect(() => {
    if (window.location.pathname === "/miphones") {
      setmiphoneToggle(true);
      console.log("miPhones");
    }
    if (window.location.pathname === "/redmiphones") {
      setredmiphoneToggle(true);
      console.log("redmiPhones");
    }
    if (window.location.pathname === "/tv") {
      settvToggle(true);
      console.log("tv");
    }
    if (window.location.pathname === "/fitnessLifestyle") {
      setfitnessLifestyleToggle(true);
      console.log("fitnessLifestyle");
    }
    if (window.location.pathname === "/home") {
      sethomeToggle(true);
      console.log("home");
    }
    if (window.location.pathname === "/audio") {
      setaudioToggle(true);
      console.log("audio");
    }
    if (window.location.pathname === "/accessories") {
      setaccessoriesToggle(true);
      console.log("accessories");
    }
    if (window.location.pathname === "/laptop") {
      setlaptopToggle(true);
      console.log("laptop");
    }
  }, []);
  return (
    <>
      <div className="navOption">
        {miphoneToggle
          ? miphones?.map((items, index) => {
              return (
                <Navcard
                  name={items.name}
                  image={items.image}
                  price={items.price}
                />
              );
            })
          : null}
        {redmiphoneToggle
          ? redmiphones?.map((items, index) => {
              return (
                <Navcard
                  name={items.name}
                  image={items.image}
                  price={items.price}
                />
              );
            })
          : null}
        {tvToggle
          ? tv?.map((items, index) => {
              return (
                <Navcard
                  name={items.name}
                  image={items.image}
                  price={items.price}
                />
              );
            })
          : null}
        {laptopToggle
          ? laptop?.map((items, index) => {
              return (
                <Navcard
                  name={items.name}
                  image={items.image}
                  price={items.price}
                />
              );
            })
          : null}
        {homeToggle
          ? home?.map((items, index) => {
              return (
                <Navcard
                  name={items.name}
                  image={items.image}
                  price={items.price}
                />
              );
            })
          : null}
        {audioToggle
          ? audio?.map((items, index) => {
              return (
                <Navcard
                  name={items.name}
                  image={items.image}
                  price={items.price}
                />
              );
            })
          : null}
        {accessoriesToggle
          ? accessories?.map((items, index) => {
              return (
                <Navcard
                  name={items.name}
                  image={items.image}
                  price={items.price}
                />
              );
            })
          : null}
        {fitnessLifestyleToggle
          ? fitnessLifestyle?.map((items, index) => {
              return (
                <Navcard
                  name={items.name}
                  image={items.image}
                  price={items.price}
                />
              );
            })
          : null}
      </div>
    </>
  );
}

export default NavOption;
