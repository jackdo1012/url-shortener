const express = require("express")
const MainController = require("../controllers/MainController")
const router = express.Router()

router.get("/:slug", MainController.redirect)
router.post("/add", MainController.add)
router.get("/", MainController.index)

module.exports = router
