import Post from "../models/Post.js";
import User from "../models/User.js";

//CREAT
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();
    //after create...return all posts
    const post = await Post.find();

    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ msg: err.message });
  }
};

//READ
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

//UPDATE
export const likePost = async (req, res) => {
  try {
    const { id } = req.params; //querystring
    const { userId } = req.body; //body of request
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    //check if user liked already or not
    if (isliked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};
