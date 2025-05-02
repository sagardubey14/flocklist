import React from 'react';

function ProductActions({ onEdit, onDelete }) {
  const handleEditClick = () => {
    // Call the provided edit handler
    onEdit();
  };

  const handleDeleteClick = () => {
    const confirmed = window.confirm('Are you sure you want to delete this product?');
    if (confirmed) {
      onDelete();
    }
  };

  return (
    <div>
      <button onClick={handleEditClick}>Edit Product</button>
      <button onClick={handleDeleteClick}>Delete Product</button>
    </div>
  );
}

export default ProductActions;
