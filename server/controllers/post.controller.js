const { postValidationSchema } = require('../middlewares/yupVerification');
const Community = require('../models/community.model');
const Post = require('../models/post.model');

// Create and Save a new Post
exports.createPost = async (req, res) => {
  try {
    await postValidationSchema.validate(req.body, { abortEarly: false });

    const post = await Post.create(req.body);
    if (!post) {
      throw new Error('Failed to create post');
    }

    // Add post id into community.posts array
    const community = await Community.findByIdAndUpdate(
      req.body.community,
      { $push: { posts: post._id } },
      { new: true }
    );

    if (!community) {
      throw new Error('Failed to add post id into community.posts array');
    }

    res.status(200).json(post);
    console.log('Post created successfully');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a Post by the id in the request
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: 'Only the author of the post can update it.',
      });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedPost) {
      throw new Error('Failed to update post');
    }
    res.status(200).json(updatedPost);
    console.log('Post updated successfully');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Retrieve single post from the database.
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Retrieve all Posts from the database.
exports.getCommunityPosts = async (req, res) => {
  try {
    const community = await Community.findById(req.params.communityId);
    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }
    const posts = await Promise.all(
      community.posts.map((postId) => Post.findById(postId))
    );
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Delete a Post with the specified postId in the request
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: 'Only the author of the post can delete it.',
      });
    }
    const deletedPost = await Post.findByIdAndDelete(req.params.postId);
    if (!deletedPost) {
      throw new Error('Failed to delete post');
    }

    // Remove post id from community.posts array
    const community = await Community.findByIdAndUpdate(
      post.community,
      { $pull: { posts: post._id } },
      { new: true }
    );
    if (!community) {
      throw new Error('Failed to remove post id from community.posts array');
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
