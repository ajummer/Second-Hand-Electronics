const router = require("express").Router();
const { isAuth } = require("../middlewares/authMiddleware.js");
const electronicService = require("../services/electronicService.js");

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/404", (req, res) => {
  res.render("404");
});

router.get("/search", isAuth, async (req, res) => {
  let searchCriteria = { ...req.query };


  let foundElectronics = await electronicService.search(
    searchCriteria.name,
    searchCriteria.type
  );

  if (foundElectronics == undefined) {
    foundElectronics = await electronicService.getAll().lean();
  }

  console.log(foundElectronics);

  res.render("search", { foundElectronics });
});

module.exports = router;
