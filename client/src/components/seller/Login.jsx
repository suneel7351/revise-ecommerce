import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
// import { clearError, clearMessage, login } from "../../redux/auth/userSlice";
import { Link, useNavigate } from "react-router-dom";
import Metadata from "../Metadata";
import { toast } from "react-hot-toast"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { login, sellerProfile } from "../../redux/seller/auth";
function SellerLogin() {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false)
    const { loading, isSeller } = useSelector(state => state.sellerAuth)

    const hanldeSignIn = async () => {
        const response = await dispatch(login({ username, password }))
        if (login.fulfilled.match(response)) {
            toast.success(response.payload.message)
            dispatch(sellerProfile())
            navigate("/seller/dashboard")
        } else if (login.rejected.match(response)) {
            toast.error(response.payload)
        }
    };




    if (isSeller) return navigate("/seller/dashboard")
    return (
        <>
            <Metadata title="eccomerce-login" />
            <div className="mt-12 md:w-[30%] w-[90%] mx-auto">
                <div className="border border-slate-100 shadow-sm py-4">
                    <form action="" className="w-[80%] mx-auto flex flex-col gap-6">

                        <input
                            type="text"
                            autoFocus={false}
                            autoComplete="false"
                            placeholder="username"
                            className="px-4 py-2 border border-gray-100 shadow-sm rounded-md focus:outline-none"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <div className="px-4 py-2  border border-gray-100 shadow-sm rounded-md flex gap-2 items-center jusity-between"> <input
                            type={show ? "text" : "password"}
                            autoFocus={false}
                            autoComplete="false"
                            placeholder="password"
                            className="focus:outline-none w-full"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                            {
                                show ? <AiFillEyeInvisible className="cursor-pointer text-lg text-gray-500" onClick={() => setShow(false)} /> : <AiFillEye className="cursor-pointer text-lg text-gray-500" onClick={() => setShow(true)} />
                            }

                        </div>


                        <div className="flex flex-col gap-4">
                            <button
                                type="button"
                                className={` bg-orange-500 hover:bg-orange-600
                   text-white rounded py-1 px-2`}
                                onClick={hanldeSignIn}
                            >
                                {loading ? "Loading..." : "Login"}
                            </button>
                            <span className="text-center text-slate-500">OR</span>
                            <Link
                                to="/seller/register"
                                className="border border-gray-100 shadow py-1 text-center text-[#2874f0] rounded"
                            >
                                Register
                            </Link>
                            <Link
                                to="/seller/forgot/password"
                                className="text-[#4284f1] text-center"
                            >
                                Forgot Password?
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SellerLogin;
