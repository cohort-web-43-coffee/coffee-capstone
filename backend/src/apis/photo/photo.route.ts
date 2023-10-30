import {Router} from "express";
import {getPhotoByPhotoIdController, getPhotosByShopIdController} from "./photo.controller";


const basePath = '/apis/photo'
const router = Router()
router.route('/photoByShopId/:shopId')
    .get(getPhotosByShopIdController)

router.route('/photoByPhotoId/:photoId')
    .get(getPhotoByPhotoIdController)

export const photoRoute = {basePath, router}