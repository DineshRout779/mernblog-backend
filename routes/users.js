const router = require('express').Router();
const {
  updateUserById,
  deleteUserById,
  getUserById,
} = require('../controllers/users');
const { verifyTokenAndAuthorization } = require('../middlewares/verifyToken');
// update user
router.put('/:id', verifyTokenAndAuthorization, updateUserById);

// delete user
router.delete('/:id', verifyTokenAndAuthorization, deleteUserById);

// get user
router.get('/:id', getUserById);

module.exports = router;
