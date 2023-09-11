import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import StartIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../Metadata";
import { deleteReview, getAllReviews } from "../../redux/seller/review";

function SellerReviews() {
  const dispatch = useDispatch();
  const [productId, setProductId] = useState("");
  const { reviews } = useSelector((state) => state.sellerReviews);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };
  const deleteHandler = (reviewId) => {
    dispatch(deleteReview({ productId, reviewId }));
  };

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 300, flex: 1 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "comment",
      headerName: "Comment",
      type: "number",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 100,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "rating") <= 3.5
          ? "redColor"
          : "greenColor";
      },
    },
    {
      field: "ACTIONS",
      headerName: "Action",
      minWidth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={() => deleteHandler(params.getValue(params.id, "id"))}
            >
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];
  const rows = [];

  reviews &&
    reviews.forEach((element) => {
      rows.push({
        id: element._id,
        name: element.name,
        comment: element.comment,
        rating: element.rating,
      });
    });

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }
  
  }, [dispatch, productId]);

  return (
    <>
      <MetaData title="product reviews - admin" />
      <div className="admin-container">
        <div className="md:px-6 px-4 border-r border-gray-100 shadow">
          <Sidebar />
        </div>
        <div className="main-container pt-4 pl-1 bg-gray-50">
          <form
            onSubmit={submitHandler}
            className="md:w-[50%] w-[95%] mt-8 mx-auto border border-gray-100 bg-white  shadow-sm md:p-8 p-8"
          >
            <h1 className="text-2xl text-slate-700 text-center">
              Get All Reviews
            </h1>
            <div className="input-div">
              <StartIcon />
              <input
                required
                type="text"
                placeholder="Enter Product Id"
                onChange={(e) => setProductId(e.target.value)}
                value={productId}
              />
            </div>
            <Button
              variant="contained"
              style={{ backgroundColor: "#fe5f1e" }}
              type="submit"
            >
              Get Reviews
            </Button>
          </form>

          {reviews && reviews.length > 0 ? (
            <div className="w-[98%] mx-auto mt-4">
              {" "}
              <DataGrid
                className="myOrdersTable w-full"
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                disableSelectionOnClick
                editMode="false"
                autoHeight
              />
            </div>
          ) : (
            <p className="text-center text-3xl text-slate-700 mt-4">
              No Reviews Yet...
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default SellerReviews;
