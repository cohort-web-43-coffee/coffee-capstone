import {Router} from 'express'
import {
    deleteActiveTagController, getActiveTagCountByTagIdAndShopIdController, getActiveTagCountByTagIdController,
    getActiveTagsByAccountIdController, getActiveTagsByShopIdController,
    postActiveTagController
} from './active_tag.controller'
import {isSignInController} from "../../utils/contollers/isSignIn.Controller";

const basePath = '/apis/activeTag'
const router = Router()

router.route('/')
    .post(isSignInController,postActiveTagController)
    .delete(isSignInController, deleteActiveTagController)

router.route('/activeTagsByAccountId/:accountId')
    .get(isSignInController,getActiveTagsByAccountIdController)

router.route('/activeTagsByShopId/:shopId')
    .get(getActiveTagsByShopIdController)

router.route('/activeTagCount/:tagId')
    .get(getActiveTagCountByTagIdController)

router.route('/activeTagCount/:tagId/:shopId')
    .get(getActiveTagCountByTagIdAndShopIdController)

export const activeTagRoute = {basePath, router}