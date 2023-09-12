import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import {
  clearError,
  clearMessage,
  changePassword,
} from "../../redux/auth/profileSlice";
import { useNavigate } from "react-router-dom";
import Metadata from "../Metadata";
import { toast } from "react-toastify";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
function UpdatePassword() {
  const navigate = useNavigate();
  const [show1, setShow1] = useState(false)
  const [show2, setShow2] = useState(false)
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.profile);

  const hanldeSignIn = (e) => {
    e.preventDefault()
    if (!newPassword || !oldPassword) return
    dispatch(changePassword({ oldPassword, newPassword }));
    setNewPassword("")
    setOldPassword("")
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
  }, [dispatch, error, message, navigate]);

  return (
    <>
      <Metadata title="eccomerce-UpdatePassword" />
      <div className="pt-12 md:w-[30%] w-[90%] mx-auto">
        <div className="border border-gray-50 shadow-sm bg-white py-8">
          <h1 className="text-slate-600 text-2xl text-center mb-4">
            Change Password
          </h1>
          <form action="" className="w-[80%] mx-auto flex flex-col gap-6">
            <div className="px-4 py-2  border border-gray-100 shadow-sm rounded-md flex gap-2 items-center jusity-between"> <input
              type={show1 ? "text" : "password"}
              autoFocus={false}
              autoComplete="false"
              placeholder="Old Password"
              className="focus:outline-none w-full"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required

            />

              {
                show1 ? <AiFillEyeInvisible className="cursor-pointer text-lg text-gray-500" onClick={() => setShow1(false)} /> : <AiFillEye className="cursor-pointer text-lg text-gray-500" onClick={() => setShow1(true)} />
              }

            </div>


            <div className="px-4 py-2  border border-gray-100 shadow-sm rounded-md flex gap-2 items-center jusity-between"> <input
              type={show2 ? "text" : "password"}
              autoFocus={false}
              autoComplete="false"
              placeholder="New Password"
              className="focus:outline-none w-full"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

              {
                show2 ? <AiFillEyeInvisible className="cursor-pointer text-lg text-gray-500" onClick={() => setShow2(false)} /> : <AiFillEye className="cursor-pointer text-lg text-gray-500" onClick={() => setShow2(true)} />
              }

            </div>


            <div className="flex flex-col gap-4">
              <button
                type="submit"
                className={` bg-orange-500 hover:bg-orange-600
                   text-white rounded py-1 px-2`}
                onClick={hanldeSignIn}
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdatePassword;
