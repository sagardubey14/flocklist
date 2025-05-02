import React, { useState } from "react";
import WishList from "./WishList";
import WishlistModal from "./WishlistModal";
import WishlistHeader from "./WishListHeader";
import ProductList from "./ProductList";

const wishListItems = [
  "New Laptop",
  "Vacation to Japan",
  "Noise-Cancelling Headphones",
  "Kindle E-reader",
  "Mountain Bike",
  "Gaming Console",
  "Smartwatch",
  "Bookshelf",
  "Digital Camera",
  "Coffee Maker",
];

const mockProducts = [
    {
      id: 1,
      name: 'Wireless Mouse',
      price: 25.99,
      image: 'https://via.placeholder.com/100',
      addedBy: 'Alice',
    },
    {
      id: 2,
      name: 'Bluetooth Headphones',
      price: 59.99,
      image: 'https://via.placeholder.com/100',
      addedBy: 'Bob',
    },
    {
      id: 3,
      name: 'Laptop Stand',
      price: 35.99,
      image: 'https://via.placeholder.com/100',
      addedBy: 'Charlie',
    },
    {
      id: 4,
      name: 'USB-C Charger',
      price: 15.99,
      image: 'https://via.placeholder.com/100',
      addedBy: 'David',
    },
    {
      id: 5,
      name: 'Smartphone Case',
      price: 19.99,
      image: 'https://via.placeholder.com/100',
      addedBy: 'Eva',
    },
  ];
  

function MainList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedList, setSelectedList] = useState(null);
  const mockInitialData = {
    title: "",
    eventDate: "",
    isShared: false,
    invitedFriends: [],
  };

  const mockAllFriends = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
    { id: 4, name: "David" },
    { id: 5, name: "Eva" },
  ];

  const handleSave = (data) => {
    console.log("Wishlist Saved:", data);
    setIsModalOpen(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex justify-between">
      <div className="w-1/2 p-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          Create Wishlist
        </button>

        <WishlistModal
          isOpen={isModalOpen}
          onClose={handleClose}
          onSave={handleSave}
          initialData={mockInitialData}
          allFriends={mockAllFriends}
        />
        <WishList
          wishListItems={wishListItems}
          setSelectedList={setSelectedList}
        />
      </div>

      <div className="w-1/2 p-4">
        {selectedList && (<>
          <WishlistHeader
            title={wishListItems[selectedList]}
            eventDate="12/02/2002"
            isShared={false}
            onEdit={() => {
              alert("edit");
            }}
            onDelete={() => {
              alert("delete");
            }}
          />
          <ProductList  products={mockProducts} layout='list' onAddProduct={()=>alert('addProduct')} />
          </>
        )}
      </div>
    </div>
  );
}

export default MainList;
