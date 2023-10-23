import {Router} from "express";
import {getAllTagsByTagGroupController, insertTagController} from "./tag.controller";


const basePath = '/apis/tag'
const router = Router()
router.route('/')
    .post(insertTagController)
router.route('/:tagGroup')
    .get(getAllTagsByTagGroupController)

export const tagRoute = {basePath, router}