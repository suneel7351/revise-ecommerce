import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/seller/auth";
import { Link, useNavigate } from "react-router-dom";
import Metadata from "../Metadata";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from 'react-hot-toast'
function RegisterSeller() {
    const navigate = useNavigate();
    const fileInput = useRef(null);
    const dispatch = useDispatch();
    const { loading, isSeller } = useSelector((state) => state.sellerAuth);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState("");
    const [showPassword, setShowPassword] = useState(false);



    const fileUpload = () => {
        if (fileInput) {
            fileInput.current.click();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            !firstName ||
            !lastName ||
            !email ||
            !contactNumber ||
            !companyName ||
            !username ||
            !password ||
            !avatar
        )
            return;


        const resultAction = await dispatch(
            register({
                firstName, lastName, email, contactNumber, companyName, username, password, avatar
            })
        );

        if (register.fulfilled.match(resultAction)) {
            const successMessage = resultAction.payload.message;
            navigate("/seller/verify");
            toast.success(successMessage);
        } else if (register.rejected.match(resultAction)) {
            const errorMessage = resultAction.payload;
            toast.error(errorMessage);
        }
    };

    const handleAvatar = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatar(reader.result);
            }
        };
        reader.readAsDataURL(file);
    };




    if (isSeller) return navigate("/seller/dashboard")

    return (
        <>
            <Metadata title="eccomerce-register" />
            <div className="mt-4 md:w-[80%] w-[90%] mx-auto">
                <div className="border border-slate-100 shadow-sm pb-8 mt-8">
                    <h1 className="text-3xl text-gray-600 text-center py-4">Register as a Seller</h1>
                    <form
                        action=""
                        className="w-[80%] mx-auto md:grid md:grid-cols-2 md:gap-6 flex flex-col gap-6 "
                        onSubmit={handleSubmit}
                    >
                        <div className="md:col-span-2 flex md:flex-row flex-col gap-6">
                            <input
                                type="text"
                                autoFocus={false}
                                autoComplete="false"
                                placeholder="First Name"
                                className="px-4 py-2 flex-1 border border-gray-100 shadow-sm rounded-md focus:outline-none"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required={true}
                            />
                            <input
                                type="text"
                                autoFocus={false}
                                autoComplete="false"
                                placeholder="Last Name"
                                className="px-4 py-2 flex-1 border border-gray-100 shadow-sm rounded-md focus:outline-none"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required={true}
                            />
                        </div>
                        <div className="md:col-span-2 flex md:flex-row flex-col gap-6">  <input
                            type="email"
                            autoFocus={false}
                            autoComplete="false"
                            placeholder="Email"
                            className="px-4 py-2 border flex-1 border-gray-100 shadow-sm rounded-md focus:outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required={true}
                        />
                            <input
                                type="text"
                                autoFocus={false}
                                autoComplete="false"
                                placeholder="Contact Number"
                                className="px-4 py-2 border flex-1 border-gray-100 shadow-sm rounded-md focus:outline-none"
                                value={contactNumber}
                                onChange={(e) => setContactNumber(e.target.value)}
                                required={true}
                            /></div>
                        <div className="md:col-span-2 flex md:flex-row flex-col gap-6">
                            <input
                                type="text"
                                autoFocus={false}
                                autoComplete="false"
                                placeholder="Company Name"
                                className="px-4 py-2 border flex-1 border-gray-100 shadow-sm rounded-md focus:outline-none"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                required={true}
                            />
                            <input
                                type="text"
                                autoFocus={false}
                                autoComplete="false"
                                placeholder="Username"
                                className="px-4 py-2 border flex-1 border-gray-100 shadow-sm rounded-md focus:outline-none"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required={true}
                            />
                        </div>
                        <div className="md:col-span-2 flex md:flex-row flex-col gap-6">
                            <div className=" px-4 py-2  flex-1 border border-gray-100 shadow-sm rounded-md flex gap-2 items-center">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    autoFocus={false}
                                    autoComplete="false"
                                    placeholder="Password"
                                    className="focus:outline-none w-full"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />

                                {showPassword ? (
                                    <AiFillEyeInvisible
                                        className="cursor-pointer text-lg text-gray-500"
                                        onClick={() => setShowPassword(false)}
                                    />
                                ) : (
                                    <AiFillEye
                                        className="cursor-pointer text-lg text-gray-500"
                                        onClick={() => setShowPassword(true)}
                                    />
                                )}



                            </div>
                            <div className="flex gap-2 items-center flex-1">
                                <img
                                    src={avatar && avatar}
                                    alt={firstName}
                                    className={
                                        avatar ? "rounded-full w-12 h-12" : " rounded-full bg-gray-200"
                                    }
                                />
                                <input
                                    type="file"
                                    className="file-input hidden"
                                    ref={fileInput}
                                    accept="image/*"
                                    onChange={handleAvatar}
                                />
                                <div
                                    className="w-full text-center cursor-pointer px-4 py-2 border border-gray-100 shadow-sm rounded-md focus:outline-none"
                                    onClick={fileUpload}
                                >
                                    Choose Avatar
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 items-center justify-between">
                            <button
                                className={`shadow bg-orange-500 hover:bg-orange-600
                  text-white rounded py-2 px-4`}
                                type="submit"
                            >
                                {loading ? "Loading..." : "Register"}
                            </button>
                            <Link
                                to="/login"
                                className="border py-2 px-4 border-gray-100 shadow text-center text-[#2874f0]  rounded"
                            >
                                Already have an account?
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default RegisterSeller;
