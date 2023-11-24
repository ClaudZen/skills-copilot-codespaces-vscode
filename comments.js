// Create web server

// Import modules
const express = require("express");
const router = express.Router();
const moment = require("moment");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// Import files
const { getComments, saveComments } = require("../utils/comments");

// Get comments
router.get("/", (req, res) => {
  const comments = getComments();
  res.json(comments);
});

// Post comments
router.post("/", (req, res) => {
  const comments = getComments();
  const newComment = {
    ...req.body,
    id: uuidv4(),
    timestamp: moment().unix(),
  };
  comments.push(newComment);
  saveComments(comments);
  res.json(comments);
});

// Delete comments
router.delete("/:id", (req, res) => {
  const comments = getComments();
  const filteredComments = comments.filter((comment) => comment.id !== req.params.id);
  saveComments(filteredComments);
  res.json(filteredComments);
});

// Update comments
router.put("/:id", (req, res) => {
  const comments = getComments();
  const { id } = req.params;
  const { name, content } = req.body;
  const commentsUpdated = comments.map((comment) => {
    if (comment.id === id) {
      return {
        ...comment,
        name,
        content,
      };
    } else {
      return comment;
    }
  });
  saveComments(commentsUpdated);
  res.json(commentsUpdated);
});

// Export modules
module.exports = router;