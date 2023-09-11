import React from "react";

const ProductsList = ({ products, editProduct, deleteProduct }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 mt-4">
      <h2 className="text-lg font-semibold mb-2">Products Management</h2>
      <table className="min-w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>&#8377; {product.price}</td>
              <td>{product.Stock}</td>
              <td>
                <button
                  className="text-blue-500"
                  onClick={() => editProduct(product._id)}
                >
                  Edit
                </button>{" "}
                |{" "}
                <button
                  className="text-red-500"
                  onClick={() => deleteProduct(product._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsList;
