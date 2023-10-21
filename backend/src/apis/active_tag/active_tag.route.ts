import {Router} from 'express'
import {
    deleteActiveTagController, getActiveTagCountByTagIdAndShopIdController, getActiveTagCountByTagIdController,
    getActiveTagsByAccountIdController, getActiveTagsByShopIdController,
    postActiveTagController
} from './active_tag.controller'

const basePath = '/apis/activeTag'
const router = Router()

router.route('/')
    .post(postActiveTagController)
    .delete(deleteActiveTagController)

router.route('/activeTagsByAccountId/:accountId')
    .get(getActiveTagsByAccountIdController)

router.route('/activeTagsByShopId/:shopId')
    .get(getActiveTagsByShopIdController)

router.route('/activeTagCount/:tagId')
    .get(getActiveTagCountByTagIdController)

router.route('/activeTagCount/:tagId/:shopId')
    .get(getActiveTagCountByTagIdAndShopIdController)

export const activeTagRoute = {basePath, router}