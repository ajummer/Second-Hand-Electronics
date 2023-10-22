const router = require("express").Router();

const homeController = require("./controllers/homeController.js");
const userController = require("./controllers/userController.js");
const electronicController = require("./controllers/electronicController.js")

router.use(homeController);
router.use("/users", userController);
router.use("/electronics" , electronicController)
router.get("*", (req,res) =>{
    res.redirect("/404")
})

module.exports = router;
