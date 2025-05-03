import React from "react";

function ProductActions({ onEdit, onDelete }) {
  const handleEditClick = () => {
    alert("Edit of Product");
    // onEdit();
  };

  const handleDeleteClick = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmed) {
      alert("Delete of Product");
      // onDelete();
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleEditClick}
        className="px-3 py-1.5 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600 transition"
      >
        Edit Product
      </button>
      <button
        onClick={handleDeleteClick}
        className="px-3 py-1.5 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
      >
        Delete Product
      </button>
    </div>
  );
}

export default ProductActions;
