import React, { useState, useEffect } from 'react';

function WishlistModal({ isOpen, onClose, onSave, initialData = {}, allFriends = [] }) {
  const [title, setTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [isShared, setIsShared] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [invitedFriends, setInvitedFriends] = useState([]);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setEventDate(initialData.eventDate || '');
      setIsShared(initialData.isShared || false);
      setInvitedFriends(initialData.invitedFriends || []);
    }
  }, [initialData]);

  const handleSave = () => {
    const data = {
      title,
      eventDate,
      isShared,
      invitedFriends,
    };
    onSave(data);
  };

  const handleInvite = (friend) => {
    if (!invitedFriends.some(f => f.id === friend.id)) {
      setInvitedFriends([...invitedFriends, friend]);
    }
  };

  const handleRemoveFriend = (id) => {
    setInvitedFriends(invitedFriends.filter(friend => friend.id !== id));
  };

  const filteredFriends = allFriends.filter(friend =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !invitedFriends.some(f => f.id === friend.id)
  );

  if (!isOpen) return null;

  return (
    <div>
      <h3>{initialData.title ? 'Edit Wishlist' : 'Add Wishlist'}</h3>
      <div>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Event Date:
          <input
            type="date"
            value={eventDate}
            onChange={e => setEventDate(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Shared:
          <input
            type="checkbox"
            checked={isShared}
            onChange={e => setIsShared(e.target.checked)}
          />
        </label>
      </div>

      {isShared && (
        <div>
          <h4>Invite Friends</h4>
          <div>
            <input
              type="text"
              placeholder="Search friends"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <div>
              {filteredFriends.map(friend => (
                <div key={friend.id}>
                  {friend.name}
                  <button onClick={() => handleInvite(friend)}>Add</button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h5>Invited Friends:</h5>
            {invitedFriends.map(friend => (
              <div key={friend.id}>
                {friend.name}
                <button onClick={() => handleRemoveFriend(friend.id)}>Remove</button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default WishlistModal;
