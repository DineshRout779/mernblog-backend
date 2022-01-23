const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAllPosts = async (req, res) => {
  const username = req.query.user;
  const category = req.query.category;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (category) {
      posts = await Post.find({
        categories: {
          $in: [category],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updatePostById = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json('No such post found!');
  }
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json(updatedPost);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.deletePostById = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json('No such post found!');
  try {
    await post.delete();
    res.status(200).json('Post has been deleted!');
  } catch (err) {
    res.status(500).json(err);
  }
};
