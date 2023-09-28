import mongoose from "mongoose";
const adminSchema = new mongoose.Schema({
    name: {
        type: String
    },
    size: {
        type: String,
        enum: ["300px", "500px"]
    }
});



const AdminSchema = mongoose.model("admin", adminSchema);

export default AdminSchema;
