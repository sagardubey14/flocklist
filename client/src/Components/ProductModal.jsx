import React, { useState, useEffect } from "react";

function ProductModal({
  user,
  selectedList,
  isOpen,
  onClose,
  onSave,
  initialData = {},
}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setPrice(initialData.price || "");
      setImageUrl(initialData.image || "");
    }
  }, [initialData]);

  const handleSave = () => {
    let product;
    initialData.id
      ? (product = {
          id: initialData.id,
          name,
          price,
          image: imageUrl,
          addedBy: initialData.addedBy,
        })
      : (product = {
          id: Date.now(),
          name,
          price,
          image: imageUrl,
          addedBy: user,
        });
    initialData.id
      ? onSave(product, selectedList)
      : onSave(product, selectedList, "new");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.7)]">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6 border border-[#E5E7EB]">
        <h3 className="text-xl font-semibold mb-4 text-[#111827]">
          {initialData && Object.keys(initialData).length > 0
            ? "Edit Product"
            : "Add Product"}
        </h3>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-[#111827]">
            Name:
          </label>
          <input
            type="text"
            className="w-full border border-[#E5E7EB] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-[#111827]">
            Price:
          </label>
          <input
            type="number"
            className="w-full border border-[#E5E7EB] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-[#111827]">
            Image URL:
          </label>
          <input
            type="text"
            className="w-full border border-[#E5E7EB] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-[#6B7280]">
            Creator: {initialData.addedBy ? initialData.addedBy : user}
          </label>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 bg-[#6366F1] text-white rounded hover:bg-indigo-600 transition"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="px-4 py-2 bg-[#E5E7EB] text-[#374151] rounded hover:bg-[#D1D5DB] transition"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
