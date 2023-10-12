import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter((product) => product._id !== productId);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <div className="container mx-auto min-h-screen">
      <h1 className="text-center text-4xl py-4 text-gray-600">Your Wishlist</h1>
     <div className="flex flex-wrap gap-4">
     {wishlist?.map((product) => (
        <div  key={product._id} className="flex flex-col gap-2 w-[250px] bg-white border border-gray-100 shadow-sm p-4">
          <div className="h-[270px]">
            {product.images && product.images.length > 0 && (
              <img src={product.images[0].url} alt={product.name} className="mx-auto" />
            )}
          </div>

          <h2>{product.name}</h2>

          <div className="flex items-center justify-between gap-4">
            <p>&#x20B9;{product.price}</p>
            
            <AiFillDelete
              className="text-2xl text-red-500 cursor-pointer"
              onClick={() => removeFromWishlist(product._id)}
            />
          </div>

          <Link to={`/product/${product._id}`}>Visit</Link>
        </div>
      ))}
     </div>
    </div>
  );
}

export default Wishlist;
