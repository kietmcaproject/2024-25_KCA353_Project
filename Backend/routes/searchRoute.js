const router = require("express").Router();
const {
  searchProduct,
  searchCategory,
  querySearch,
  searchProductsByCategory,
} = require("../controllers/productController");

router.get("/", searchProduct);

router.get("/category", searchCategory);
router.get("/category/specific", searchProductsByCategory);
router.get("/q", querySearch);

module.exports = router;
