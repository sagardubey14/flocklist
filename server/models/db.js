let Users = [
    {
        "id":1,
        "username": "Alice",
        "email": "alice@example.com",
        "password": "alice123",
        "wishlist": [1, 99]
    },
    {
        "id":2,
        "username": "Bob",
        "email": "bob@example.com",
        "password": "bob123",
        "wishlist": [1, 99]
    },
    {
        "id":3,
        "username": "Charlie",
        "email": "charlie@example.com",
        "password": "charlie123",
        "wishlist": [2, 3]
    },
    {
        "id":4,
        "username": "Eva",
        "email": "eva@example.com",
        "password": "eva123",
        "wishlist": [3]
    }
];


let WishList = [
    {
        id: 1,
        title: "New Laptop",
        dateCreated: "2024-11-01",
        isShared: true,
        sharedWith: [
            { id: 1, name: "Alice" },
            { id: 2, name: "Bob" },
        ],
        products: [
            {
                id: 1,
                name: "Wireless Mouse",
                price: 25.99,
                image: "./icons8-list-32.png",
                addedBy: "Alice",
            },
            {
                id: 2,
                name: "Bluetooth Headphones",
                price: 59.99,
                image: "./icons8-list-32.png",
                addedBy: "Bob",
            },
        ],
    },
    {
        id: 2,
        title: "Vacation to Japan",
        dateCreated: "2024-12-10",
        isShared: false,
        sharedWith: [],
        products: [
            {
                id: 3,
                name: "Travel Backpack",
                price: 45.99,
                image: "./icons8-list-32.png",
                addedBy: "Charlie",
            },
        ],
    },
    {
        id: 3,
        title: "Gaming Console",
        dateCreated: "2025-01-15",
        isShared: true,
        sharedWith: [
            { id: 3, name: "Charlie" },
            { id: 4, name: "Eva" },
        ],
        products: [
            {
                id: 4,
                name: "Game Controller",
                price: 49.99,
                image: "./icons8-list-32.png",
                addedBy: "Eva",
            },
            {
                id: 5,
                name: "HDMI Cable",
                price: 9.99,
                image: "./icons8-list-32.png",
                addedBy: "Charlie",
            },
        ],
    },
    {
        id: 99,
        title: "New key",
        dateCreated: "2024-11-01",
        isShared: true,
        sharedWith: [
            { id: 1, name: "Alice" },
            { id: 2, name: "Bob" },
        ],
        products: [],
    },
];

const getUser = (email) => {
    const user = Users.find(user => user.email === email)
    return user
}

const addUser = (element) => {
    const user = Users.find(user => user.email === element.email)
    if (user) return 409;
    Users.push(element);
    return 200;
}

const addWish = (element, msg)=>{
    console.log(element,"addWish");
    if(msg) 
        WishList.filter(wish=>wish.id !== element.id);
    WishList.push(element);
    element.sharedWith.forEach(sharedUser => {
        const user = Users.find(u => u.id === sharedUser.id);
        if (user && !user.wishlist.includes(element.id)) {
            user.wishlist.push(element.id);
        }
    });
    return 200;
}
const deleteWish = (id) => {
    const deletedWish = WishList.find(w => w.id === id);
    if (!deletedWish) return;

    deletedWish.sharedWith.forEach(sharedUser => {
        const user = Users.find(u => u.id === sharedUser.id);
        if (user) {
            user.wishlist = user.wishlist.filter(wishId => wishId !== id);
        }
    });
};


const getWishList = (arr) => {
    return WishList.filter(wishlist => arr.includes(wishlist.id));
}

const getUserWishes = (id)=>{
    const user = Users.find(u=>u.id===id)
    return {id:user.id, name:user.username};
}

const getData = (req, res) => {
    return res.status(200).json({ data: Users, wishlist: WishList });
}

module.exports = { getUser, addUser, getData, getWishList, addWish, deleteWish, getUserWishes }