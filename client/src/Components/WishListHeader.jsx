function WishlistHeader({ title, eventDate, isShared, onEdit, onDelete }) {
  return (
    <div>
      <h2>{title}</h2>
      <div>Event Date: {eventDate}</div>
      <div>Privacy: {isShared ? 'Shared' : 'Private'}</div>
      <div>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}

export default WishlistHeader;
