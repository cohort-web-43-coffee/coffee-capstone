import {Router} from "express";
import {getAllTagsByTagGroupController, getAllTagsByTagLabelController, insertTagController} from "./tag.controller";
import {isSignInController} from "../../utils/contollers/isSignIn.Controller";



const basePath = '/apis/tag'
const router = Router()
router.route('/')
    .post(isSignInController, insertTagController)
router.route('/tagGroup/:tagGroup')
    .get(getAllTagsByTagGroupController)

router.route('/tagLabel/:tagLabel')
    .get(getAllTagsByTagLabelController)

export const tagRoute = {basePath, router}