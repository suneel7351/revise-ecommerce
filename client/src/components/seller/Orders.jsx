import { Button } from "@mui/material";
import React, { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import MetaData from '../../components/Metadata'
import {
    deleteOrder,
    getAllOrders,
    clearMessage,
    clearError,
} from "../../redux/admin/orderSlice";
import order, { getSellerAllOrders } from "../../redux/seller/order";
function Orders() {
    const dispatch = useDispatch();
    const { loading, message, error } = useSelector(
        (state) => state.adminOrder
    );
    const { orders } = useSelector(
        (state) => state.sellerOrder
    );
    const deleteHandler = (id) => {
        dispatch(deleteOrder(id));
    };
    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Delivered"
                    ? "greenColor"
                    : "redColor";
            },
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 150,
            flex: 0.3,
        },
        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 270,
            flex: 0.5,
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
                        <Link to={`/seller/order/${params.getValue(params.id, "id")}`}>
                            <EditIcon />
                        </Link>
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
    orders &&
        orders.forEach((element) => {
            rows.push({
                id: element._id,
                status: element.orderStatus,
                itemsQty: element.orderItems.length,
                amount: element.totalPrice,
            });
        });

    useEffect(() => {
        dispatch(getSellerAllOrders());
        if (message) {
            toast.success(message);
            dispatch(clearMessage());
        }
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
    }, [dispatch, message, error]);

   
    return (
        <>
            <MetaData title="All Orders-seller" />
            {loading ? (
                <p>Loading</p>
            ) : (
                <div className="admin-container ">
                    <div className="md:px-6 px-4  border-r border-gray-100 bg-white">
                        <Sidebar />
                    </div>
                    <div className=" main-container w-full px-4 bg-[#eee] pt-4 flex-[7_7_0]">
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
                </div>
            )}
        </>
    );
}

export default Orders;
