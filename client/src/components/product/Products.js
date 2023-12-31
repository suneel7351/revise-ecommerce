import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/product/productSlice";
import Metadata from "../Metadata";
import ProductItem from "./ProductItem";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Pagination,
  Rating,
  Slider,
} from "@mui/material";
import Loader from "../Loader";
import { getAllCategoriesName } from "../../redux/superAdmin/admin";
const Products = () => {
  const [width, setWidth] = useState(window.screen.width);
  const [category, setCategory] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("keyword");
  const dispatch = useDispatch();
  const {
    data,
    loading,
    productCount,
    resultPerPage,
    filteredProducts,
  } = useSelector((state) => state.products);
  console.log(productCount,filteredProducts,resultPerPage);
  const { categories } = useSelector((state) => state.superAdmin)
  const [page, setPage] = useState(1);
  const [price, setPrice] = useState([0, 10000000000000]);
  const [ratingValue, setRatingValue] = useState(0);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handlePageChange = (event, value) => {
    setPage(value);
    dispatch(getAllProducts({
      keyword: keyword ? keyword : "",
      page: page ? page : 1,
      category: category ? category : "",
      price,
      ratingValue: ratingValue ? ratingValue : 0,
    }))
  };
  const handlePriceChange = (e, newPrice) => {
    setPrice(newPrice);
    dispatch(getAllProducts({
      keyword: keyword ? keyword : "",
      page: page ? page : 1,
      category: category ? category : "",
      price,
      ratingValue: ratingValue ? ratingValue : 0,
    }))

  };
  const allCategoryHandler = () => {
    setCategory("")
    setPage(1)
    setRatingValue(0)
    dispatch(
      getAllProducts({
        keyword: "",
        page: 1,
        category: "",
        price: [0, 1000000000000000000],
        ratingValue: 0,
      })
    );
  };

  const handleCategoryClick = (item) => {
    setCategory(item);
    dispatch(getAllProducts({
      keyword: keyword ? keyword : "",
      page: page ? page : 1,
      category: category ? category : "",
      price,
      ratingValue: ratingValue ? ratingValue : 0,
    }))
  };




  useEffect(() => {
    dispatch(
      getAllProducts({
        keyword: keyword ? keyword : "",
        page: page ? page : 1,
        category: category ? category : "",
        price,
        ratingValue: ratingValue ? ratingValue : 0,
      })
    );
  }, [keyword, category, page, price, ratingValue]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });

    return () => {
      window.removeEventListener("resize", () => {
        setWidth(window.innerWidth);
      });
    };
  });

  useEffect(() => {
    dispatch(getAllCategoriesName())
  }, [])



  return (
    <>
      <>
        {" "}
        <Metadata title={"eccomerce-products"} />
        <div
          className={width < 600 ? "flex flex-col gap-2 p-2" : "flex gap-2 h-[88vh]"}
        >
          <Button
            variant="contained"
            style={width < 600 ? {} : { display: "none" }}
            onClick={handleClickOpen}
          >
            Filter Products
          </Button>




          <div
            className={
              width < 600
                ? "hidden"
                : " flex-[1_1_0] bg-white border border-gray-50 shadow-sm bg-white4 py-4"
            }
          >
            <h1 className="text-slate-600 text-xl pl-4 font-bold border-b border-slate-200 pb-3">
              Shop By Categories
            </h1>
            <div className="px-4">
              <ul className="flex flex-col gap-2 my-2">
                <li className="flex items-center">
                  <button
                    className="text-slate-600 cursor-pointer"
                    onClick={allCategoryHandler}
                  >
                    All Products
                  </button>
                </li>
                {categories?.map((item, index) => {
                  return <li className="flex items-center" key={index + "index"}>
                    <button
                      className="text-gray-600 "
                      onClick={() => handleCategoryClick(item)}
                    >
                      {item}
                    </button>
                  </li>

                })}
              </ul>
            </div>{" "}
            <div className="px-4">
              <small className="font-bold">PRICE</small>
              <Slider
                style={{ marginTop: "10px" }}
                getAriaLabel={() => "Minimum distance"}
                value={price}
                onChange={handlePriceChange}
                min={0}
                max={1000000}
                aria-labelledby="range-slider"
                valueLabelDisplay="auto"
                disableSwap
                size="small"
              />
            </div>
            <div className="px-4 ">
              <fieldset className="border border-slate-200 shadow-md px-4">
                <legend className="px-1 font-bold"> Ratings</legend>
                <Rating
                  value={ratingValue}
                  onChange={(event, newValue) => {
                    setRatingValue(newValue)
                    dispatch(getAllProducts({
                      keyword: keyword ? keyword : "",
                      page: page ? page : 1,
                      category: category ? category : "",
                      price,
                      ratingValue: ratingValue,
                    }))
                  }}
                  style={{ color: "#fe5f1e" }}
                  size="large"
                />
              </fieldset>
            </div>
          </div>
          <div
            className={
              width < 600
                ? "flex flex-col gap-6 items-center"
                : "flex-[4_4_0] overflow-y-auto py-4 flex flex-col gap-6 items-center"
            }
          >
            {" "}
            <div className="flex items-center gap-4 px-2 flex-wrap justify-center  py-4  w-full">
              {loading ? (
                <Loader />
              ) : (
                <>
                  {data && data.length > 0 ? (
                    data.map((product) => {
                      return (
                        <ProductItem key={product._id} product={product} />
                      );
                    })
                  ) : (
                    <h1 className="text-2xl text-slate-500">
                      No Product Found.
                    </h1>
                  )}
                </>
              )}
            </div>
            {/* {productCount > resultPerPage && */}
              {/* filteredProducts >= resultPerPage &&  */}
              {/* ( */}
                <Pagination
                  // style={{ backgroundColor: "#fff", width: "auto" }}
                  count={Math.ceil(productCount / Number(resultPerPage))}
                  variant="outlined"
                  shape="rounded"
                  color="primary"
                  page={page}
                  onChange={handlePageChange}
                />
              {/* )} */}
          </div>
        </div>
        <Dialog fullWidth onClose={handleClose} open={open}>
          <DialogContent style={{ padding: "0px" }}>
            <h1 className="text-slate-600 text-xl pl-4 font-bold border-b border-slate-200 pb-3">
              Filters
            </h1>
            <div className="px-4">
              <small className="font-bold">CATEGORIES</small>
              <ul className="flex flex-col gap-2 my-2">
                <li className="flex items-center">
                  <ChevronLeftIcon style={{ color: "#475569" }} />{" "}
                  <span
                    className="text-slate-600 cursor-pointer"
                    onClick={() => setCategory("")}
                  >
                    All Products
                  </span>
                </li>
                {categories?.map((item, index) => {
                  return (
                    <li className="flex items-center" key={index}>
                      <ChevronLeftIcon style={{ color: "#475569" }} />{" "}
                      <span
                        className="text-slate-600 cursor-pointer"
                        onClick={() => setCategory(item)}
                      >
                        {item}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>{" "}
            <div className="px-4">
              <small className="font-bold">PRICE</small>
              <Slider
                style={{ marginTop: "10px" }}
                getAriaLabel={() => "Minimum distance"}
                value={price}
                onChange={handlePriceChange}
                min={0}
                max={100000}
                aria-labelledby="range-slider"
                valueLabelDisplay="auto"
                disableSwap
                size="small"
              />
            </div>
            <div className="px-4 ">
              <fieldset className="border border-slate-200 shadow-md px-4]">
                <legend className="px-1 font-bold"> Ratings</legend>
                <Rating
                  value={ratingValue}
                  onChange={(event, newValue) => {
                    setRatingValue(newValue);
                  }}
                  style={{ color: "#fe5f1e" }}
                  size="large"
                />
              </fieldset>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="contained">
              Apply Filter
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </>
  );
};

export default Products;
