import {Router} from 'express'
import {
    deleteActiveTagController, getActiveTagCountByTagIdController,
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

router.route('/countActiveTagsByTagId/:tagId')
    .get(getActiveTagCountByTagIdController)

router.route('/countActiveTagsByTagId/:tagId/:shopId')
    .get(getActiveTagCountByTagIdController)

export const activeTagRoute = {basePath, router}