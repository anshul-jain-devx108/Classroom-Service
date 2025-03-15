const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require("../middleware/authMiddleware");

router.post('/', authMiddleware, userController.createUser);

// router.get('/', authMiddleware, userController.getUsers);

router.get('/:id', authMiddleware, userController.getUserProfile);

router.put('/:id/edit', authMiddleware, userController.updateUser);

router.delete('/:id/delete', authMiddleware, userController.deleteUser);

module.exports = router; 