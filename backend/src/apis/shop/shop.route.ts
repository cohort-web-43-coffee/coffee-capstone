import {Router} from "express"
import {
    getAllShopsController,
    getShopByShopIdController,
    getsShopsWithTagsController,
    searchShopByNameController
} from "./shop.controller"


const basePath = '/apis/shop'
const router = Router()
router.route('/')
    .get(getAllShopsController)

router.route('/shopId/:shopId')
    .get(getShopByShopIdController)

router.route('/search')
    .get(searchShopByNameController)

router.route('/getShopsWithTags')
    .post(getsShopsWithTagsController)

export const shopRoute = {basePath, router}