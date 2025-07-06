import { Router } from "express";

const router = Router();

router.get("/api/products", (request, response) => {
  console.log(request.headers.cookies);
  console.log(request.cookies);
  console.log(request.signedCookies.hello);
  if (request.signedCookies.hello && request.signedCookies.hello === "world") {
    return response
      .status(200)
      .send([{ id: 123, name: "Fish and chips", price: 20.0 }]);
  }
  response.send({ msg: "Sorry, you need a valid cookie" });
});

export default router;
