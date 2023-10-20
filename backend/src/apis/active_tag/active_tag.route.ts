import {Router} from 'express'
import {deleteActiveTagController, insertActiveTagController} from './active_tag.controller.js'

const basePath = '/apis/active_tag'
const router = Router()

router.route('/')
    .post(insertActiveTagController)
    .delete(deleteActiveTagController)

export const activeTagRoute = {basePath, router}