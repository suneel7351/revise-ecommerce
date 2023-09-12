import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState, useRef } from "react";
import {
  clearError,
  clearMessage,
  updateProfile,
} from "../../redux/auth/profileSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Metadata from "../Metadata";
import { profile } from "../../redux/auth/userSlice";

function EditProfile() {
  const navigate = useNavigate();
  const fileInput = useRef(null);
  const dispatch = useDispatch();
  const { message, error, loading } = useSelector((state) => state.profile);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
  }, [dispatch, message, error]);

  const fileUpload = () => {
    if (fileInput) {
      fileInput.current.click();
    }
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateProfile({ name, email, avatar }));
    await dispatch(profile());
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
      <Metadata title="eccomerce-EditProfile" />
      <div className="pt-12 md:w-[30%] w-[90%] mx-auto">
        <div className="border border-gray-50 bg-white shadow-sm p-8">
          <h1 className="text-center text-3xl text-slate-600 mb-6">
            Edit Profile
          </h1>{" "}
          <form
            action=""
            className="w-[80%] mx-auto flex flex-col gap-6 "
            onSubmit={handlerSubmit}
          >
            <input
              id="name"
              autoFocus={false}
              autoComplete="false"
              placeholder="Enter Name"
              type="text"
              className="px-4 py-2 border border-gray-100 shadow-sm rounded-md focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              id="email"
              autoFocus={false}
              autoComplete="false"
              placeholder="Enter Email"
              type="email"
              className="px-4 py-2 border border-gray-100 shadow-sm rounded-md focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
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
            <button
              type="submit"
              className={` bg-orange-500 hover:bg-orange-600
                   text-white rounded py-1 px-2`}
            >
              {loading ? "Loading..." : "Update"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
