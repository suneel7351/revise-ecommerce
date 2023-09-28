import { Rating } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DiGitCompare } from 'react-icons/di'
import VisibilityIcon from '@mui/icons-material/Visibility';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import AddToWishlist from "../product/AddToWishlist";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import '../../style/HotItemCard.css'
import { addToCart, removeItem } from "../../redux/product/addToCart";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SpecialProductItems({ product }) {
    const [isInCart, setIsInCart] = useState(
        localStorage.getItem("cartItem") &&
        JSON.parse(localStorage.getItem("cartItem")).some(
            (item) => item.product === product._id
        )
    );
    const dispatch = useDispatch()
    const isProductInCompare = () => {
        const storedProducts = JSON.parse(localStorage.getItem("compareProducts")) || [];
        return storedProducts.some((p) => p?._id === product?._id);
    };

    const [compareButtonColor, setCompareButtonColor] = useState(
        isProductInCompare()
    );
    const handleAddToCompare = () => {
        const storedProducts = JSON.parse(localStorage.getItem("compareProducts")) || [];

        const productIndex = storedProducts.findIndex((p) => p._id === product._id);

        if (productIndex !== -1) {
            storedProducts.splice(productIndex, 1);
            setCompareButtonColor(false)
        } else {
            if (storedProducts.length < 4) {
                storedProducts.push(product);
                setCompareButtonColor(true)
            } else {
                toast.error("Atmost 4 product can added for compare at a time.")
            }
        }

        localStorage.setItem("compareProducts", JSON.stringify(storedProducts));
    };



    const handleAddToCart = (cart) => {
        if (isInCart) {
            dispatch(removeItem(product._id))
            setIsInCart(false);

        } else {
            dispatch(addToCart(cart))
            setIsInCart(true);
        }
    };


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: true, // Show arrow buttons
        prevArrow: <div className="slick-arrow slick-prev">Previous</div>, // Customize the previous arrow
        nextArrow: <div className="slick-arrow slick-next">Next</div>, // Customize the next arrow
        responsive: [
          {
            breakpoint: 1024, // Adjust this breakpoint as needed
            settings: {
              slidesToShow: 2, // Number of slides to show on larger screens
              slidesToScroll: 2, // Number of slides to scroll on larger screens
            },
          },
          {
            breakpoint: 768, // Adjust this breakpoint as needed
            settings: {
              slidesToShow: 1, // Number of slides to show on smaller screens
              slidesToScroll: 1, // Number of slides to scroll on smaller screens
            },
          },
        ],
        centerPadding: "20px", // Add padding between items
      };
    return (
        <>
            {product && (
                <div

                    className="flex gap-2 width product py-4 pr-2 pl-1 group"
                >
                    <div className="relative flex flex-col gap-4 flex-1 px-2 flex items-center justify-center">
                        <img
                            className="object-fit mx-auto "
                            src={
                                product.images &&
                                product.images.length > 0 &&
                                product.images[0].url
                            }
                            alt={product.name}
                        />
                        <div className="w-[100px]">
                            <Slider {...settings}>
                                {
                                    product?.images?.map((item, index) => {
                                        return <div key={index} className=""><img src={item?.url}  alt={product?.name}/></div>
                                    })
                                }
                               



                            </Slider>
                        </div>

                        <div className="absolute  transition-all duration-300 ease-in-out top-2 items-center flex flex-col gap-4 text-gray-600 right-4">
                            <button>  <AddToWishlist product={product && product} text={false} /></button>
                            <div className="hidden group-hover:flex flex-col gap-4 ">
                                <button className={isInCart ? "text-orange-500" : ""}>  <LocalMallIcon fontSize={"18"} onClick={() => handleAddToCart({
                                    product: product._id,
                                    name: product.name,
                                    image: product.images[0] ? product.images[0].url : product.name,
                                    price: product.price,
                                    quantity: 1,
                                    Stock: product.Stock,
                                })} /></button>
                                <button onClick={handleAddToCompare} style={compareButtonColor ? { color: "#fe5f1e" } : {}}>  <DiGitCompare fontSize={"18"} /></button>
                                <Link to={`/product/${product._id}`}>  <VisibilityIcon fontSize={"18"} />
                                </Link>
                            </div>

                        </div>
                    </div>


                    <div className="flex-1 flex flex-col gap-2 px-4">
                        <span className="text-orange-800 font-semibold md:font-bold">{product.brand ? product.brand : "en-ecom"}</span>
                        <h3 className="font-bold text-sm ">
                            <Link to={`/product/${product._id}`} className="md:text-md text-sm">
                                {product?.name?.substring(0, 48)}...
                            </Link>

                        </h3>
                        <div className="flex md:flex-row flex-col md:gap-1 gap-2">
                            {product?.numOfReviews > 0 && (
                                <Rating
                                    readOnly
                                    defaultValue={3.5}
                                    style={{ color: "#fe5f1e" }}
                                    value={product.ratings}
                                    precision={0.5}
                                />
                            )}
                            <span>({product.numOfReviews} reviews)</span>
                        </div>
                        <div className="gap-2 flex"> <span className="text-[#fe5f1e]">&#x20B9;{product.price}</span>
                            <span className="text-gray-500">&#x20B9;<s>{product.price}</s></span></div>

                        <div>
                            <b>123</b> <span>Days</span>
                            <div className="my-2">
                                <span className="md:w-8 md:h-8 h-4 w-4 rounded-full p-1 md:p-2 text-white bg-[#fe5f1e]">03</span><b className="mx-1">:</b>
                                <span className="md:w-8 md:h-8 h-4 w-4 rounded-full p-1 md:p-2 text-white bg-[#fe5f1e]">34</span><b className="mx-1">:</b>
                                <span className="md:w-8 md:h-8 h-4 w-4 rounded-full p-1 p0 md:p-2 text-white bg-[#fe5f1e]">40</span>
                            </div>
                        </div>

                        <span className="font-semibold text-gray-600">Stock : {product.Stock}</span>
                    </div>

                </div>
            )}
        </>
    );
}

export default SpecialProductItems;
