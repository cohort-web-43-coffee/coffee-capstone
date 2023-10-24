import {Router} from "express";
import {getAllTagsByTagGroupController, insertTagController} from "./tag.controller";
import {isSignInController} from "../../utils/contollers/isSignIn.Controller";


const basePath = '/apis/tag'
const router = Router()
router.route('/')
    .post(isSignInController, insertTagController)
router.route('/:tagGroup')
    .get(getAllTagsByTagGroupController)

export const tagRoute = {basePath, router}