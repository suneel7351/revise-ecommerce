import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { login, profile } from "../../redux/auth/userSlice";
import { Link, useNavigate } from "react-router-dom";
import Metadata from "../Metadata";
import { toast } from 'react-hot-toast';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false)
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error, message } = useSelector(
    (state) => state.user
  );

  const hanldeSignIn = async () => {
    if (!email || !password) return
    const res = await dispatch(login({ email, password }));
    if (login.fulfilled.match(res)) {
      toast.success(res.payload)
      dispatch(profile())
      setEmail("")
      setPassword("")
    } else if (login.rejected.match(res)) {
      toast.error(res.payload)
      setPassword("")
    }
  };

  const redirect = window.location.search
    ? `/${window.location.search.split("=")[1]}`
    : "/profile";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [isAuthenticated, navigate, redirect, dispatch]);

  return (
    <>
      <Metadata title="eccomerce-login" />
      <div className="pt-12 md:w-[30%] w-[90%] mx-auto ">
        <div className="border border-slate-100 shadow-sm py-4 bg-white">
          <form action="" className="w-[80%] mx-auto flex flex-col gap-6">
            <input
              type="email"
              autoFocus={false}
              autoComplete="false"
              placeholder="Enter Email"
              className="px-4 py-2 border border-gray-100 shadow-sm rounded-md focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="px-4 py-2  border border-gray-100 shadow-sm rounded-md flex gap-2 items-center jusity-between"> <input
              type={show ? "text" : "password"}
              autoFocus={false}
              autoComplete="false"
              placeholder="Enter Password"
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
                to="/register"
                className="border border-slate-100 shadow-md py-1 text-center text-[#2874f0] hover:shadow-lg rounded-md"
              >
                SignUp
              </Link>
              <Link
                to="/forgot/password"
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

export default Login;
