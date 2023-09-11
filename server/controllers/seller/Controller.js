
import Seller from "../../models/seller/seller.js"
import User from "../../models/user/User.js"
import { AsyncError } from "../../middleware/AsyncError.js";
import ErrorHandler from "../../utility/errorHandlerClass.js";
import generateOTP from "../../utility/generateOTP.js";
import sendMail from '../../utility/sendMail.js'
import html from '../../utility/sendOtpHtml.js'
class Controller {
    static register = AsyncError(async (req, res, next) => {
        const { firstName, lastName, email, contactNumber, companyName, username, password, avatar } = req.body;
        if (!firstName || !lastName || !email || !contactNumber || !companyName || !username || !password) {
            return next(new ErrorHandler(400, "All fields are required."));
        }
        const existingEmail = await Seller.findOne({ email });
        const existingUserEmail = await User.findOne({ email })
        if (existingUserEmail) return next(new ErrorHandler(400, "You can not registered as a user and seller with same email."));
        if (existingEmail) {
            return next(new ErrorHandler(400, "Seller with this email is already registered."));
        }

        const existingUsername = await Seller.findOne({ username });
        if (existingUsername) {
            return next(new ErrorHandler(400, "Username is already taken."));
        }


        const otp = generateOTP(6);
        const otpExpiration = new Date(Date.now() + process.env.OTP_EXPIRATION * 60 * 1000);

        const seller = new Seller({
            firstName,
            lastName,
            email,
            contactNumber,
            companyName,
            username,
            password,
            otp,
            otpExpiration,
            avatar: {
                public_id: "suneel",
                url: "kumar"
            }
        });

        await seller.save();


        const token = await seller.getJwtToken()

        res.cookie('seller_token', token, {
            httpOnly: true,
            maxAge: process.env.JWT_COOKIE_EXPIRE_SELLER * 24 * 60 * 60 * 1000,
            secure: true,
        });


        await sendMail(email, `Verify Otp | ${firstName} ${lastName}`, html(`${firstName} ${lastName}`, companyName, otp))


        return res.status(201).json({ message: "Seller registered successfully. Check your email for OTP verification." });

    });




    static login = AsyncError(async (req, res, next) => {
        const { username, password } = req.body;
        if (!username || !password) {
            return next(new ErrorHandler(400, "Username and password are required."));
        }
        const seller = await Seller.findOne({ username });

        if (!seller || !(await seller.matchPassword(password))) {
            return next(new ErrorHandler(401, "Invalid credentials."));
        }
        const token = await seller.getJwtToken()


        res.cookie('seller_token', token, {
            httpOnly: true,
            maxAge: process.env.JWT_COOKIE_EXPIRE_SELLER * 24 * 60 * 60 * 1000,
            secure: true,
        });

        return res.status(200).json({ message: "Seller logged in successfully." });
    });




    static verifyOTP = AsyncError(async (req, res, next) => {
        const { otp } = req.body;
        const sellerId = req.seller;
        const seller = await Seller.findById(sellerId);
        if (!seller || seller.otp !== otp) {
            return next(new ErrorHandler(401, "Invalid OTP."));
        }

        if (seller.otpExpiration < new Date()) {
            return next(new ErrorHandler(401, "OTP has expired. Request a new OTP."));
        }

        seller.isVerified = true;
        seller.otp = undefined;
        seller.otpExpiration = undefined;
        await seller.save();

        return res.status(200).json({ message: "Seller account verified successfully." });
    });



    static resendOTP = AsyncError(async (req, res, next) => {
        const sellerId = req.seller;
        const seller = await Seller.findById(sellerId);

        if (!seller) {
            return next(new ErrorHandler(404, "Seller not found."));
        }

        const newOTP = generateOTP(6);
        const newOTPExpiration = new Date(Date.now() + process.env.OTP_EXPIRATION * 60 * 1000);


        seller.otp = newOTP;
        seller.otpExpiration = newOTPExpiration;
        await seller.save();

        // send mail for otp verify
        await sendMail(seller.email, `Verify Otp | ${seller.firstName} ${seller.lastName}`, html(`${seller.firstName} ${seller.lastName}`, seller.companyName, newOTP))
        return res.status(200).json({ message: "New OTP sent successfully." });
    });


    static profile = AsyncError(async (req, res, next) => {
        let seller = await Seller.findById(req.seller)
        res.status(200).json({ success: true, seller })
    })



    static logout = AsyncError(async (req, res, next) => {
        res.cookie("seller_token", null, {
            httpOnly: true,
            expires: new Date(0),
            secure: true,
        });

        res.status(200).json({
            success: true,
            message: "Logged Out Successfully.",
        });
    });

}






export default Controller