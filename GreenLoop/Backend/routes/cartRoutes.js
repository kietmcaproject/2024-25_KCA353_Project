const router = require("express").Router();
const { authenticateUser } = require("../middleware/authentication");
const {
  addToCart,
  getCart,
  removeitem,
  updateCartItem,
} = require("../controllers/cartController");

router.route("/add-to-cart").post(authenticateUser, addToCart);
router.route("/").get(authenticateUser, getCart);
router
  .route("/:id")
  .delete(authenticateUser, removeitem)
  .patch(authenticateUser, updateCartItem);

module.exports = router;
