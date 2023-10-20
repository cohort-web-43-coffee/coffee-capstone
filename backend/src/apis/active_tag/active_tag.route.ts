import {Router} from 'express'
import {
    deleteActiveTagController, getActiveTagCountByTagIdAndShopIdController, getActiveTagCountByTagIdController,
    getActiveTagsByAccountIdController, getActiveTagsByShopIdController,
    postActiveTagController
} from './active_tag.controller.js'

const basePath = '/apis/active_tag'
const router = Router()

router.route('/')
    .post(postActiveTagController)
    .delete(deleteActiveTagController)

router.route('/activeTagsByAccountId/:accountId')
    .get(getActiveTagsByAccountIdController)

router.route('/activeTagsByShopId/:shopId')
    .get(getActiveTagsByShopIdController)

router.route('/countActiveTag/:tagId')
    .get(getActiveTagCountByTagIdController)

router.route('/countActiveTag/:tagId/:shopId')
    .get(getActiveTagCountByTagIdAndShopIdController)

export const activeTagRoute = {basePath, router}