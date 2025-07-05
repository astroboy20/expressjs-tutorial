import { Router } from "express";
import userRouter from "./user.js";
import productsRouter from "./products.js";
const router = Router();

router.use(userRouter);
router.use(productsRouter);

export default router;
