const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const commentController = require("../controllers/commentController");


router.post("/:postId", protect, authorizeRoles("user", "admin"), commentController.createComment);
router.put("/:commentId", protect, authorizeRoles("user", "admin"), commentController.updateComment);
router.delete("/:commentId", protect, authorizeRoles("user", "admin"), commentController.deleteComment);
router.get("/:postId", protect, authorizeRoles("user", "admin"), commentController.getComment);


module.exports = router;
