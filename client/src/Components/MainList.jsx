import React, { useEffect, useState } from "react";
import WishList from "./WishList";
import WishlistModal from "./WishlistModal";
import WishlistHeader from "./WishListHeader";
import ProductList from "./ProductList";
import ProductModal from "./ProductModal";
import { useUser } from "../Context/UserContext";
import { Navigate } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";

function MainList() {
  const { user, setUser } = useUser();

  if (user === null) {
    return <Navigate to="/" />;
  }
  const [socketInstance, setSocketInstance] = useState(null);
  useEffect(() => {
    const socket = io("http://localhost:3000", {
      query: { id: user.id },
    });
    setSocketInstance(socket);
    socket.on("wishlist:created", (data) => {
      console.log(data);
      setWishList((prev) => [...prev, data]);
    });

    socket.on("wishlist:updated", (data) => {
      console.log(data);
      setWishList((prev) =>
        prev.map((item) => (item.id === data.id ? data : item))
      );
    });

    socket.on("wishlist:deleted", (id) => {
      console.log(id);
      if (selectedList === id) {
        setSelectedList(null);
      }
      setWishList((prev) => prev.filter((item) => item.id !== id));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const [wishList, setWishList] = useState(user.wishlist);

  const [selectedList, setSelectedList] = useState(null);
  const [isMobileDetailView, setIsMobileDetailView] = useState(false);

  const [mockProductInitialData, setMockProductInitialData] = useState({});
  const [mockInitialData, setMockInitialData] = useState({});
  const [friends, setFreind] = useState();
  const [idOfUpdatedItem, setIdOfUpdatedItem] = useState(null);

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mockAllFriends = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
    { id: 4, name: "Eva" },
  ];

  const sendProductStatus = (Sid) => {
    const updatedWishlist = wishList.find((w) => w.id === Sid);
    console.log(updatedWishlist);
    socketInstance.emit("wishlist:update", updatedWishlist);
  };

  useEffect(() => {
    if (idOfUpdatedItem) {
      sendProductStatus(idOfUpdatedItem);
      setIdOfUpdatedItem(null);
    }
  }, [idOfUpdatedItem]);

  const handleSave = async (data, msg) => {
    try {
      if (msg === "new") {
        socketInstance.emit("wishlist:create", data);
        data.sharedWith = [
          ...data.sharedWith,
          { id: user.id, name: user.name },
        ];
        await axios.post("http://localhost:3000/wish/create", data);
        setWishList((prev) => [...prev, data]);
      } else if (msg === undefined) {
        socketInstance.emit("wishlist:update", data);
        await axios.post("http://localhost:3000/wish/update", data);
        setWishList((prev) =>
          prev.map((item) => (item.id === data.id ? data : item))
        );
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving wish:", error);
    }
  };

  const handleDelete = async (id, sharedWith) => {
    const data = { wishlistId: id, sharedWith };
    setSelectedList(null);
    try {
      setWishList(wishList.filter((item) => item.id !== id));
      socketInstance.emit("wishlist:delete", data);
      await axios.post("http://localhost:3000/wish/delete", { id });
    } catch (error) {
      console.error("Error Deleting wish:", error);
    }
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
    msg
      ? setTimeout(() => {
          setIdOfUpdatedItem(id);
        }, 300)
      : setIdOfUpdatedItem(id);
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
    setIdOfUpdatedItem(Sid);
  };

  const handleProductClose = () => {
    setIsProductModalOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#F9FAFB] text-[#111827]">
      {/* Left Panel */}
      <div
        className={`md:w-1/5 w-full p-4 ${
          isMobileDetailView ? "hidden md:block" : "block"
        }`}
      >
        <div className="flex justify-center mb-4">
          <button
            className="bg-[#6366F1] text-white px-4 py-2 rounded hover:bg-indigo-600 transition"
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
      <div className="hidden md:block w-[5px] bg-[#E5E7EB]"></div>

      {/* Right Panel */}
      <div
        className={`md:w-4/5 w-full p-4 ${
          selectedList !== null ? "block" : "hidden md:block"
        }`}
      >
        <button
          className="md:hidden mb-4 text-[#6366F1] underline"
          onClick={() => {
            setIsMobileDetailView(false);
            setSelectedList(null);
          }}
        >
          ← Back
        </button>

        {selectedList !== null && (
          <div>
            <WishlistHeader
              wishList={wishList}
              selectedList={selectedList}
              onEdit={() => {
                setMockInitialData(
                  wishList.find((item) => item.id === selectedList)
                );
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
              user={user.name}
              selectedList={selectedList}
              isOpen={isProductModalOpen}
              onClose={handleProductClose}
              onSave={handleProductSave}
              initialData={mockProductInitialData}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default MainList;
