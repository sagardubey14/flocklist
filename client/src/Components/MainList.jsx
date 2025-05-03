import React, { useEffect, useState } from "react";
import WishList from "./WishList";
import WishlistModal from "./WishlistModal";
import WishlistHeader from "./WishListHeader";
import ProductList from "./ProductList";
import ProductModal from "./ProductModal";

const dummyWishlists = [
  {
    id: 1,
    title: "New Laptop",
    dateCreated: "2024-11-01",
    isShared: true,
    sharedWith: [{id:1, name:"Alice"}, {id:2, name:"Bob"}],
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
    sharedWith: [{id:3, name:"Charlie"}, {id:4, name:"Eva"}],
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
    sharedWith: [{id:1, name:"Alice"}, {id:2, name:"Bob"}],
    products: [],
  },
];

function MainList() {
  const [wishList, setWishList] = useState(dummyWishlists);
  const [selectedList, setSelectedList] = useState(null);
  const [isMobileDetailView, setIsMobileDetailView] = useState(false);
  const [mockProductInitialData, setMockProductInitialData] = useState({});

  useEffect(() => {
    console.log(mockProductInitialData);
  }, [mockProductInitialData]);

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const handleProductSave = (product) => {
    console.log("Saved product:", product);
    setIsProductModalOpen(false);
  };

  const handleProductClose = () => {
    setIsProductModalOpen(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleSelectList = (index) => {
    // console.log(wishList.find(item=>item.id === index));
    setSelectedList(wishList.find(item=>item.id === index));
    setIsMobileDetailView(true);
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

        <WishList
          wishListItems={wishList}
          setSelectedList={handleSelectList}
        />
      </div>

      {/* Divider */}
      <div className="hidden md:block w-[5px] bg-gray-300"></div>

      {/* Right Panel */}
      <div
        className={`md:w-4/5 w-full p-4 ${
          selectedList !== null ? "block" : "hidden md:block"
        }`}
      >
        {/* Mobile Back Button */}
        <button
          className="md:hidden mb-4 text-blue-600 underline"
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
              title={selectedList.title}
              eventDate={selectedList.dateCreated}
              isShared={selectedList.isShared}
              onEdit={() => alert("edit")}
              onDelete={() => alert("delete")}
              users={selectedList.sharedWith}
            />

            <ProductList
              products={selectedList.products}
              onAddProduct={() => setIsProductModalOpen(true)}
              setMockProductInitialData={setMockProductInitialData}
            />
            <ProductModal
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
