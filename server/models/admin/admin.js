import mongoose from "mongoose";
const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
        select:false
    },
});



const AdminSchema = mongoose.model("admin", adminSchema);

export default AdminSchema;
