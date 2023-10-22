const router = require("express").Router();
const electronicService = require("../services/electronicService.js");
const { getErrorMessage } = require("../utils/errorHelpers.js");
const { isAuth } = require("../middlewares/authMiddleware.js");

router.get("/", async (req, res) => {
  const products = await electronicService.getAll().lean();

  res.render("electronics", { products });
});

router.get("/create", isAuth, (req, res) => {
  res.render("electronics/create");
});

router.post("/create", isAuth, async (req, res) => {
  try {
    const electronicData = await electronicService.create({
      ...req.body,
      owner: req.user._id,
    });
    res.redirect("/electronics");
  } catch (err) {
    res.render("electronics/create", { error: getErrorMessage(err) });
  }
});

router.get("/details/:productId", async (req, res) => {
  const productId = req.params.productId;
  try {
    const product = await electronicService.getSingle(productId).lean();
    const isOwner = req.user?._id == product.owner._id;
    const isBought = product.buyingList.some((x) => x.user == req.user?._id);
    res.render("electronics/details", { product, isOwner, isBought });
  } catch (err) {
    res.render("404");
  }
});

router.get("/details/:productId/delete", isAuth, async (req, res) => {
  const productId = req.params.productId;

  try {
    const product = await electronicService.getSingle(productId).lean();
    if (req.user._id == product.owner._id) {
      await electronicService.delete(productId);
      res.redirect("/electronics");
    } else {
      res.redirect("/404");
    }
  } catch (err) {
    res.render(`/electronics/details/${productId}`, {
      error: "Unsuccessfull attempt to delete the post!",
    });
  }
});

router.get("/details/:productId/edit", isAuth, async (req, res) => {
  const productId = req.params.productId;

  try {
    const product = await electronicService.getSingle(productId).lean();
    if (req.user._id == product.owner._id) {
      res.render("electronics/edit", { product });
    } else {
      res.redirect("/404");
    }
  } catch (err) {
    res.render("electronics/edit", { error: getErrorMessage(err) });
  }
});

router.post("/details/:productId/edit", isAuth, async (req, res) => {
  const productId = req.params.productId;
  const product = req.body;

  try {
    const updatedProduct = await electronicService.update(productId, product);
    updatedProduct.save();
    res.redirect(`/electronics/details/${productId}`);
  } catch (err) {
    res.render("electronics/edit", { product, error: getErrorMessage(err) });
  }
});

router.get("/details/:productId/buy", isAuth, async (req, res) => {
  const productId = req.params.productId;
  const user = req.user._id;
  try {
    const product =  await electronicService.getSingle(productId).lean()

    if(product.owner._id == user){
      res.redirect(`/electronics/details/${productId}`);
    } else {
      await electronicService.buy(productId, { user });
      res.redirect(`/electronics/details/${productId}`);
    }
  } catch (err) {
   
    res.render("electronics/details", { error: getErrorMessage(err) });
  }
});

module.exports = router;
