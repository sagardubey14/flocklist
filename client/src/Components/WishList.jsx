const WishList = ({wishListItems, setSelectedList}) => {

  return (
    <div>
      <h1>My Wishlist</h1>
      <ul>
        {wishListItems.map((item, index) => (
          <li key={index} onClick={()=>setSelectedList(index)}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default WishList;
