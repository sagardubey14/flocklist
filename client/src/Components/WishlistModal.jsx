import React, { useState, useEffect } from "react";

function WishlistModal({
  isOpen,
  onClose,
  onSave,
  initialData = {},
  allFriends = [],
}) {
  const [title, setTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [isShared, setIsShared] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [invitedFriends, setInvitedFriends] = useState([]);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setEventDate(initialData.dateCreated || "");
      setIsShared(initialData.isShared || false);
      setInvitedFriends(initialData.sharedWith || []);
    }
  }, [initialData]);

  const handleSave = () => {
    let data;
    initialData.id ?
    data = {
      id: initialData.id,
      title,
      dateCreated: eventDate,
      isShared,
      sharedWith: invitedFriends,
      products: initialData.products,
    }:
    data = {
      id: Date.now(),
      title,
      dateCreated: eventDate,
      isShared,
      sharedWith: invitedFriends,
      products: [],
    };

    initialData.id?
    onSave(data):
    onSave(data,"new");
  };

  const handleInvite = (friend) => {
    if (!invitedFriends.some((f) => f.id === friend.id)) {
      setInvitedFriends([...invitedFriends, friend]);
    }
  };

  const handleRemoveFriend = (id) => {
    setInvitedFriends(invitedFriends.filter((friend) => friend.id !== id));
  };

  const filteredFriends = allFriends.filter(
    (friend) =>
      friend.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !invitedFriends.some((f) => f.id === friend.id)
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.7)]">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl mx-4 p-6 overflow-y-auto max-h-[90vh]">
        <h3 className="text-xl font-semibold mb-4">
          {initialData.title ? "Edit Wishlist" : "Add Wishlist"}
        </h3>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title:</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Event Date:</label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
        </div>

        <div className="mb-4 flex items-center space-x-2">
          <input
            type="checkbox"
            className="form-checkbox h-4 w-4 text-blue-600"
            checked={isShared}
            disabled={initialData.isShared} 
            onChange={(e) => setIsShared(e.target.checked)}
          />
          <label className="text-sm">Shared</label>
        </div>

        {isShared && (
          <div className="mb-6">
            <div>
              <h5 className="font-medium mb-1">Invited Friends:</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-40 overflow-y-auto">
                {invitedFriends.map((friend) => (
                  <div
                    key={friend.id}
                    className="flex justify-between items-center p-2 bg-gray-200 rounded"
                  >
                    <span>{friend.name}</span>
                    <button
                      className="text-sm text-white bg-red-500 px-2 py-1 rounded hover:bg-red-600"
                      onClick={() => handleRemoveFriend(friend.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <h4 className="text-lg font-semibold mb-2">Invite Friends</h4>

            <input
              type="text"
              placeholder="Search friends..."
              className="w-full mb-3 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 max-h-40 overflow-y-auto">
              {filteredFriends.length === 0 && (
                <p className="text-sm text-gray-500">No friends found.</p>
              )}
              {filteredFriends.map((friend) => (
                <div
                  key={friend.id}
                  className="flex justify-between items-center p-2 bg-gray-100 rounded"
                >
                  <span>{friend.name}</span>
                  <button
                    className="text-sm text-white bg-green-500 px-2 py-1 rounded hover:bg-green-600"
                    onClick={() => handleInvite(friend)}
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default WishlistModal;
