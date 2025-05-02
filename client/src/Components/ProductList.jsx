import React from 'react';

function ProductList({ products, layout = 'grid', onAddProduct }) {
  return (
    <div>
      <div>
        <button onClick={onAddProduct}>Add Product</button>
      </div>
      <div>
        {products.length === 0 ? (
          <div>No products in this wishlist.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: layout === 'grid' ? 'row' : 'column', flexWrap: 'wrap' }}>
            {products.map((product, index) => (
              <div key={index} style={{ margin: '10px', border: '1px solid black', padding: '10px' }}>
                <img src={product.image} alt={product.name} width="100" height="100" />
                <div>Name: {product.name}</div>
                <div>Price: ${product.price}</div>
                <div>Added by: {product.addedBy}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;
