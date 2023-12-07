import {Router} from "express";
import {
    getAllTagsByTagGroupController,
    getShopTagsController,
    insertTagController
} from "./tag.controller";
import {isSignInController} from "../../utils/contollers/isSignIn.Controller";



const basePath = '/apis/tag'
const router = Router()
router.route('/')
    .post(isSignInController, insertTagController)
router.route('/tagGroup/:tagGroup')
    .get(getAllTagsByTagGroupController)
router.route('/shopTags/:shopId')
    .get(getShopTagsController)

export const tagRoute = {basePath, router}