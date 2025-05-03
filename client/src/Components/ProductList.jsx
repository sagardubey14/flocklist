import React, { useEffect, useState } from "react";

function ProductList({ products, onAddProduct, setMockProductInitialData }) {
  const [focusedId, setFocusedId] = useState(null);

  useEffect(()=>{  
    setFocusedId(null)
  },[products[0]])
  
  const handleFocus = (id) => {
    if (focusedId !== id) {
      setFocusedId(id);
    }
  };

  const handleClose = () => {
    setFocusedId(null);
  };

  const handleEditClick = (product) => {
    setMockProductInitialData(product);
    onAddProduct();
  };

  const handleDeleteClick = (product) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${product.name}?`
    );
    if (confirmed) {
      alert(`Delete of Product: ${product.name}`);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <button
          onClick={()=>{
            setMockProductInitialData({});
            onAddProduct();
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Add Product
        </button>
      </div>

      {products.length === 0 ? (
        <div className="text-gray-500">No products in this wishlist.</div>
      ) : (
        <div className="flex flex-wrap -m-2">
          {products.map((product) => {
            const isFocused = product.id === focusedId;

            return (
              <div
                key={product.id}
                className={`p-2 transition-all duration-300 ease-in-out ${
                  isFocused ? "w-full sm:w-full" : "w-full sm:w-1/2 lg:w-1/3"
                }`}
              >
                <div
                  onClick={() => (!isFocused ? handleFocus(product.id) : null)}
                  className={`relative border rounded shadow-sm cursor-pointer transition-all duration-500 ease-in-out overflow-hidden
                    ${
                      isFocused
                        ? "bg-blue-50 border-blue-500 scale-[1.05] p-6"
                        : "hover:shadow-md p-3"
                    }
                    flex flex-col sm:block
                  `}
                >
                  {isFocused && (
                    <button
                      onClick={handleClose}
                      className="absolute top-2 right-4 text-gray-500 hover:text-red-500 text-xl font-bold z-10"
                    >
                      ×
                    </button>
                  )}

                  <div
                    className={`flex sm:block items-center ${
                      isFocused ? "flex-col sm:block" : "flex-row"
                    }`}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className={`object-cover rounded ${
                        isFocused
                          ? "w-24 h-24 mb-4"
                          : "w-16 h-16 sm:w-24 sm:h-24 mr-4"
                      }`}
                    />

                    <div>
                      <div className="font-semibold text-base sm:text-lg">
                        Name: {product.name}
                      </div>
                      <div className="text-sm sm:text-base">
                        Price: ${product.price}
                      </div>
                      {isFocused && (
                        <div className="text-sm text-gray-500">
                          Added by: {product.addedBy}
                        </div>
                      )}
                    </div>
                  </div>

                  {isFocused && (
                    <div className="mt-4 flex justify-center sm:absolute sm:bottom-4 sm:right-4 gap-2">
                      <button
                        onClick={() => handleEditClick(product)}
                        className="px-3 py-1.5 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600 transition"
                      >
                        Edit Product
                      </button>
                      <button
                        onClick={() => handleDeleteClick(product)}
                        className="px-3 py-1.5 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
                      >
                        Delete Product
                      </button>
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
