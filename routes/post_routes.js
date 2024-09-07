const express = require("express")
const postController = require("../controllers/post_controller.js")
const {middleware_auth} = require("../middleware/auth.js")
const router = express.Router();


router.get("/getPosts",postController.getPosts)
router.post("/createPost",middleware_auth,postController.createPost)
router.get("/getDetail/:id",postController.getDetail)
router.patch("/getUpdate/:id",middleware_auth,postController.updatePost)
router.delete("/deletePost/:id",middleware_auth,postController.deletePost)
router.get("/searchPosts",postController.searchPosts)
module.exports = router