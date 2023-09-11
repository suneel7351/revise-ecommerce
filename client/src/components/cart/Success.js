import React from "react";
import MetaData from "../Metadata";
import {AiOutlineCheck} from 'react-icons/ai'
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@mui/material";

function Success() {
  const refNo = useSearchParams()[0].get("reference");

  return (
    <>
      <MetaData title="Payment Success" />
      <div className="h-[85vh] flex flex-col items-center justify-center bg-gray-100">
        <AiOutlineCheck
          className=" text-5xl text-orange-500 rounded-full shadow border border-gray-50 p-2"
        />
        <h1 className="text-4xl font-semibold my-4">Your Order has been placed successfully.</h1>
        <span className="text-2xl">Ref No. - {refNo}</span>
        <p className="my-6 text-lg text-center text-gray-700 md:w-1/2 mx-auto w-[90%]">
          Thank you for choosing our online store for your purchase. Your order has been successfully placed and is being processed. You will receive a confirmation email with order details shortly.
        </p>
        <Button
          variant="contained"
          className="mt-8 px-8 py-3 text-xl bg-[#fe5f1e] hover:bg-[#fe5720]"
        >
          <Link to="/orders">View Orders</Link>
        </Button>
        <p className="mt-4 text-sm text-gray-600">
          Need assistance? <Link to="/contact" className="underline">Contact Us</Link>
        </p>
      </div>
    </>
  );
}

export default Success;
