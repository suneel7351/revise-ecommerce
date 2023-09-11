import { Schema, model } from "mongoose";


const notificationSchema = new Schema({
    message: String,
    type: String,
    createdAt: { type: Date, default: Date.now },
    read: {
        type: Boolean,
        default: false
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: "Seller"
    }
});


const Notification = model('notification', notificationSchema)

export default Notification