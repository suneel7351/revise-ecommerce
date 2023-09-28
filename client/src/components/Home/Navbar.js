import React, { useEffect, useState } from "react";
import '../../style/Navbar.css'
function Navbar({ handleShowProduct }) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

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
      <nav className="border-b border-gray-50 shadow-sm">
        <div className="navbar flex items-center justify-evenly gap-4">
          {/* Display buttons on larger screens */}
          {isSmallScreen ? (
            <div className="md:hidden">
              <select onChange={(event) => handleShowProduct(event.target.value)}>
            <option value="">Select Category</option>
                <option value="miPhones">Mi Phones</option>
                <option value="redmiphones">Redmi Phones</option>
                <option value="tv">TV</option>
                <option value="laptop">Laptops</option>
                <option value="audio">Audio</option>
                <option value="accessories">Accessories</option>
                <option value="home">Home</option>
                <option value="fitnessLifestyle">Fitness and Lifestyle</option>
              </select>
            </div>
          ) : (
            <div className="hidden md:flex gap-4 ">
              <button className="" onClick={() => handleShowProduct("miPhones")}>
                Mi Phones
              </button>
              <button className="" onClick={() => handleShowProduct("redmiphones")}>
                Redmi Phones
              </button>
              <button className="" onClick={() => handleShowProduct("tv")}>
                TV
              </button>
              <button className="" onClick={() => handleShowProduct("laptop")}>
                Laptops
              </button>
              <button className="" onClick={() => handleShowProduct("audio")}>
                Audio
              </button>
              <button className="" onClick={() => handleShowProduct("accessories")}>
                Accessories
              </button>
              <button className="" onClick={() => handleShowProduct("home")}>
                Home
              </button>
              <button className="" onClick={() => handleShowProduct("fitnessLifestyle")}>
                Fitness and Lifestyle
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
