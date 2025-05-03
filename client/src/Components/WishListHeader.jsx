import { useState } from "react";
import SharedUsersSection from "./SharedUsersSection";

function WishlistHeader({ wishList, selectedList, onEdit, onDelete }) {
  const { title, dateCreated, isShared, sharedWith } = wishList.find(
    (item) => item.id === selectedList
  );
  const [showUsers, setShowUSers] = useState(false);

  return (
    <div className="flex flex-col gap-4 p-4 bg-[#E5E7EB] rounded shadow-md">
      {/* Title and Date Section */}
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold text-[#1F2937]">{title}</h2>
        <div className="text-sm text-[#6B7280]">Event Date: {dateCreated}</div>
      </div>

      {/* Row for Privacy and Buttons */}
      <div className="flex justify-between items-center relative">
        {/* Privacy Section */}
        <div
          onClick={() => {
            if (isShared) setShowUSers(true);
          }}
          className={`cursor-pointer text-sm font-medium ${
            isShared
              ? "text-[#6366F1] hover:underline"
              : "text-gray-400 cursor-default"
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
            className="px-3 py-1 text-sm bg-[#6366F1] text-white rounded hover:bg-indigo-600 transition"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(selectedList, sharedWith)}
            className="px-3 py-1 text-sm bg-[#EF4444] text-white rounded hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default WishlistHeader;
