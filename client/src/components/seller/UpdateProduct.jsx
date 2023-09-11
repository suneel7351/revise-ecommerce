import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import  {  getSingleProduct, updateProduct } from "../../redux/seller/product";
import { toast } from "react-hot-toast";
import { useParams } from 'react-router-dom'
const UpdateProduct = () => {
    const dispatch = useDispatch();
    const { id } = useParams()
    const { loading, product } = useSelector((state) => state.sellerProduct);
    const [images, setImages] = useState([]);
    const [imgPreview, setImgPreview] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        size: "",
        stock: "",
        images: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages([]);
        setImgPreview([]);
        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImages((old) => [...old, reader.result]);
                    setImgPreview((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFiles = Array.from(e.dataTransfer.files);
        const newImages = [];

        droppedFiles.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    newImages.push(reader.result);
                    setImages((oldImages) => [...oldImages, reader.result]);
                    setImgPreview((oldPreviews) => [...oldPreviews, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("name", formData.name);
        data.append("description", formData.description);
        data.append("price", formData.price);
        data.append("category", formData.category);
        data.append("size", formData.size);
        data.append("Stock", formData.stock);

        // Append images to the FormData
        images.forEach((item) => {
            data.append("images", item);
        });

        const response = await dispatch(updateProduct({ data, id }));
        if (updateProduct.fulfilled.match(response)) {
            toast.success(response.payload);
        } else if (updateProduct.rejected.match(response)) {
            toast.error(response.payload);
        }
    };

    const categoryOptions = [
        { value: "electronics", label: "Electronics" },
        { value: "clothes", label: "Clothes" },
        { value: "accessories", label: "Accessories" },
        // Add more categories here
    ];


    useEffect(() => {
        dispatch(getSingleProduct(id))
    }, [id])

    useEffect(() => {
        if (product) {
            console.log(product);
            setFormData({
                name: product?.name,
                description: product?.description,
                price: product?.price,
                category: product?.category,
                stock: product?.Stock,
                images: [],
            })
        }
    }, [product])

    return (
        <div
            className="admin-container "
            style={{ height: "calc(100vh - 73px)" }}
        >
            <div className="md:px-6 px-4  border-r border-gray-100 bg-white">
                <Sidebar />
            </div>
            <div
                style={{ background: "#f5f5f5" }}
                className={`main-container`}
            >
                <div className="w-[99%] py-6 mx-auto bg-white border border-gray-100 shadow">
                    {" "}
                    <h2 className="text-2xl font-semibold mb-6 text-center">
                        Update Product
                    </h2>
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6 w-[90%] mx-auto"
                        encType="multipart/form-data"
                    >
                        <div className="space-y-2">
                            <label className="block text-sm font-medium mb-2 ">
                                Product Title*
                            </label>
                            <input
                                type="text"
                                placeholder="Product Title"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="py-1 w-full border rounded border-gray-100 shadow-sm px-4"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium mb-2">
                                Description*
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="py-1 w-full border rounded border-gray-100 shadow-sm px-4"
                                required
                                placeholder="Description"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium mb-2">Price*</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="py-1 w-full border rounded border-gray-100 shadow-sm px-4"
                                required
                                placeholder="Price"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium mb-2">
                                Category*
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="py-1 w-full border rounded border-gray-100 shadow-sm px-4"
                                required
                                placeholder="Choose Category"
                            >
                                <option value="" disabled>
                                    Select Category
                                </option>
                                {categoryOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium mb-2">Stock*</label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                className="py-1 w-full border rounded border-gray-100 shadow-sm px-4"
                                required
                                placeholder="Stock"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium mb-2">Images*</label>
                            <div className="flex items-center">
                                <div
                                    className="flex items-center"
                                    onDrop={handleDrop}
                                    onDragOver={(e) => e.preventDefault()}
                                >
                                    <label className="cursor-pointer border-dashed border img-input p-4 rounded">
                                        <input
                                            type="file"
                                            name="images"
                                            onChange={handleImageChange}
                                            multiple
                                            className="hidden"
                                            accept="image/*"
                                            required
                                        />
                                        {/* <MdFileUpload className="text-4xl" /> */}
                                        <p className="px-4 py-2">Drag & drop or Choose</p>
                                    </label>
                                </div>
                            </div>
                            <div className="mt-4 gap-2 flex-wrap flex">
                                {imgPreview.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`Image ${index}`}
                                        className="w-24  h-24 shadow border border-gray-100 p-2  object-cover rounded mr-2"
                                    />
                                ))}
                            </div>
                        </div>
                        <button
                            type="submit"
                            className={`btn px-4 py-2 rounded hover:bg-blue-600 ${loading ? "loading" : ""
                                }`}
                        >
                            {loading ? "Updating..." : "Update Product"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProduct;
