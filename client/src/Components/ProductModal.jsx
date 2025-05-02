import React, { useState, useEffect } from 'react';

function ProductModal({ isOpen, onClose, onSave, initialData = {} }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setPrice(initialData.price || '');
      setImageUrl(initialData.imageUrl || '');
    }
  }, [initialData]);

  const handleSave = () => {
    const product = {
      name,
      price,
      imageUrl,
    };
    onSave(product);
  };

  if (!isOpen) return null;

  return (
    <div>
      <h3>{initialData ? 'Edit Product' : 'Add Product'}</h3>
      <div>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Image URL:
          <input
            type="text"
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
          />
        </label>
      </div>
      <div>
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default ProductModal;
