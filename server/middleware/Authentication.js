import jwt from "jsonwebtoken";
import User from "../models/user/User.js";
import ErrorHandler from "../utility/errorHandlerClass.js";
import Seller from "../models/seller/seller.js";
import AdminSchema from '../models/admin/admin.js'
const { verify } = jwt;

export const Authenticate = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "Login to continue." });
    }
    const { id } = verify(token, process.env.JWT_SECERET);
    req.user = await User.findById(id);
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Inter server error" });
  }
};


export const authenticateSeller = async (req, res, next) => {
  try {
    const { seller_token } = req.cookies;
    if (!seller_token) {
      return res.status(401).json({ success: false, message: "Logged in to continue as a seller." })
    }
    const decoded = verify(seller_token, process.env.JWT_SECERET_SELLER);
    const seller = await Seller.findById(decoded.seller);
    if (!seller) {
      return res.status(401).json({ success: false, message: "Invalid Seller." })
    }

    req.seller = seller._id;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid Token." })
  }
}




export const authenticateAdmin = async (req, res, next) => {
  try {
    const { admin_token } = req.cookies;
    if (!admin_token) {
      return res.status(401).json({ success: false, message: "Logged in to continue as an admin." });
    }
    const decoded = verify(admin_token, process.env.JWT_SECERET_ADMIN);
    const admin = await AdminSchema.findById(decoded.admin);
    if (!admin) {
      return res.status(401).json({ success: false, message: "Invalid Admin." });
    }
    req.admin = admin._id;
    
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token." });
  }
};
