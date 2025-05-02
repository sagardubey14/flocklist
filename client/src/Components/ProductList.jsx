import React, { useState } from "react";
import ProductActions from "./ProductActions";

function ProductList({ products, layout = "grid", onAddProduct }) {
  const [focusedIndex, setFocusedIndex] = useState(null);

  const handleFocus = (index) => {
    if (focusedIndex !== index) {
      setFocusedIndex(index);
    }
  };

  const handleClose = () => {
    setFocusedIndex(null);
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <button
          onClick={onAddProduct}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Add Product
        </button>
      </div>

      {products.length === 0 ? (
        <div className="text-gray-500">No products in this wishlist.</div>
      ) : (
        <div className="flex flex-wrap -m-2">
          {products.map((product, index) => {
            const isFocused = index === focusedIndex;
            return (
              <div
                key={index}
                className={`p-2 transition-all duration-300 ease-in-out ${
                  isFocused ? "w-full" : "w-full sm:w-1/2 lg:w-1/3"
                }`}
              >
                <div
                  onClick={() => !isFocused && handleFocus(index)}
                  className={`relative h-full border rounded p-4 shadow-sm transition-all duration-300 ${
                    isFocused
                      ? "bg-blue-50 border-blue-500 scale-[1.02] shadow-lg"
                      : "hover:shadow-md cursor-pointer"
                  }`}
                >
                  {isFocused && (
                    <button
                      onClick={handleClose}
                      className="absolute top-2 right-4 text-gray-500 hover:text-red-500 text-xl font-bold z-10"
                    >
                      x
                    </button>
                  )}

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-24 h-24 object-cover mb-4"
                  />
                  <div className="font-semibold">Name: {product.name}</div>
                  <div>Price: ${product.price}</div>
                  <div className="text-sm text-gray-500">
                    Added by: {product.addedBy}
                  </div>
                  {isFocused && (
                    <div className="absolute bottom-4 right-4">
                      <ProductActions />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ProductList;
