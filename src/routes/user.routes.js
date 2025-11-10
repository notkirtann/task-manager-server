import express from 'express'
import userController from '../controllers/user.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router()

//PoST
router.post("/signup", userController.createUser);
router.post("/login", userController.loginUser)
router.post("/logout",auth,userController.logoutUser)
router.post("/logoutAll",auth,userController.logoutAll)

//GeT
router.get("/me", auth, userController.getMyProfile);


//PATcH
router.patch("/:userId/address/:addressId", auth, userController.updateAddressField);
router.patch("/:userId/phone/:phoneId", auth, userController.updatePhoneNumberField);
router.patch("/me", auth, userController.updateUser);

//Delet-User
router.patch("/:userId/address/:addressId/remove", auth, userController.removeAddressField);
router.delete("/me", auth, userController.deleteUser);

export default router;