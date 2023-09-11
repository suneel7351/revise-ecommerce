import React, { useEffect } from "react";
import CartItem from "./CartItem";
import { useSelector, useDispatch } from "react-redux";
import "./Cart.css";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { clearCart } from "../../redux/product/addToCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import MetaData from "../Metadata";
import EastIcon from '@mui/icons-material/East';
function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems, loading } = useSelector((state) => state.cart);
  const handlerclearCart = () => {
    dispatch(clearCart());
  };

  function calculateSubtotal(cartItems) {
    return cartItems.filter((item) => {
      return item !== null
    }).reduce(
      (subtotal, item) => subtotal + item.quantity * item.price,
      0
    );
  }

  const checkOutHandler = () => {
    navigate("/login?redirect=shipping");
  };



  return (
    <div className="bg-gray-100 min-h-screen py-16">
      <MetaData title="Cart - Ecommerce" />
      <div className="mx-auto">
        <div className="px-4">
          <h1 className="text-3xl font-semibold mb-8">Shopping Cart</h1>
          {cartItems && cartItems.length > 0 ? (
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="col-span-3">
                  <div className="border-b border-gray-300 pb-2 mb-4">
                    <h2 className="text-lg font-semibold">Products</h2>
                    <div className="hidden md:flex gap-2">
                      <span className="flex-[3]">Product Details</span>
                      <span className="flex-1">Quantity</span>
                      <span className="flex-1">Price</span>
                      <span className="flex-1">Total Price</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2" >


                    {cartItems
                      .filter((item) => item !== null) // Filter out null values
                      .map((item) => (
                        <CartItem key={item.product} item={item} />
                      ))}
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="border-b border-gray-300 pb-2 mb-4">
                    <h2 className="text-lg font-semibold">Summary</h2>
                  </div>
                  <div className="border p-4 bg-gray-50 rounded-lg shadow border-gray-100">
                    {/* Subtotal */}
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">Subtotal:</span>
                      <span>&#8377; {calculateSubtotal(cartItems)}</span>
                    </div>
                    {/* Checkout Button */}
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={checkOutHandler}
                    >
                      Checkout
                    </Button>
                    {/* Continue Shopping */}
                    <Link to="/products" className="text-blue-500 block mt-4 group rounded-full hover:translate-x-2 transition-transform transition ease duration-300 delay-100">
                      Continue Shopping <EastIcon className="text-sm" />
                    </Link>

                  </div>
                  {/* Clear Cart Button */}
                  <div className="mt-4">
                    <Button
                      variant="outlined"
                      color="secondary"
                      fullWidth
                      onClick={handlerclearCart}
                    >
                      Clear Cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-8">
              <RemoveShoppingCartIcon
                style={{ fontSize: "150px", color: "#fe5f1e" }}
              />
              <h1 className="text-center text-4xl text-gray-600 mb-4">
                Your Cart is Empty
              </h1>
              <Link to="/products" className="text-blue-500 block mt-4 group rounded-full hover:translate-x-2 transition-transform transition ease duration-300 delay-100">
                Continue Shopping <EastIcon />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;