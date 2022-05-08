const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updatePassword,
  updateProfile,
  allUser,
  getUserDetails,
  updateUser,
  deleteUser,
} = require("../controller/authController");

const { isAuthenticatedUser, authorizedRoles } = require("../middlewares/auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);

router.route("/logout").get(logout);
router.route("/me").get(isAuthenticatedUser, getUserProfile);
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizedRoles("admin"), allUser);
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getUserDetails);

router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);
router.route("/password/reset/:token").put(resetPassword);
router
  .route("/admin/user/:id")
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateUser);

router
  .route("/admin/user/:id")
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteUser);

module.exports = router;
