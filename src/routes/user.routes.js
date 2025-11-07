import express from 'express'
import * as controllers from '../controllers/user.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router()

router.post("/signup", controllers.createUser);

router.post("/login", controllers.loginUser)

router.post("/logout",auth,controllers.logoutUser)

router.post("/logoutAll",auth,controllers.logoutAll)

router.get("/profile", auth, controllers.getMyUsers);

router.get("/:id", auth, controllers.getUserById);

router.patch("/:id", auth, controllers.updateUserById);

router.patch("/:id/address/:addressId", auth, controllers.updateAddressField);

router.patch("/:id/phone/:phoneId", auth, controllers.updatePhoneNumberField);

router.delete("/:id", auth, controllers.deleteUser);

export default router;