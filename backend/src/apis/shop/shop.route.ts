import {Router} from "express"
import {getAllShopsController, getShopByShopIdController} from "./shop.controller"


const basePath = '/apis/shop'
const router = Router()
router.route('/')
    .get(getAllShopsController)
router.route(':shopId')
    .get(getShopByShopIdController)

export const shopRoute = {basePath, router}