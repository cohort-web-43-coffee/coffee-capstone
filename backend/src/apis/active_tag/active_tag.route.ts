import {Router} from 'express'
import {deleteActiveTagController, getActiveTagsByShopIdController, postActiveTagController
} from './active_tag.controller'
import {isSignInController} from "../../utils/contollers/isSignIn.Controller"

const basePath = '/apis/activeTag'
const router = Router()

router.route('/')
    .post(isSignInController,postActiveTagController)
    .delete(isSignInController, deleteActiveTagController)

router.route('/activeTagsByShopId/:shopId')
    .get(isSignInController, getActiveTagsByShopIdController)

export const activeTagRoute = {basePath, router}