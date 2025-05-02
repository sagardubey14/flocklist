import React from 'react';

function SharedUsersSection({ users, onRemoveUser }) {
  if (!users || users.length === 0) {
    return <div>No users have been added to this wishlist.</div>;
  }

  return (
    <div>
      <h3>Shared With:</h3>
      {users.map((user, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <img src={user.avatarUrl} alt={user.name} width="40" height="40" />
          <div style={{ marginLeft: '10px' }}>{user.name}</div>
          <button style={{ marginLeft: '10px' }} onClick={() => onRemoveUser(user.id)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default SharedUsersSection;
