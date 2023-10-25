import {Router} from "express";
import {getPhotoByPhotoIdController, getPhotosByShopIdController} from "./photo.controller";


const basePath = '/apis/photo'
const router = Router()
router.route('/:shopId').get(getPhotosByShopIdController)

router.route('/:photoId').get(getPhotoByPhotoIdController)

export const photoRoute = {basePath, router}