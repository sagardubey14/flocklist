const { addWish, deleteWish } = require("../models/db")

const handleWishCreation = (req, res)=>{
    addWish(req.body);
    return res.status(200).json({ message: 'Wish Added Successfully.'});
}

const handleWishUpdation =(req, res)=>{
    addWish(req.body, "update");
    return res.status(200).json({ message: 'Wish Added Successfully.'});
}

const handleWishDeletion = (req, res)=>{
    deleteWish(req.body.id);
    return res.status(200).json({ message: 'Wish Added Successfully.'});
}

module.exports = {handleWishCreation, handleWishDeletion, handleWishUpdation}