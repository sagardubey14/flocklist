const express = require('express');
const { handleWishCreation, handleWishUpdation, handleWishDeletion } = require('../services/wishServices');
const router = express.Router();


router.post('/create', handleWishCreation);
router.post('/upadte', handleWishUpdation);
router.post('/delete', handleWishDeletion);

module.exports = router;