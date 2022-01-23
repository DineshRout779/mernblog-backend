const router = require('express').Router();
const {
  getPostById,
  getAllPosts,
  createPost,
  updatePostById,
  deletePostById,
} = require('../controllers/posts');
const { verifyTokenAndAuthorization } = require('../middlewares/verifyToken');

// create post
router.post('/', createPost);

// get a post
router.get('/:id', getPostById);

// get all post
router.get('/', getAllPosts);

// update post
router.put('/:id', verifyTokenAndAuthorization, updatePostById);

// delete post
router.delete('/:id', verifyTokenAndAuthorization, deletePostById);

module.exports = router;
