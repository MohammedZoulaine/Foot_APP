const express = require('express');
const { createComment, getAllComments } = require('../controllers/comment.controller');

const router = express.Router();

router.post('/', createComment);
router.get('/', getAllComments);

module.exports = router;
