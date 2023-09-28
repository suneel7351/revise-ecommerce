import React, { useState, useEffect } from "react";
import HotItemCard from "./HotItemCard.js";
import "../../style/HotAccessorries.css";
import data from "../../data/Data.js";

function HotAccessorries({
  music = data?.hotAccessories?.music,
  smartDevice = data.hotAccessories.smartDevice,
  home = data.hotAccessories.home,
  lifeStyle = data.hotAccessories.lifeStyle,
  mobileAccessories = data.hotAccessories.mobileAccessories,
}) {
  const [selectedCategory, setSelectedCategory] = useState("music");
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const handleClick = (category) => {
    setSelectedCategory(category);
  };

  const getItemsByCategory = () => {
    switch (selectedCategory) {
      case "music":
        return music;
      case "smartDevice":
        return smartDevice;
      case "home":
        return home;
      case "lifeStyle":
        return lifeStyle;
      case "mobileAccessories":
        return mobileAccessories;
      default:
        return [];
    }
  };

  const itemsToDisplay = getItemsByCategory();

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsSmallScreen(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);

    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  return (
    <>
      {isSmallScreen ? (
        <div className="HotAccessoriesMenu mb-6 font-semibold px-4">
          <select onChange={(e) => handleClick(e.target.value)} className="p-2">
            <option value="">Select Accessories</option>
            <option value="music">Music Store</option>
            <option value="smartDevice">Smart Devices</option>
            <option value="home">Home</option>
            <option value="lifeStyle">Life Style</option>
            <option value="mobileAccessories">Mobile Accessories</option>
          </select>
        </div>
      ) : (
        <div className="HotAccessoriesMenu mb-6 font-semibold">
          <span
            className={`hotaccessorieslink cursor-pointer ${
              selectedCategory === "music" ? "active" : ""
            }`}
            onClick={() => handleClick("music")}
          >
            Music Store
          </span>
          <span
            className={`hotaccessorieslink cursor-pointer ${
              selectedCategory === "smartDevice" ? "active" : ""
            }`}
            onClick={() => handleClick("smartDevice")}
          >
            Smart Devices
          </span>
          <span
            className={`hotaccessorieslink cursor-pointer ${
              selectedCategory === "home" ? "active" : ""
            }`}
            onClick={() => handleClick("home")}
          >
            Home
          </span>
          <span
            className={`hotaccessorieslink cursor-pointer ${
              selectedCategory === "lifeStyle" ? "active" : ""
            }`}
            onClick={() => handleClick("lifeStyle")}
          >
            Life Style
          </span>
          <span
            className={`hotaccessorieslink cursor-pointer ${
              selectedCategory === "mobileAccessories" ? "active" : ""
            }`}
            onClick={() => handleClick("mobileAccessories")}
          >
            Mobile Accessories
          </span>
        </div>
      )}

      <div className="hotAccessorries flex-wrap">
        <div className="hotAccessorriesCover flex-1 min-w-[276px] mx-auto">
          <img
            src={
              data.hotAccessoriesCover[selectedCategory] || "" 
            }
            alt=""
          />
        </div>
        <div className="flex-[3] flex-wrap">
          {itemsToDisplay.map((item, index) => {
            return (
              <HotItemCard
                key={item.image}
                name={item.name}
                price={item.price}
                index={index}
                image={item.image}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default HotAccessorries;
