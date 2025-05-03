import React, { useEffect, useState } from "react";

function ProductList({
  wishList,
  selectedList,
  onAddProduct,
  setMockProductInitialData,
  onDelete,
}) {
  const [focusedId, setFocusedId] = useState(null);
  const products = wishList.find((item) => item.id === selectedList).products;

  useEffect(() => {
    setFocusedId(null);
  }, [products[0]]);

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
    onDelete(product.id, selectedList);
    setFocusedId(null);
  };

  return (
    <div className="p-4 bg-[#F9FAFB] text-[#111827]">
      <div className="mb-4">
        <button
          onClick={() => {
            setMockProductInitialData({});
            onAddProduct();
          }}
          className="px-4 py-2 bg-[#6366F1] text-white rounded hover:bg-indigo-600 transition"
        >
          Add Product
        </button>
      </div>

      {products.length === 0 ? (
        <div className="text-[#6B7280]">No products in this wishlist.</div>
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
                    ? "bg-indigo-50 border-[#6366F1] scale-[1.05] p-6"
                    : "hover:shadow-md p-3 border-[#E5E7EB] bg-white"
                }
                flex flex-col sm:block
              `}
                >
                  {isFocused && (
                    <button
                      onClick={handleClose}
                      className="absolute top-2 right-4 text-[#6B7280] hover:text-[#EF4444] text-xl font-bold z-10"
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
                        <div className="text-sm text-[#6B7280]">
                          Added by: {product.addedBy}
                        </div>
                      )}
                    </div>
                  </div>

                  {isFocused && (
                    <div className="mt-4 flex justify-center sm:absolute sm:bottom-4 sm:right-4 gap-2">
                      <button
                        onClick={() => handleEditClick(product)}
                        className="px-3 py-1.5 bg-[#10B981] text-white text-sm rounded hover:bg-emerald-600 transition"
                      >
                        Edit Product
                      </button>
                      <button
                        onClick={() => handleDeleteClick(product)}
                        className="px-3 py-1.5 bg-[#EF4444] text-white text-sm rounded hover:bg-red-600 transition"
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
