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
router.route('/search')
    .get(searchShopByNameController)
router.route('/tag')
    .post(getsShopsWithTagsController)
router.route('/:shopId')
    .get(getShopByShopIdController)

export const shopRoute = {basePath, router}