import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Metadata from "../Metadata";
import { toast } from 'react-hot-toast';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";
import Notfound from "../Notfound";
import { adminProfile, login } from '../../redux/superAdmin/admin'

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false)
  const [isTokenMatch, setIsTokenMatch] = useState(false)


  const dispatch = useDispatch();
  const { isAdmin, loading } = useSelector(
    (state) => state.superAdmin
  );
  const token = window.location.pathname.split("login/")[1]



  useEffect(() => {
    dispatch(adminProfile())
  }, [dispatch])


  useEffect(() => {
    const func = async () => {
      const { data } = await axios.get(`http://localhost:9889/api/v3/admin/verify-page?token=${token}`)
      if (data?.success === true) {
        setIsTokenMatch(true)
      }
    }

    func()
  }, [])


  const hanldeSignIn = async () => {
    if (!email || !password) return
    const res = await dispatch(login({ email, password }));
    if (login.fulfilled.match(res)) {
      toast.success(res.payload)
      setEmail("")
      setPassword("")
    } else if (login.rejected.match(res)) {
      toast.error(res.payload)
      setPassword("")
    }
  };



  if (!isTokenMatch) return <Notfound />
  if (isAdmin) return <Navigate to={"/admin/dashboard"} />

  return (
    <>
      <Metadata title="admin-login" />
      <div className="pt-12">

        <div className="md:w-[30%] w-[90%] mx-auto">
          <div className="border border-gray-100 shadow-sm py-4 bg-white">
            <form action="" className="w-[80%] mx-auto flex flex-col gap-6 py-4">
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

              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
