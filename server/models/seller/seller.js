import { Schema, model } from 'mongoose'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const { sign } = jwt;
const sellerSchema = new Schema({
    firstName: { type: String, required: true },
    avatar: {
        public_id: { type: String, required: true },
        url: { type: String, required: true }
    },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactNumber: { type: String, required: true },
    companyName: { type: String, required: true },
    companyAddress: { type: String },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    status: { type: String, enum: ['active', 'suspended', 'pending'], default: 'pending' },
    otp: { type: String },
    otpExpiration: { type: Date },

    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'sellerProduct'
        }
    ],

    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: 'sellerOrder'
        }
    ],
    income: {
        type: Number,
        default: 0
    },
    expenses: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});





sellerSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

sellerSchema.methods.getJwtToken = function () {
    return sign({ seller: this._id }, process.env.JWT_SECERET_SELLER, {
        expiresIn: process.env.JWT_COOKIE_EXPIRE_SELLER * 24 * 60 * 60 * 1000,
    });
};

sellerSchema.methods.matchPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error(error);
    }
};

const Seller = model('Seller', sellerSchema);

export default Seller
