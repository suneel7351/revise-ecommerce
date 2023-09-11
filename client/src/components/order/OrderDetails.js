import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, orderDetails } from "../../redux/order/orderSlice";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
function OrderDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { order, loading, error } = useSelector((state) => state.order);
  useEffect(() => {
    dispatch(orderDetails(id));
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [id, dispatch, error]);
  return (
    <div className="py-6">
      {loading ? (
        <p>Loading</p>
      ) : (
        <div>
          {order && (
            <div className="py-8 container mx-auto flex bg-white shadow border border-gray-100 flex flex-col gap-6  p-4 md:p-8">
              <div className=" flex flex-col gap-4">
                <h1 className="text-[#fe5f1e] text-xl md:text-3xl">
                  Order #{order._id}
                </h1>
                {order.shippingInfo && (
                  <div className="flex flex-col gap-3">
                    <h1 className="text-2xl">Shipping Info:</h1>
                    <div className="flex flex-col gap-2">
                      <h1 className=" flex gap-3">
                        <span className="font-medium">Name:</span>{" "}
                        <span className="text-slate-700">
                          {order.user && order.user.name && order.user.name}
                        </span>
                      </h1>{" "}
                      <h1 className=" flex gap-3">
                        <span className="font-medium">Address:</span>{" "}
                        <span className="text-slate-700">
                          {`${order.shippingInfo.address},${order.shippingInfo.city},${order.shippingInfo.state}`}
                        </span>
                      </h1>{" "}
                      <h1 className=" flex gap-3">
                        <span className="font-medium">Pincode:</span>{" "}
                        <span className="text-slate-700">
                          {order.shippingInfo.pinCode}
                        </span>
                      </h1>{" "}
                      <h1 className=" flex gap-3">
                        <span className="font-medium">Phone:</span>{" "}
                        <span className="text-slate-700">
                          {order.shippingInfo.phoneNo}
                        </span>
                      </h1>
                    </div>
                  </div>
                )}
                <div className="flex flex-col gap-3">
                  <h1 className="text-2xl">Payment Info:</h1>
                  <div className="flex flex-col gap-2">
                    <h1 className="flex gap-3">
                      <span>Status:</span>{" "}
                      <span className="text-slate-700">PAID</span>
                    </h1>{" "}
                    <h1 className="flex gap-3">
                      <span>Amount:</span>{" "}
                      <span className="text-slate-700 ">
                        {order.totalPrice}
                      </span>
                    </h1>
                  </div>
                </div>
                <h1 className="text-2xl">Order Status:</h1>
                <div className="">
                  <h1 className={`text-slate-700`}>{order.orderStatus}</h1>
                </div>
              </div>
              <div className="border-t border-slate-200 py-4 mt-6">
                <h1 className="text-3xl mt-4 mb-8">Order Items:</h1>
                <div className="w-[98%] md:w-[70%] flex flex-col gap-4 px-4">
                  {order.orderItems &&
                    order.orderItems.map((item) => {
                      return (
                        <div
                          key={item.product}
                          className="flex justtify-start gap-3 md:gap-0 items-center md:justify-between"
                        >
                          <div className="flex gap-2 md:gap-8 items-center">
                            <img
                              src={item?.image}
                              alt={item.name}
                              className="w-[50px]"
                            />
                            <Link to={`/product/${item.product}`} className="text-slate-700 text-xl">
                              {item.name}
                            </Link>
                          </div>
                          <div>
                            <p>
                              {item.quantity}X&#8377;{item.price}=
                              <b> &#8377;{item.quantity * item.price}</b>
                            </p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default OrderDetails;
