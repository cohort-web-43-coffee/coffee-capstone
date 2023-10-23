import {Router} from "express";
import {getPhotosByShopIdController} from "./photo.controller";


const basePath = '/apis/photo'
const router = Router()
router.route('/:shopId').get(getPhotosByShopIdController)