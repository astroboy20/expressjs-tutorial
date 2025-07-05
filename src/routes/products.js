import { Router } from "express";

const router = Router();

router.get("/api/products", (request, response) => {
  response.status(200).send([{ id: 123, name: "Fish and chips", price: 20.0 }]);
});

export default router
