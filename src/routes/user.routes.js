import express from 'express'
import * as controllers from '../controllers/user.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router()

//PoST
router.post("/signup", controllers.createUser);
router.post("/login", controllers.loginUser)
router.post("/logout",auth,controllers.logoutUser)
router.post("/logoutAll",auth,controllers.logoutAll)

//GeT
router.get("/me", auth, controllers.getMyProfile);


//PATcH
router.patch("/:userId/address/:addressId", auth, controllers.updateAddressField);
router.patch("/:userId/phone/:phoneId", auth, controllers.updatePhoneNumberField);
router.patch("/me", auth, controllers.updateUser);

//Delet-User
router.patch("/:userId/address/:addressId/remove", auth, controllers.removeAddressField);
router.delete("/me", auth, controllers.deleteUser);

export default router;