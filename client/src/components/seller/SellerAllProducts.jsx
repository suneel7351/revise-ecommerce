import { Button } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import "./seller.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-hot-toast";
import {
  deleteProduct,
  getAllProducts,
  updateStock,
} from "../../redux/seller/product";
function SellerAllProducts() {
  const updateStockDialogRef = useRef(null);
  const [id, setId] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newStock, setNewStock] = useState(0);
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.sellerProduct);

  const setOpenUpdateStockDialog = () => {
    updateStockDialogRef.current.showModal();
  };

  const closeStockModal = () => {
    updateStockDialogRef.current.close();
  };

  const deleteHandler = async (id) => {
    const response = await dispatch(deleteProduct(id));
    if (deleteProduct.fulfilled.match(response)) {
      toast.success(response.payload);
      dispatch(getAllProducts());
    } else if (deleteProduct.rejected.match(response)) {
      toast.success(response.payload);
    }
  };

  const columns = [
    {
      field: "ID",
      headerName: "Product ID",
      minWidth: 200,
      flex: 0.7,
    },
    {
      field: "NAME",
      headerName: "Product Name",
      flex: 1,
      minWidth: 300,
    },
    {
      field: "STOCK",
      headerName: "Stock",
      minWidth: 100,
      flex: 0.2,
      type: "number",
      renderCell: (params) => {
        return (
          <div className="flex gap-2 items-center"><span className="text-lg"> {params.row.STOCK}</span>
            <button
              onClick={() => {
                setSelectedProduct(params.row);
                setNewStock(params.row.STOCK);
                setOpenUpdateStockDialog();
              }}
              className="update-stock-btn"
            >
              <EditIcon onClick={() => setId(params.getValue(params.id, "ID"))} />
            </button>
          </div>
        );
      },

    },
    {
      field: "PRICE",
      headerName: "Price",
      minWidth: 150,
      flex: 0.3,
      type: "number",
    }, {
      field: "Manufacture",
      headerName: "Manufacture",
      minWidth: 150,
      flex: 0.3,
      type: "number",
    },
    {
      field: "ACTIONS",
      headerName: "Action",
      minWidth: 100,
      flex: 0.5,
      sortable: false,

      renderCell: (params) => {
        return (
          <div className="flex items-center gap-4 w-full mx-auto">
            <Link to={`/seller/product/${params.getValue(params.id, "ID")}`}>
              <EditIcon />
            </Link>{" "}
            <button
              onClick={() => deleteHandler(params.getValue(params.id, "ID"))}
              className={`btn px-4 pr-[5px] py-2 rounded hover:bg-blue-600 ${loading ? "loading" : ""
                }`}
            >
              {!loading && <DeleteIcon />}
            </button>
          </div>
        );
      },
    },
  ];
  const rows = [];

  products &&
    products.forEach((element) => {
      rows.push({
        id: element._id,
        ID: element._id,
        NAME: element.name,
        STOCK: element.Stock,
        PRICE: element.price,
        Manufacture: element.manufacturingCost
      });
    });

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const updateStockHandler = async () => {
    const response = await dispatch(updateStock({ id, stock: newStock }));

    if (updateStock.fulfilled.match(response)) {
      toast.success(response.payload);
      dispatch(getAllProducts());
      closeStockModal();
    } else if (updateStock.rejected.match(response)) {
      toast.error(response.payload);
    }
  };
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
        className={`main-container px-4`}
      >
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

      <dialog ref={updateStockDialogRef} className="w-full md:w-[50%] mx-auto ">
        <div className="flex gap-4 flex-col p-4">
          {" "}
          <h2 className="text-2xl text-gray-500 mb-2 text-center">
            Update Stock
          </h2>
          <div>
            <input
              type="number"
              placeholder="Enter new stock value"
              value={newStock}
              onChange={(e) => setNewStock(e.target.value)}
              className="py-1 w-full border rounded border-gray-100 shadow-sm px-4"
              required
            />
          </div>
          <div className="flex justify-between gap-4">
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={closeStockModal}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={updateStockHandler}
            >
              Update
            </Button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default SellerAllProducts;
