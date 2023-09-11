import { Button } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-hot-toast";
import { deleteCategory, getAllCategories } from "../../redux/superAdmin/admin";

function AllCategories() {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.superAdmin);

  const deleteHandler = async (id) => {
    const response = await dispatch(deleteCategory(id));
    if (deleteCategory.fulfilled.match(response)) {
      toast.success(response.payload);
      dispatch(getAllCategories());
    } else if (deleteCategory.rejected.match(response)) {
      toast.success(response.payload);
    }
  };

  const columns = [
    {
      field: "ID",
      headerName: "Category ID",
      minWidth: 200,
      flex: 0.7,
    },
    {
      field: "NAME",
      headerName: "Category Name",
      flex: 1,
      minWidth: 300,
    }, 
    {
        field: "FIELDS",
        headerName: "Fields Name",
        flex: 1,
        minWidth: 300,
        renderCell: (params) => {
          const fields = params.getValue(params.id, "FIELDS");
    
          if (Array.isArray(fields)) {
            return (
              <select readOnly className="bg-gray-50 shadow-sm p-2">
                {fields.map((field, index) => (
                  <option key={index} value={field} >
                    {field.fieldName}
                  </option>
                ))}
              </select>
            );
          }
      
          return null; // Handle the case when 'fields' is not an array
        },
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
            <Link to={`/admin/category/${params.getValue(params.id, "ID")}`}>
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

  categories &&
    categories.forEach((element) => {
      rows.push({
        id: element._id,
        ID: element._id,
        NAME: element.name,
        FIELDS:element.fields
      });
    });

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);


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

     
    </div>
  );
}

export default AllCategories;
