import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import Metadata from "../Metadata";
import { toast } from "react-hot-toast";
import { otpVerify } from "../../redux/seller/auth";

function VerifyOtp() {
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");
    const dispatch = useDispatch()

    const { loading } = useSelector(state => state.sellerAuth)

    const hanldeSignIn = async () => {
        const response = await dispatch(otpVerify(otp))
        if (otpVerify.fulfilled.match(response)) {
            toast.success(response.payload)
            navigate("/seller/dashboard")
        } else if (otpVerify.rejected.match(response)) {
            toast.error(response.payload)
        }
    };





    return (
        <>
            <Metadata title="otp-verify" />
            <div className="mt-12 md:w-[30%] w-[90%] mx-auto">
                <div className="border border-slate-100 shadow-sm pb-8">
                    <h1 className="text-center text-2xl py-4">Otp Verification</h1>
                    <form action="" className="w-[80%] mx-auto flex flex-col gap-2">

                        <input
                            type="text"
                            autoFocus={false}
                            autoComplete="false"
                            placeholder="otp"
                            className="px-4 py-2 border border-gray-100 shadow-sm rounded-md focus:outline-none"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                        />

                        <small>Enter One Time Password which was sent on your registered mail.</small>


                        <button
                            type="button"
                            className={`mt-4 bg-orange-500 hover:bg-orange-600
                   text-white rounded py-1 px-2`}
                            onClick={hanldeSignIn}
                        >
                            {loading ? "Loading..." : "Verify"}
                        </button>

                    </form>
                </div>
            </div>
        </>
    );
}

export default VerifyOtp;
