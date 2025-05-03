import React, { useEffect, useState } from "react";
import WishList from "./WishList";
import WishlistModal from "./WishlistModal";
import WishlistHeader from "./WishListHeader";
import ProductList from "./ProductList";
import ProductModal from "./ProductModal";

// Dummy Data
const dummyWishlists = [
  {
    id: 1,
    title: "New Laptop",
    dateCreated: "2024-11-01",
    isShared: true,
    sharedWith: [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ],
    products: [
      {
        id: 1,
        name: "Wireless Mouse",
        price: 25.99,
        image: "./icons8-list-32.png",
        addedBy: "Alice",
      },
      {
        id: 2,
        name: "Bluetooth Headphones",
        price: 59.99,
        image: "./icons8-list-32.png",
        addedBy: "Bob",
      },
    ],
  },
  {
    id: 2,
    title: "Vacation to Japan",
    dateCreated: "2024-12-10",
    isShared: false,
    sharedWith: [],
    products: [
      {
        id: 3,
        name: "Travel Backpack",
        price: 45.99,
        image: "./icons8-list-32.png",
        addedBy: "Charlie",
      },
    ],
  },
  {
    id: 3,
    title: "Gaming Console",
    dateCreated: "2025-01-15",
    isShared: true,
    sharedWith: [
      { id: 3, name: "Charlie" },
      { id: 4, name: "Eva" },
    ],
    products: [
      {
        id: 4,
        name: "Game Controller",
        price: 49.99,
        image: "./icons8-list-32.png",
        addedBy: "Eva",
      },
      {
        id: 5,
        name: "HDMI Cable",
        price: 9.99,
        image: "./icons8-list-32.png",
        addedBy: "Charlie",
      },
    ],
  },
  {
    id: 99,
    title: "New key",
    dateCreated: "2024-11-01",
    isShared: true,
    sharedWith: [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ],
    products: [],
  },
];

function MainList() {
  const [wishList, setWishList] = useState(dummyWishlists);
  const [selectedList, setSelectedList] = useState(null);
  const [isMobileDetailView, setIsMobileDetailView] = useState(false);

  const [mockProductInitialData, setMockProductInitialData] = useState({});
  const [mockInitialData, setMockInitialData] = useState({});

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mockAllFriends = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
    { id: 4, name: "Eva" },
  ];

  const handleSave = (data, msg) => {
    msg === "new"
      ? setWishList((prev) => [...prev, data])
      : setWishList((prev) => prev.map((item) => (item.id === data.id ? data : item)));
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setWishList(wishList.filter((item) => item.id !== id));
    setSelectedList(null);
  };

  const handleClose = () => {
    setMockInitialData({});
    setIsModalOpen(false);
  };

  const handleSelectList = (index) => {
    setSelectedList(index);
    setIsMobileDetailView(true);
  };

  const handleProductSave = (product, id, msg) => {
    setWishList((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updatedProducts = msg
            ? [...item.products, product]
            : item.products.map((pd) => (pd.id === product.id ? product : pd));
          return { ...item, products: updatedProducts };
        }
        return item;
      })
    );
    setIsProductModalOpen(false);
  };

  const handleProductDelete = (pid, Sid) => {
    setWishList((prev) =>
      prev.map((item) => {
        if (item.id === Sid) {
          const updatedProducts = item.products.filter((p) => p.id !== pid);
          console.log(updatedProducts);
          return { ...item, products: updatedProducts };
        }
        return item;
      })
    );
  };

  const handleProductClose = () => {
    setIsProductModalOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Panel */}
      <div
        className={`md:w-1/5 w-full p-4 ${
          isMobileDetailView ? "hidden md:block" : "block"
        }`}
      >
        <div className="flex justify-center mb-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setIsModalOpen(true)}
          >
            Create Wishlist
          </button>
        </div>

        <WishlistModal
          isOpen={isModalOpen}
          onClose={handleClose}
          onSave={handleSave}
          initialData={mockInitialData}
          allFriends={mockAllFriends}
        />

        <WishList wishListItems={wishList} setSelectedList={handleSelectList} />
      </div>

      {/* Divider */}
      <div className="hidden md:block w-[5px] bg-gray-300"></div>

      {/* Right Panel */}
      <div
        className={`md:w-4/5 w-full p-4 ${
          selectedList !== null ? "block" : "hidden md:block"
        }`}
      >
        <button
          className={`md:hidden mb-4 text-blue-600 underline`}
          onClick={() => {
            setIsMobileDetailView(false);
            setSelectedList(null);
          }}
        >
          ← Back
        </button>

        {selectedList !== null && (
          <>
            <WishlistHeader
              wishList={wishList}
              selectedList={selectedList}
              onEdit={() => {
                setMockInitialData(wishList.find((item) => item.id === selectedList));
                setTimeout(() => {
                  setIsModalOpen(true);
                }, 500);
              }}
              onDelete={handleDelete}
            />

            <ProductList
              wishList={wishList}
              selectedList={selectedList}
              onAddProduct={() => setIsProductModalOpen(true)}
              setMockProductInitialData={setMockProductInitialData}
              onDelete={handleProductDelete}
            />

            <ProductModal
              selectedList={selectedList}
              isOpen={isProductModalOpen}
              onClose={handleProductClose}
              onSave={handleProductSave}
              initialData={mockProductInitialData}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default MainList;
