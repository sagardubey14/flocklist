const { addUser, getUser, getWishList } = require("../models/db");

const handleLogin = (req, res) => {
    const { email, password } = req.body;
    const user = getUser(email)
    console.log(user);
    if (!user)
        return res.status(404).json({ message: 'User do not exists.' });
    if (user.password !== password)
        return res.status(401).json({ message: 'Invalid username or password.' });

    return res.status(200).json({ message: 'User Registered Successfully.', username: user.username, wishlist: getWishList(user.wishlist) });
}


const handleRegister = (req, res) => {
    const { username, email, password } = req.body;
    const status = addUser({ username, email, password, wishlist: [] })
    if (status === 409)
        return res.status(409).json({ message: 'User already exists.' });

    return res.status(200).json({ message: 'User Registered Successfully.' });

}

module.exports = { handleLogin, handleRegister }