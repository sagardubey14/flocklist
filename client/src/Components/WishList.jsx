const WishList = ({ wishListItems, setSelectedList }) => {
  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">My Wishlist</h1>
      <ul className="space-y-2">
        {wishListItems.map((item) => (
          <li
            key={item.id}
            onClick={() => setSelectedList(item.id)}
            className="cursor-pointer px-4 py-2 bg-gray-100 rounded hover:bg-blue-100 hover:text-blue-700 transition-colors"
          >
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WishList;
