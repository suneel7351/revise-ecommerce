import React, { useState } from "react";
import Dashboard from "@mui/icons-material/Dashboard";
import { Link } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import PostAddIcon from "@mui/icons-material/PostAdd";
import TreeView from "@mui/lab/TreeView/TreeView";
import TreeItem from "@mui/lab/TreeItem/TreeItem";
import ListAlt from "@mui/icons-material/ListAlt";
import RateReviewIcon from "@mui/icons-material/RateReview";
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import CategoryIcon from '@mui/icons-material/Category';
function Sidebar() {

  const [showText, setShowText] = useState(false);

  const toggleText = () => {
    setShowText((prevShowText) => !prevShowText);
  };
  return (
    <div className=" h-full bg-white flex flex-col gap-6">
      <div className="menu-toggle" onClick={toggleText}> 
        <MenuIcon className="my-4 cursor-pointer" />
      </div>
      <div className="sidebar-container mx-auto flex flex-col gap-8">
        <Link className="admin-link-div" to={"/admin/dashboard"}>
          {
            showText ? <> <Dashboard />
              <span>Dashboard</span></> : <Dashboard />
          }

        </Link>
        <div style={{ width: '60px' }} className="">
          <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<CategoryIcon />}
          >
            <TreeItem nodeId="1" label={showText ? <div className=""> <span>Categories</span></div> : ""}>
              <Link to="/admin/categories" className="">
                <TreeItem nodeId="2" label={showText ? "All" : ""} icon={<PostAddIcon />} />
              </Link>

              <Link to="/admin/category/new">
                <TreeItem nodeId="3" label={showText ? "Create" : ""} icon={<AddIcon />} />
              </Link>
            </TreeItem>
          </TreeView>
        </div>
        {/* <Link to="/seller/orders" className="admin-link-div">
          {
            showText ? <>  <ListAlt />
              <span>Orders</span></> : <ListAlt />
          }
        </Link>{" "}

        <Link to="/seller/reviews" className="admin-link-div">
          {
            showText ? <>    <RateReviewIcon />
              <span>Reviews</span></> : <RateReviewIcon />
          }
        </Link>
        <Link to="/seller/notifications" className="admin-link-div">
          {
            showText ? <>    <NotificationsIcon />
              <span>Notifications</span></> : <NotificationsIcon />
          }
        </Link> */}
      </div>
    </div>

  );
}

export default Sidebar;
