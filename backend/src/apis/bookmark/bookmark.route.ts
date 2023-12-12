import {Router} from "express";
import {
    deleteBookmarkController,
    getBookmarksByAccountIdController, insertBookmarkController
} from "./bookmark.controller";
import {isSignInController} from "../../utils/contollers/isSignIn.Controller";


const basePath = '/apis/bookmark'
const router = Router()

router.route('/')
    .post(isSignInController, insertBookmarkController)
    .delete(isSignInController, deleteBookmarkController)
    .get(isSignInController, getBookmarksByAccountIdController)

export const bookmarkRoute = {basePath, router}