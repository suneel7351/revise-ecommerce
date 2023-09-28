import React, { useState, useEffect } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { addToWishlist } from "../../redux/product/addToCart";
import { useDispatch } from "react-redux";
function AddToWishlist({ product, text = true }) {
  const dispatch=useDispatch()
  const [isAdded, setIsAdded] = useState(false);
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );


 

  return (
    <div className={!text ? "" : `flex gap-2 items-center min-w-[160px]`} onClick={()=>dispatch(addToWishlist(product))}>
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
