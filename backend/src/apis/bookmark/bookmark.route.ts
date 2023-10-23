import {Router} from "express";
import {
    deleteBookmarkController,
    getBookmarksByBookmarkAccountIdController
} from "./bookmark.controller";



const basePath = '/apis/bookmark'

const router = Router()


router.route('/')
.delete(deleteBookmarkController)

router.route('/bookmarkByAccountId/:bookmarkAccountId').get(getBookmarksByBookmarkAccountIdController)
export const bookmarkRoute = {basePath, router}