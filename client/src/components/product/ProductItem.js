import { Rating } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./product.css";
import { DiGitCompare } from 'react-icons/di'
import VisibilityIcon from '@mui/icons-material/Visibility';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import AddToWishlist from "./AddToWishlist";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { } from '../../style/HotItemCard.css'
import { addToCart, addToCompare, removeItem } from "../../redux/product/addToCart";
function ProductItem({ product }) {
  const [isInCart, setIsInCart] = useState(
    localStorage.getItem("cartItem") &&
    JSON.parse(localStorage.getItem("cartItem")).some(
      (item) => item.product === product._id
    )
  );
  const dispatch = useDispatch()
  const isProductInCompare = () => {
    const storedProducts = JSON.parse(localStorage.getItem("compareProducts")) || [];
    return storedProducts.some((p) => p?._id === product?._id);
  };

  const [compareButtonColor, setCompareButtonColor] = useState(
    isProductInCompare()
  );




  const handleAddToCart = (cart) => {
    if (isInCart) {
      dispatch(removeItem(product._id))
      setIsInCart(false);

    } else {
      dispatch(addToCart(cart))
      setIsInCart(true);
    }
  };



  return (
    <>
      {product && (
        <div

          className="
          bg-white group flex flex-col rounded-sm gap-4 py-4 
          product w-[276px]"
        >
          <div className="relative">
            <img
              className="object-cover h-[250px] mx-auto"
              src={
                product.images &&
                product.images.length > 0 &&
                product.images[0].url
              }
              alt={product.name}
            />


            <div className="absolute  transition-all duration-300 ease-in-out top-2 right-4 items-center flex flex-col gap-4 text-gray-600">
              <button>  <AddToWishlist product={product && product} text={false} /></button>
              <div className="hidden group-hover:flex flex-col gap-4 ">
                <button className={isInCart ? "text-orange-500" : ""}>  <LocalMallIcon fontSize={"18"} onClick={() => handleAddToCart({
                  product: product._id,
                  name: product.name,
                  image: product.images[0] ? product.images[0].url : product.name,
                  price: product.price,
                  quantity: 1,
                  Stock: product.Stock,
                })} /></button>
                <button onClick={() => dispatch(addToCompare(product))} style={compareButtonColor ? { color: "#fe5f1e" } : {}}>  <DiGitCompare fontSize={"18"} /></button>
                <Link to={`/product/${product._id}`}>  <VisibilityIcon fontSize={"18"} />
                </Link>
              </div>

            </div>
          </div>


          <div className="product-card-content flex flex-col gap-2 px-4">
            <span className="text-orange-800 font-bold">{product.brand ? product.brand : "en-ecom"}</span>
            <h3 className="font-bold text-sm">
              <Link to={`/product/${product._id}`}>
                {product.name.substring(0, 48)}...
              </Link>

            </h3>
            <div className="flex gap-1 items-center">
              {product.numOfReviews > 0 ? (
                <Rating
                  readOnly
                  defaultValue={3.5}
                  style={{ color: "#fe5f1e" }}
                  value={product.ratings}
                  precision={0.5}
                />
              ) : (
                <span className="text-slate-600">No Review yet...</span>
              )}
              <span>({product.numOfReviews} reviews)</span>
            </div>
            <span className="text-[#fe5f1e]">&#x20B9;{product.price}</span>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductItem;
