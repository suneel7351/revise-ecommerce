import { AsyncError } from '../../middleware/AsyncError.js';
import AdminSchema from '../../models/admin/admin.js';
import jwt from 'jsonwebtoken'
class AdminController {
    static verifyPage = AsyncError(async (req, res) => {
        const token = req.query.token
        if (token === process.env.ADMIN_PAGE_VERIFY) {
         return   res.status(200).json({ success: true })
        }
        return res.status(400).json({ success: false })
    })

    static login = AsyncError(async (req, res, next) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new ErrorHandler(400, "All fields are required."));
        }
        let admin = await AdminSchema.findOne({ email }).select("+password");
        if (!admin) {
            return next(
                new ErrorHandler(
                    400,
                    "Email or password incorrect,login with correct credentials."
                )
            );
        }
      

        if (admin.password !== password) {
            return next(
                new ErrorHandler(
                    400,
                    "Invalid Email or password ,login with correct credentials."
                )
            );
        }


        const token =jwt.sign({ admin: admin._id }, process.env.JWT_SECERET_ADMIN, {
            expiresIn: process.env.JWT_COOKIE_EXPIRE_ADMIN * 24 * 60 * 60 * 1000,
        });

        res.cookie('admin_token', token, {
            httpOnly: true,
            maxAge: process.env.JWT_COOKIE_EXPIRE_ADMIN * 24 * 60 * 60 * 1000,
            secure: true,
        });

        return res.status(200).json({ message: "Seller logged in successfully." });
    });
    static logout = AsyncError(async (req, res, next) => {
        res.cookie("admin_token", null, {
            httpOnly: true,
            expires: new Date(0),
            secure: true,
            sameSite: "none",
        });

        res.status(200).json({
            success: true,
            message: "Logged Out Successfully.",
        });
    });
    static profile = AsyncError(async (req, res, next) => {
        let admin = await AdminSchema.findById(req.admin)
        res.status(200).json({ success: true, admin })
    })


}

export default AdminController