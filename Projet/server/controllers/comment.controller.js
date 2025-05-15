const Comment = require('../models/comment');

const createComment = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const comment = new Comment({ name, email, message });
    await comment.save();
    res.status(201).json({ message: 'Commentaire enregistré avec succès.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createComment,
  getAllComments
};
