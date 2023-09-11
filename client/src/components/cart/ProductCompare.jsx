import React, { useEffect, useState } from "react";

function ProductCompare() {
  const [comparedProducts, setComparedProducts] = useState([]);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("compareProducts")) || [];
    setComparedProducts(storedProducts);
  }, []);

  const handleRemoveFromCompare = (productId) => {
    const updatedProducts = comparedProducts.filter((product) => product._id !== productId);
    setComparedProducts(updatedProducts);
    localStorage.setItem("compareProducts", JSON.stringify(updatedProducts));
  };

  return (
    <div className="min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">Compare Products</h2>
      {comparedProducts.length === 0 ? (
        <p>No products selected for comparison.</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {comparedProducts.map((product) => (
            <div className="bg-white py-4 border border-gray-100 shadow-sm rounded-lg" style={{ width: "274px" }} key={product._id}>
              <img
                src={product.images[0]?.url || "placeholder-image-url"}
                alt={product.name}
                className="mx-auto object-cover rounded-t-lg"
              />
              <div className="px-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">Price: &#x20B9;{product.price}</p>
                <p className="text-gray-600">Brand: {product.brand}</p>
                <p className="text-gray-600">Category: {product.category}</p>
                <p className={`text-lg font-semibold ${product.Stock > 0 ? "text-green-500" : "text-red-500"}`}>
                  {product.Stock > 0 ? `In Stock (${product.Stock})` : "Out of Stock"}
                </p>
                <button
                  className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => handleRemoveFromCompare(product._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductCompare;
