import {Router} from "express";
import {
    getPublicAccountController,
} from "./account.controller";
import {isSignInController} from "../../utils/contollers/isSignIn.Controller";

// this is the basePath for this router
const basePath = '/apis/account'

////instantiate a new router object
const router: Router = Router()

router.route('/')
.get(isSignInController, getPublicAccountController)

//// export the router with the basePath and router object
export const accountRoute = {basePath, router}