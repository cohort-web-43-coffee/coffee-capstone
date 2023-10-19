import {Router} from 'express'
import {insertActiveTagController} from './active_tag.controller.js'

const basePath = '/apis/active_tag'
const router = Router()

router.route('/')
    .post(insertActiveTagController)

export const activeTagRoute = {basePath, router}