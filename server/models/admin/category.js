import mongoose,{Schema} from "mongoose";
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    fields: [
        {
            fieldName: String,
            fieldType: Schema.Types.Mixed,
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },


});



const Category = mongoose.model("category", categorySchema);

export default Category;
