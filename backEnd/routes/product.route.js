import express from "express";
import AuthmiddleWare from "../middleWare/auth.middleware.js";
import {createProduct, editProduct, getProduct, getProductsBySearch} from "../controller/productController.js";
import { upload } from "../middleWare/multer.middleware.js";


const router = express.Router();

router.post("/create", upload.fields([{name:"productImage", maxCount:1}]), AuthmiddleWare, createProduct);

router.patch("/edit/:id",upload.fields([{name:"productImage", maxCount:1}]), AuthmiddleWare, editProduct);

router.get("/",AuthmiddleWare, getProduct);

router.get("/search", AuthmiddleWare,getProductsBySearch);


export default router;