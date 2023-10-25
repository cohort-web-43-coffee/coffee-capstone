import {Router} from "express";
import {
    getPublicAccountController,
} from "./account.controller";
import {isSignInController} from "../../utils/contollers/isSignIn.Controller";


const basePath = '/apis/account'

const router: Router = Router()

router.route('/')
.get(isSignInController, getPublicAccountController)


export const accountRoute = {basePath, router}