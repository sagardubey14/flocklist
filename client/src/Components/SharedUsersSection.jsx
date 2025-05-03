import React from "react";

function SharedUsersSection({ users, setShowUSers }) {
  if (!users || users.length === 0) {
    return (
      <div className="p-4 text-gray-600 bg-white rounded shadow-md">
        No users have been added to this wishlist.
      </div>
    );
  }

  return (
    <div className="absolute top-full mt-2 -left-4.5 sm:-left-6 z-20 w-38 sm:w-50 bg-white p-4 sm:p-6 rounded-lg shadow-lg">
      {/* Close Button */}
      <button
        onClick={() => setShowUSers(false)}
        className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-lg font-bold"
        aria-label="Close"
      >
        ×
      </button>

      {users.map((user) => (
        <div key={user.id} className="flex items-center mb-4 w-full sm:w-auto">
          <img
            src="./bxs-user.svg"
            alt={user.name}
            className="rounded-full w-8 h-8 sm:w-10 sm:h-10"
          />
          <div className="ml-3 sm:ml-4 text-sm sm:text-base text-gray-700 font-medium">
            {user.name}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SharedUsersSection;
