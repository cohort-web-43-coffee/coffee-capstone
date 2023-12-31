import {Router} from "express";
import {getPhotosByShopIdController} from "./photo.controller";


const basePath = '/apis/photo'
const router = Router()

router.route('/shop/:shopId')
    .get(getPhotosByShopIdController)

export const photoRoute = {basePath, router}