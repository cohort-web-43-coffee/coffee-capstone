import {Router} from "express";
import {
    getPublicAccountByAccountIdController,
} from "./account.controller";
import {isSignInController} from "../../utils/contollers/isSignIn.Controller";


const basePath = '/apis/account'

const router: Router = Router()

router.route('/:accountId')
.get(isSignInController, getPublicAccountByAccountIdController)


export const accountRoute = {basePath, router}