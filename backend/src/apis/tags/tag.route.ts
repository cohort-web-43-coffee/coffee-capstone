import {Router} from 'express';
import {getAllTagsByTagGroupController, getShopTagsController, insertTagController} from './tag.controller'
import {isSignInController} from '../../utils/contollers/isSignIn.Controller'


const basePath = '/apis/tag'
const router = Router()
router.route('/')
    .post(isSignInController, insertTagController)
router.route('/group/:tagGroup')
    .get(getAllTagsByTagGroupController)
router.route('/shop/:shopId')
    .get(getShopTagsController)

export const tagRoute = {basePath, router}