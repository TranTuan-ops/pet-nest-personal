const express = require("express");
const router = express.Router();
const bannerController = require("../controllers/bannerController");
const { upload } = require("../config/upload");
const verifyToken = require("../middleware/auth");
const authorizeRoles = require("../middleware/authorization");
const { ROLES } = require("../config/role");

const adminOnly = [verifyToken, authorizeRoles(ROLES.ADMIN)];

router.post("/", adminOnly, upload.single("image"), bannerController.createBanner);
router.get("/", bannerController.getAllBanners);
router.get("/:id", bannerController.getBannerById);
router.put("/:id", adminOnly, upload.single("image"), bannerController.updateBanner);
router.delete("/:id", adminOnly, bannerController.deleteBanner);

module.exports = router;
