import React, { useEffect } from "react";
import MetaData from "../Metadata";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  console.log(user);
  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      {loading ? (
        <p>Loading</p>
      ) : (
        <>
          <MetaData title={user && `${user.name}-profile`} />
          {user && (
            <div className=" md:px-8 px-1">
              <div className="flex flex-wrap justify-center md:gap-32 gap-16 px-4 border border-slate-100 py-12 shadow-sm">
                <div className="flex flex-col justify-center items-center gap-8">
                  <div className="border border-slate-200 shadow-md p-2 rounded-full">
                    <img
                      src={
                        user.avatar.url
                          ? user.avatar.url
                          : "https://cdn.pixabay.com/photo/2020/03/11/13/50/indian-4922226__340.jpg"
                      }
                      alt={user.name}
                      className="w-[250px] h-[250px] object-cover rounded-full"
                    />
                  </div>
                  <Link to="/update/profile">
                    <button
                      className="bg-[#fe5f1e] text-white rounded px-4 py-2"
                    >
                      Edit Profile
                    </button>
                  </Link>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col">
                    <h1 className="text-xl">Name</h1>
                    <h1 className="text-lg text-slate-600">{user.name}</h1>
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-xl">Email</h1>
                    <h2 className="text-lg text-slate-600">{user.email}</h2>
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-xl">Joined At</h1>
                    <h2 className="text-lg text-slate-600">
                      {user.createdAt.substring(0, 10)}
                    </h2>
                  </div>
                  <div className="flex flex-col gap-6 mt-4">
                    <button className="bg-[#fe5f1e] text-white rounded px-4 py-2">
                      <Link to="/update/password">Change Password</Link>
                    </button>
                    <button className="bg-[#fe5f1e] text-white rounded px-4 py-2">
                      <Link to="/orders">My Orders</Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Profile;
