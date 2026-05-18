const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const postController = require("../controllers/postController");

router.put("/like/:id", protect, authorizeRoles("user", "admin"), postController.toggleLike);

router.post("/", protect, authorizeRoles("user", "admin"), postController.createPost);
router.put("/:id", protect, authorizeRoles("user", "admin"), postController.updatePost);
router.delete("/:id", protect, authorizeRoles("user", "admin"), postController.deletePost);
router.get("/", protect, authorizeRoles("user", "admin"), postController.getAllPost);
router.get("/:id", protect, authorizeRoles("user", "admin"), postController.getUserPost);


module.exports = router;