import express from 'express'
import multer from 'multer'
import userController from '../controllers/user.controller.js';
import auth from '../middleware/auth.js';

const upload = multer({
    limits :{
        fileSize : 3500000
    },
    fileFilter(req,file,cb){
        // if (file.originalname.endsWith('.jpg') || file.originalname.endsWith('.jpeg') || file.originalname.endsWith('.png'))

        if(file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(undefined,true)
        }else{
            return cb(new Error('File must be in image format'))
        }
        //callback takes two function reject,resolve
        //cb(new Error('File must be a jpg'))
        //cb(undefined,true)
    }
})

const router = express.Router()

//PoST
router.post("/signup", userController.createUser);
router.post("/login", userController.loginUser)
router.post("/logout",auth,userController.logoutUser)
router.post("/logoutAll",auth,userController.logoutAll)

//upload module
router.post("/me/avatar",auth,upload.single('avatar'),userController.uploadAvatar,(error,req,res,next)=>res.status(400).send({'error' : error.message}))
router.get('/me/avatar',auth,userController.showAvatar)
router.delete('/me/avatar',auth,userController.deleteAvatar)

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