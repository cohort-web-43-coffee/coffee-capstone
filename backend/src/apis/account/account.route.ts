import {Router} from "express";
import {
    getPublicAccountByAccountIdController,
} from "./account.controller";


const basePath = '/apis/account'

const router: Router = Router()

router.route('/:accountId')
.get(getPublicAccountByAccountIdController)




router.route('/accountName/:accountName')

export const accountRoute = {basePath, router}