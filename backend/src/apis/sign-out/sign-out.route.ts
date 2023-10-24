import {Router} from "express";
import {signOutController} from "./sign-out.controller";
import {isSignInController} from "../../utils/contollers/isSignIn.Controller";


const basePath = '/apis/sign-out'
const router = Router()
router.route('/').get(isSignInController, signOutController)

export const signOutRoute = {basePath, router}