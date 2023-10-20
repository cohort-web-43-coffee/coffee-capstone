import {Router} from 'express'
import {
    deleteActiveTagController,
    getActiveTagByAccountIdController,
    postActiveTagController
} from './active_tag.controller.js'

const basePath = '/apis/active_tag'
const router = Router()

router.route('/')
    .post(postActiveTagController)
    .delete(deleteActiveTagController)

router.route('/activeTagByAccountId/:accountId')
    .get(getActiveTagByAccountIdController)

export const activeTagRoute = {basePath, router}