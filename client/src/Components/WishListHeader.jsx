import { useState } from "react";
import SharedUsersSection from "./SharedUsersSection";

function WishlistHeader({ wishList, selectedList, onEdit, onDelete }) {
  const {title, dateCreated, isShared, sharedWith} = wishList.find(item=> item.id === selectedList)
  const [showUsers, setShowUSers] = useState(false);

  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded shadow">
      {/* Title and Date Section */}
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <div className="text-sm text-gray-500">Event Date: {dateCreated}</div>
      </div>

      {/* Row for Privacy and Buttons */}
      <div className="flex justify-between items-center relative">
        {/* Privacy Section */}
        <div
          onClick={() => {
            if (isShared) setShowUSers(true);
          }}
          className={`cursor-pointer text-sm font-medium ${
            isShared ? "text-blue-600 hover:underline" : "text-gray-400"
          }`}
        >
          Privacy: {isShared ? "Shared" : "Private"}
        </div>
        {showUsers && (
          <SharedUsersSection users={sharedWith} setShowUSers={setShowUSers} />
        )}
        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={()=>onDelete(selectedList)}
            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default WishlistHeader;
