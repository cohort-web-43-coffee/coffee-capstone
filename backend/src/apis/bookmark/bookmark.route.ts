import {Router} from "express";
import {
    deleteBookmarkController,
    getBookmarksByAccountIdController, insertBookmarkController
} from "./bookmark.controller";


const basePath = '/apis/bookmark'

const router = Router()


router.route('/')
    .post(insertBookmarkController)
    .delete(deleteBookmarkController)

router.route('/bookmarkByAccountId/:bookmarkAccountId')
    .get(getBookmarksByAccountIdController)
export const bookmarkRoute = {basePath, router}