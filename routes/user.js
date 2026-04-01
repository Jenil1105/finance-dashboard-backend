const express = require("express");
const router = express.Router();
const { updateUser } = require("../controllers/user/updateUser");
const { deleteUser } = require("../controllers/user/deleteUser");
const { getAllUsers } = require("../controllers/user/getAllUsers");

router.get('/', getAllUsers);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;