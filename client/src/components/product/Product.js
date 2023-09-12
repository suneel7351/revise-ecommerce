import React, { useEffect, useState } from "react";
import Metadata from "../Metadata";
import { useDispatch, useSelector } from "react-redux";
import {
  getSimilarProduct,
  getSingleProduct
} from "../../redux/product/productSlice";
import { useParams } from "react-router-dom";
import { toast } from 'react-hot-toast'
import "./product.css";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ReviewCard from "./ReviewCard";
import { DiGitCompare } from 'react-icons/di'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
} from "@mui/material";

import ProductItem from "./ProductItem";
import { addToCart } from "../../redux/product/addToCart";
import { productReview } from "../../redux/seller/product";
import { getAllReviews } from "../../redux/seller/review";
import AddToWishlist from "./AddToWishlist";
function Product() {
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, similarProducts } = useSelector(
    (state) => state.products
  );
  const isProductInCompare = () => {
    const storedProducts = JSON.parse(localStorage.getItem("compareProducts")) || [];
    return storedProducts.some((p) => p?._id === product?._id);
  };

  const [compareButtonColor, setCompareButtonColor] = useState(
    isProductInCompare()
  );
  const [URL, setURL] = useState("")
  const decrease = () => {
    if (quantity === 1) {
      return;
    }
    const qty = quantity - 1;
    setQuantity(qty);
  };
  const increase = () => {
    if (product.Stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const handleAddToCart = (cart) => {
    dispatch(addToCart(cart));
  };
  const dialogToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };
  const reviewHandler = async (e) => {
    e.preventDefault();
    const res = await dispatch(
      productReview({
        productId: id,
        comment,
        rating,
      })
    );

    if (productReview.fulfilled.match(res)) {
      toast.success(res.payload)
    } else if (productReview.rejected.match(res)) {
      toast.error(res.payload)
    }

    setOpen(false);
  };


  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(getSimilarProduct(id))
  }, [id, dispatch])

  useEffect(() => {
    dispatch(getAllReviews(id))
  }, [id])





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
      }else{
        toast.error("Atmost 4 product can added for compare at a time.")
      }
    }

    localStorage.setItem("compareProducts", JSON.stringify(storedProducts));
  };



  

  return (
    <div className="py-8">
      {" "}
      {loading ? (
        <span>"Loading"</span>
      ) : (
        <>
          <Metadata title={product && product.name} />
          {product && (
            <>
              {" "}
              <div className="bg-white border border-gray-50 shadow-sm container mx-auto flex gap-8 flex-wrap justify-center p-4">
                <div className="flex-1 flex flex-col gap-4 border border-gray-100 p-4">
                  <div className="flex flex-col gap-6">
                    <div className="p-4 bg-[#e9edf0] mx-auto rounded-lg">
                      {URL ? <img
                        src={URL}
                        alt={"product"}
                        className="h-[400px] mx-auto"
                      /> :
                        <img
                          src={product.images &&
                            product.images.length > 0 &&
                            product.images[0].url}
                          alt={"product"}
                          className="w-[80%] mx-auto"
                        />
                      }
                    </div>
                    <div className="flex gap-2 justify-center">  {product.images &&
                      product.images.length > 0 &&
                      product.images.map((item, index) => (
                        <div onMouseEnter={() => setURL(item.url)} className="bg-[#e9edf0] h-[60px] cursor-pointer border border-slate-100 w-[60px] p-2 rounded" key={index}>
                          <img
                            src={item.url}
                            alt={product.name}

                            className="w-full h-full object-contain"
                          />
                        </div>
                      ))}</div>
                  </div>

                </div>
                <div className="flex-1 p-8 flex flex-col md:items-start items-center ">
                  <h1 className=" font-bold text-xl border-b border-gray-100 pb-4">
                    {product.name}
                  </h1>

                  <div className="w-full py-4 flex gap-4 flex-col border-b border-gray-100">
                    <h2 className="text-xl font-bold">
                      &#x20B9;{product.price}
                    </h2>

                    <div className="flex gap-4">
                      <Rating
                        value={product?.ratings}
                        readOnly
                        precision={0.5}
                        style={{ color: "#fe5f1e" }}
                        contentEditable={false}
                      />
                      <span className="px-1">( {product?.numOfReviews} Reviews )  </span>
                    </div>

                    <h2 className="cursor-pointer bg-gray-50 hover:bg-gray-100 shadow-sm px-4 py-1 w-[145px] border-gray-100 border text-gray-600" onClick={dialogToggle}>
                      Write a Review
                    </h2>
                  </div>{" "}


                  <div className="border-b border-gray-100 py-4 w-full" >
                    <label className="font-bold">Brand : </label> <span>Apple</span>
                  </div>


                  <div className="w-full py-4 border-b border-gray-100">
                    <label className="font-bold">Availability : </label>
                    <span
                      className={
                        product.Stock > 0 ? "text-green-500" : "text-red-500"
                      }
                    >
                      {" "}
                      {product.Stock > 0
                        ? `In Stock(${product.Stock})`
                        : "Out of Stock"}
                    </span>
                  </div>


                  <div className="border-b border-gray-100 py-4 w-full" >
                    <label className="font-bold">Category : </label> <span>
                      {product?.category}
                    </span>
                  </div>

                  <div className="border-b border-gray-100 pt-4 pb-6 w-full flex flex-col gap-4">
                    <div className="flex gap-2 items-center ">
                      <label className="font-bold">Quantity : </label>
                      <div className="flex shadow-sm border border-gray-100 bg-gray-50 items-center justify-center numeric-input-div text-gray-600  px-1 py-1 my-3 rounded">
                        <span
                          onClick={decrease}
                          className="flex items-center justify-center text-xl w-8 cursor-pointer font-bold"
                        >
                          <RemoveIcon />
                        </span>
                        <input
                          type="number"
                          name=""
                          id=""
                          readOnly
                          className="focus:ring-0 outline-none w-6 text-center"
                          value={quantity}
                        />
                        <span
                          onClick={increase}
                          className="flex items-center justify-center text-xl w-8 cursor-pointer font-bold"
                        >
                          <AddIcon />
                        </span>
                      </div>
                      <button
                        className="btn shadow-sm px-6 rounded"
                        onClick={() => handleAddToCart({
                          product: product._id,
                          name: product.name,
                          image: product.images[0] ? product.images[0].url : "suneel",
                          price: product.price,
                          quantity: quantity,
                          Stock: product.Stock,
                        })}
                        disabled={product.Stock < 1 ? true : false}
                      >
                        Add to Cart
                      </button>
                    </div>

                    <div className="flex gap-4 ">
                      <div className="flex items-center gap-2 shadow-sm border border-gray-100 bg-gray-50 py-1 px-4 cursor-pointer">
                        <AddToWishlist product={product && product} />
                      </div>
                      <div onClick={handleAddToCompare} className="flex w-[205px] items-center gap-2 shadow-sm border border-gray-100 bg-gray-50 py-1 px-4 cursor-pointer"> <DiGitCompare fontSize={"18px"}  style={compareButtonColor ? { color: "#fe5f1e" } : {}} /> {compareButtonColor === true ? <span>Added To Compare</span> : <span>Add To Compare</span>}



                      </div>
                    </div>

                  </div>

                </div>

              </div>
              <div className="container mx-auto mt-8">
                <h1 className="text-3xl mb-4 font-bold">Description</h1>
                <div className="bg-white border border-gray-50 shadow-sm  flex gap-8 flex-wrap justify-center p-4">

                  <p className="text-bold mb-4">
                    {product?.description}
                  </p>
                </div>
              </div>



              <div className="container mx-auto mt-8">
                <h1 className="text-3xl mb-4 font-bold">Specifications</h1>
                <div className="bg-white border border-gray-50 gap-8 shadow-sm p-4 flex flex-col gap-8">
                  {product?.otherFields?.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-row items-center justify-between"
                    >
                      <span className="text-gray-600 font-semibold w-1/3">
                        {item.fieldName}
                      </span>
                      <span className="w-2/3">{item.value ? item.value : "N/A"}</span>
                    </div>
                  ))}
                </div>
              </div>




              {
                product.reviews &&
                product.reviews[0] &&
                product.reviews.length > 0 && <div className="container mx-auto mt-8">
                  <h1 className="text-3xl mb-4 font-bold">Reviews & Ratings</h1>
                  <div className="bg-white border border-gray-50 shadow-sm overflow-x-auto w-full  flex gap-8 flex-wrap justify-center p-4">

                    <div className="flex gap-8 mt-8 items-center justify-center overflow-x-scroll md:container mx-auto overflow-y-hidden px-4 md:px-0">
                      {product.reviews &&
                        product.reviews[0] &&
                        product.reviews.length > 0 ? (
                        product.reviews.map((rev) => {
                          return <ReviewCard review={rev} key={rev._id} />;
                        })
                      ) : (
                        <h1 className="text-4xl text-center text-slate-600 my-8">
                          Not Review Yet...
                        </h1>
                      )}
                    </div>
                  </div>

                </div>
              }




              {
                similarProducts && similarProducts.length > 0 && <div className="container mx-auto mt-8"> <h1 className="text-left text-4xl text-slate-600">Similar Products</h1>
                  <div className=" flex mt-8 flex-wrap justify-center ">
                    {
                      similarProducts && similarProducts.length > 0 && similarProducts.map((product) => {
                        return <ProductItem key={product._id} product={product} />
                      })
                    }

                  </div></div>
              }
              <Dialog open={open} onClose={dialogToggle}>
                <DialogTitle>Submit Review</DialogTitle>
                <form onSubmit={reviewHandler}>
                  <DialogContent>
                    <div className="flex flex-col gap-4 px-4">
                      {" "}
                      <Rating
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        size="large"
                        precision={0.5}
                      />
                      <textarea
                        className="outline-none focus:ring-0 border border-slate-100 shadow-md p-2"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Leave comment..."
                        required
                        rows={4}
                        cols={40}
                      ></textarea>
                    </div>
                  </DialogContent>
                  <DialogActions style={{ marginBottom: "10px" }}>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "red" }}
                      onClick={dialogToggle}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" variant="contained">
                      Submit
                    </Button>
                  </DialogActions>
                </form>
              </Dialog>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Product;
