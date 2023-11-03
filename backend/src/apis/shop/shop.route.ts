import {Router} from "express"
import {getAllShopsController, getShopByShopIdController, searchShopByNameController} from "./shop.controller"


const basePath = '/apis/shop'
const router = Router()
router.route('/')
    .get(getAllShopsController)

router.route('/shopId/:shopId')
    .get(getShopByShopIdController)

router.route('/search')
    .get(searchShopByNameController)

export const shopRoute = {basePath, router}