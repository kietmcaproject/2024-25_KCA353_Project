import {Router} from 'express'
import { getUserById, loginUser, registerUser } from '../controllers/userController.js';
import { upload } from '../middleware/multer.js';


const userRouter = Router();

userRouter.route("/register").post(
        upload.single('avatar'),
        registerUser
)

userRouter.route("/login").post(loginUser)

userRouter.route("/user-details/:id").get(getUserById);

export default userRouter;