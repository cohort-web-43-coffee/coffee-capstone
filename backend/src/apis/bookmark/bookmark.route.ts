import {Router} from "express";
import {
    deleteBookmarkController,
    getBookmarksByAccountIdController, insertBookmarkController
} from "./bookmark.controller";
import {isSignInController} from "../../utils/contollers/isSignIn.Controller";

// saying that this is a basePath for this router
const basePath = '/apis/bookmark'

//instantiate a new router object
const router = Router()

//defining the bookmark route for this router
router.route('/')
    .post(isSignInController, insertBookmarkController)
    .delete(isSignInController, deleteBookmarkController)

<<<<<<< HEAD
router.route('/bookmarkByAccountId/')
    .get(isSignInController,getBookmarksByAccountIdController)
=======
router.route('/bookmarkByAccountId/:bookmarkAccountId')
    .get(isSignInController, getBookmarksByAccountIdController)

// export the router with the basePath and router object
>>>>>>> doc-blocks
export const bookmarkRoute = {basePath, router}