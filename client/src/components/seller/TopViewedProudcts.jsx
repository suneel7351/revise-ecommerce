import React from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid"; // Import DataGrid from MUI
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function TopViewedProducts({ products }) {
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
            field: "CATEGORY",
            headerName: "Category",
            flex: 0.5,
        },
        {
            field: "VIEW_COUNT",
            headerName: "View Count",
            flex: 0.5,
            type: "number",
        },
        {
            field: "ACTIONS",
            headerName: "Action",
            minWidth: 150,
            flex: 0.4,
            sortable: false,
            renderCell: (params) => {
                return (
                    <div className="flex items-center gap-2">
                        <Link to={`/product/${params.getValue(params.id, "ID")}`}>
                            <EditIcon />
                        </Link>
                        {/* Add other actions here */}
                    </div>
                );
            },
        },
    ];

    const rows = products.map((product) => ({
        id: product.id,
        ID: product.id,
        NAME: product.name,
        CATEGORY: product.category,
        VIEW_COUNT: product.viewCount,
    }));

    return (
        <div className="mt-12 rounded-lg shadow-sm hover:shadow-md bg-white p-4 border border-gray-100">
            <h2 className="font-bold text-xl mb-4">Top Viewed Products</h2>
            <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                    autoHeight
                />
            </div>
        </div>
    );
}

export default TopViewedProducts;
