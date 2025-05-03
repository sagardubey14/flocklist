const WishList = ({ wishListItems, setSelectedList }) => {
  return (
    <div className="p-4 bg-[#E5E7EB] rounded shadow-md">
      <h1 className="text-2xl font-bold text-[#1F2937] mb-4">My Wishlist</h1>
      <ul className="space-y-2">
        {wishListItems.map((item) => (
          <li
            key={item.id}
            onClick={() => setSelectedList(item.id)}
            className="cursor-pointer px-4 py-2 bg-[#F9FAFB] text-[#111827] rounded hover:bg-[#E0E7FF] hover:text-[#6366F1] transition-colors"
          >
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WishList;
