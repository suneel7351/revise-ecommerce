import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllNotifications,
  updateNotificationStatus,
} from "../../redux/seller/product";
import CheckIcon from "@mui/icons-material/Check";
import { sellerProfile } from "../../redux/seller/auth";
const socket = io("http://localhost:9889");

const NotificationPage = () => {
  const [realTimeMsg, setRealTimeMsg] = useState("");
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.sellerAuth);
  const { notifications, unread: unreadCount } = useSelector(
    (state) => state.sellerProduct
  );

  useEffect(() => {
    socket.on("newOrder", (data) => {
      if (data.seller === (seller?._id || localStorage.getItem("seller"))) {
        setRealTimeMsg(data?.notification);
      } else {
        console.log("id not matched");
      }
    });
    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("newOrder");
    };
  }, []);

  useEffect(() => {
    dispatch(getAllNotifications());
  }, [dispatch]);

  const handleUpdateNotificationStatus = async (id) => {
    await dispatch(updateNotificationStatus(id));
    dispatch(getAllNotifications());
  };

  return (
    <div className="admin-container " style={{ height: "calc(100vh - 73px)" }}>
      <div className="md:px-6 px-4 border-r border-gray-100 shadow">
        <Sidebar />
      </div>
      <div className={` main-container bg-gray-50`}>
        <div className="">
          <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">Notifications</h1>
            <div className="mb-4">
              <p className="text-gray-600">
                {unreadCount} unread notifications
              </p>
            </div>
            <div className="space-y-4">
              {realTimeMsg && (
                <div
                  key={realTimeMsg._id}
                  className={`p-4 border rounded-lg ${
                    realTimeMsg.read ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <p className="text-gray-800">{realTimeMsg.message}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(realTimeMsg.createdAt).toLocaleString()}
                  </p>
                </div>
              )}
              {notifications &&
                notifications.map((notification) => (
                  <div
                    key={notification._id}
                    className={`p-4 border rounded-lg flex justify-between gap-4 items-center ${
                      notification.read ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <div>
                      {" "}
                      <p className="text-gray-800">{notification.message}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(notification.createdAt).toLocaleString()}
                      </p>
                    </div>
                    {notification.read ? (
                      <button>
                        {" "}
                        <CheckIcon className="text-green-500 " />
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handleUpdateNotificationStatus(notification._id)
                        }
                        className="border-gray-50 rounded-md shadow-sm border px-2 py-1"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
