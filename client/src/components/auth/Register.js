import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState, useRef } from "react";
import { clearError, clearMessage, register } from "../../redux/auth/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Metadata from "../Metadata";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
function Register() {
  const navigate = useNavigate();
  const fileInput = useRef(null);
  const dispatch = useDispatch();
  const { message, error, loading } = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [show, setShow] = useState(false)
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
  }, [error, message, dispatch]);

  const fileUpload = () => {
    if (fileInput) {
      fileInput.current.click();
    }
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !avatar) return
    await dispatch(register({ name, email, password, avatar }));
    navigate("/profile");
  };

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
      }
    };
    Reader.readAsDataURL(file);
  };

  return (
    <>
      <Metadata title="eccomerce-register" />
      <div className="mt-4 md:w-[30%] w-[90%] mx-auto">
        <div className="border border-slate-100 shadow-sm py-8 mt-8">
          <form
            action=""
            className="w-[80%] mx-auto flex flex-col gap-6 "
            onSubmit={handlerSubmit}
          >
            <input
              type="text"
              autoFocus={false}
              autoComplete="false"
              placeholder="Enter Name"
              className="px-4 py-2 border border-gray-100 shadow-sm rounded-md focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={true}
            />
            <input
              type="email"
              autoFocus={false}
              autoComplete="false"
              placeholder="Enter Email"
              className="px-4 py-2 border border-gray-100 shadow-sm rounded-md focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={true}
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
            <div className="flex gap-2 items-center">
              <img
                src={avatar && avatar}
                alt={name}
                className={
                  avatar
                    ? "rounded-full w-12 h-12"
                    : " rounded-full bg-gray-200"
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

            <div className="flex flex-col gap-4">
              <button
                className={` bg-orange-500 hover:bg-orange-600
                text-white rounded py-1 px-2`}
                type="submit"
              >
                {loading ? "Loading..." : "Register"}
              </button>
              <span className="text-center text-slate-500">OR</span>
              <Link
                to="/login"
                className="border border-slate-100 shadow-md py-1 text-center text-[#2874f0] hover:shadow-lg rounded-md"
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

export default Register;
