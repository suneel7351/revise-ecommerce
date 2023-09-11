import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { AiFillDelete } from "react-icons/ai";
import { createCategory } from "../../redux/superAdmin/admin";

const CreateCategory = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.superAdmin);
    const [categoryName, setCategoryName] = useState("");
    const [fieldInput, setFieldInput] = useState("");
    const [fields, setFields] = useState([]);

    const handleAddField = () => {
        if (fieldInput.trim() !== "") {
            setFields([...fields, fieldInput]);
            setFieldInput("");
        }
    };

    const handleRemoveField = (index) => {
        const updatedFields = [...fields];
        updatedFields.splice(index, 1);
        setFields(updatedFields);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const categoryData = {
            name: categoryName,
            fields: fields.map((fieldName) => ({
                fieldName,
                fieldType: "String",
            })),
        };
        const res = await dispatch(createCategory(categoryData))
        if (createCategory.fulfilled.match(res)) {
            toast.success(res.payload)
        }
        else if (createCategory.rejected.match(res)) {
            toast.error(res.payload)
        }
        setCategoryName("");
        setFields([]);
    };

    return (
        <div className="admin-container" style={{ height: "calc(100vh - 73px)" }}>
            <div className="md:px-6 px-4 border-r border-gray-100 bg-white">
                <Sidebar />
            </div>
            <div
                className={`md:w-[50%] w-[99%] mx-auto mt-12 px-4`}>
                <div className="w-[99%] py-6 mx-auto bg-white border border-gray-100 shadow">
                    <h2 className="text-2xl font-semibold mb-6 text-center">Create New Category</h2>
                    <form className="space-y-6 w-[90%] mx-auto" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium mb-2">Category Name*</label>
                            <input
                                type="text"
                                name="stock"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                className="py-1 w-full border rounded border-gray-100 shadow-sm px-4"
                                required
                                placeholder="Category Name"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium mb-2">Fields</label>
                            <div className="flex justify-between space-x-2 py-1 border rounded border-gray-100 shadow-sm pl-4 px-2" >
                                <input
                                    type="text"
                                    value={fieldInput}
                                    onChange={(e) => setFieldInput(e.target.value)}
                                    className="w-full"
                                    placeholder="Field Name"
                                />
                                <button
                                    type="button"
                                    onClick={handleAddField}
                                    className="px-4 bg-[#fe5f1e] w-[60px] rounded bg-blue-600 text-white shadow"
                                >
                                    Add
                                </button>
                            </div>
                            <ul className="list-disc ml-8 flex flex flex-wrap gap-2 mt-4">
                                {fields.map((field, index) => (
                                    <li key={index} className="flex gap-8 items-center border border-gray-100 shadow-sm px-4 py-1 justify-between items-center">
                                        <span>{field}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveField(index)}
                                            className="text-red-500 hover:text-red-600"
                                        >
                                            <AiFillDelete className="text-xl" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button
                            type="submit"
                            className={`btn px-4 py-2 rounded hover:bg-blue-600 ${loading ? "loading" : ""}`}
                        >
                            {loading ? "Creating..." : "Create Category"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateCategory;
