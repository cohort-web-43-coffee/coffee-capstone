import {Router} from "express";
import {logOutController} from "./log-out.controller";


const basePath = '/apis/log-out'
const router = Router()
router.route('/').get(logOutController)

export const logOutRoute = {basePath, router}