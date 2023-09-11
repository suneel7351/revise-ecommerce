import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutStep from "./CheckoutStep";
import MetaData from "../Metadata";

function ConfirmOrder() {
  const navigate = useNavigate();
  const { cartItems, shipping } = useSelector((state) => state.cart);

  const subTotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const shippingCharge = subTotal > 1000 ? 0 : 100;
  const tax = subTotal * 0.18;
  const totalPrice = shippingCharge + tax + subTotal;
  const address = `${shipping.city}, ${shipping.state}, ${shipping.country}`;
  const phone = shipping.phoneNo;

  const proceedToPayment = () => {
    const data = { tax, subTotal, totalPrice, shippingCharge };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
  };

 

  return (
    <div className="bg-gray-100 py-4">
      <CheckoutStep activeStep={1} />
      <MetaData title="Confirm Order" />

      <div className="container mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <div className="flex gap-6">
          <div className="w-2/3">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">Shopping Info:</h2>
              <div className="pl-8">
                <p className="mb-2"><b>Name:</b> suneel rajput</p>
                <p className="mb-2"><b>Phone:</b> {phone}</p>
                <p><b>Address:</b> {address}</p>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Your Cart Items:</h2>
              <div className="w-full space-y-4">
                {cartItems.map((item) => (
                  <div key={item.product} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 bg-gray-100 shadow  p-1"
                      />

                      <p className="text-gray-700 text-lg">{item.name.substring(0, 40)}</p>
                    </div>
                    <div>
                      <p>
                        {item.quantity}X&#8377;{item.price}=
                        <b> &#8377;{item.quantity * item.price}</b>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-1/3">
            <div className="border p-4 bg-gray-50 rounded-lg shadow border-gray-100">
              <h2 className="text-2xl font-semibold text-center mb-6">Order Summary</h2>
              <div className="space-y-4 border-t border-gray-300 pt-4">
                <p className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{subTotal}</span>
                </p>
                <p className="flex justify-between">
                  <span>Tax</span>
                  <span>{tax}</span>
                </p>
                <p className="flex justify-between">
                  <span>Shipping Charge</span>
                  <span>{shippingCharge}</span>
                </p>
              </div>
              <div>
                <p className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{totalPrice}</span>
                </p>
              </div>
              <button
                onClick={proceedToPayment}
                className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-full mt-4 w-full"
              >
                Proceed To Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmOrder;
