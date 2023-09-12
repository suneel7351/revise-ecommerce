import React, { useState, useEffect } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

function AddToWishlist({ product, text = true }) {
  const [isAdded, setIsAdded] = useState(false);
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );
  useEffect(() => {
    setIsAdded(wishlist.some((item) => item._id === product._id));
  }, [product, wishlist]);

  const toggleWishlist = () => {
    if (!isAdded) {
      const updatedWishlist = [...wishlist, product];
      setWishlist(updatedWishlist);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    } else {
      const updatedWishlist = wishlist.filter((item) => item._id !== product._id);
      setWishlist(updatedWishlist);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    }
    setIsAdded((prev) => !prev);
  };

  return (
    <div className={!text ? "" : `flex gap-2 items-center min-w-[160px]`} onClick={toggleWishlist}>
      {isAdded ? (
        <FavoriteIcon className="text-orange-500" fontSize="18"/>
      ) : (
        <FavoriteBorderIcon fontSize="18"/>
      )}
      {
        text && <span>{isAdded ? "Added to Wishlist" : "Add to Wishlist"}</span>
      }
    </div>
  );
}

export default AddToWishlist;
