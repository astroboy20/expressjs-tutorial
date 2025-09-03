import { Router } from "express";
import { checkSchema, matchedData, validationResult } from "express-validator";
import {
  filterValidationSchema,
  validationSchema,
} from "../utils/validationSchema.js";
import { mockUsers } from "../utils/constant.js";
import { resolveIndexByUserId } from "../utils/middleware.js";
import { MockUser } from "../mongoose/schemas/user.js";
import { hashPassword } from "../utils/helpers.js";

const router = Router();

router.get(
  "/api/users",
  checkSchema(filterValidationSchema),
  (request, response) => {
    const result = validationResult(request);

    if (!result.isEmpty())
      return response.status(400).send({ errors: result.array() });

    const {
      query: { filter, value },
    } = request;

    if (filter && value) {
      const filteredUsers = mockUsers.filter((user) =>
        user[filter].includes(value)
      );
      return response.status(200).send(filteredUsers);
    }

    return response.status(200).send(mockUsers);
  }
);

router.post(
  "/api/users",
  checkSchema(validationSchema),
  async (request, response) => {
    const result = validationResult(request);
    if (!result.isEmpty()) return response.status(400).send(result.array());
    const data = matchedData(request);
    console.log(data)
    // const { body } = request;
    data.password = await hashPassword(data.password);
    console.log(data)
    const newUser = new MockUser(data);
    try {
      const savedUser = await newUser.save();
      return response.status(201).send(newUser);
    } catch (error) {
      console.log(error);
      response.sendStatus(400);
    }
  }
);
// router.post(
//   "/api/users",
//   checkSchema(validationSchema),
//   (request, response) => {
//     const result = validationResult(request);
//     console.log(result);

//     if (!result.isEmpty())
//       return response.status(400).send({ errors: result.array() });

//     const data = matchedData(request);
//     console.log(data);
//     const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...data };
//     mockUsers.push(newUser);
//     return response.status(201).send(newUser);
//   }
// );

router.get("/api/users/:id", (request, response) => {
  const { id } = request.params;
  const parsedId = parseInt(id);
  if (isNaN(parsedId))
    return response.status(400).send({ msg: "Inavlid User ID" });

  const findUser = mockUsers.find((user) => user.id === parsedId);

  if (!findUser) {
    return response.status(404).send({ msg: "User Not Found!" });
  }

  return response.status(200).send(findUser);
});

router.put("/api/users/:id", (request, response) => {
  const {
    body,
    params: { id },
  } = request;
  const parsedId = parseInt(id);
  if (isNaN(parsedId))
    return response.status(400).send({ msg: "Invalid User ID" });

  const userIndex = mockUsers.findIndex((user) => user.id === parsedId);

  if (userIndex === -1)
    return response.status(404).send({ msg: "User Not Found!" });

  mockUsers[userIndex] = {
    id: parsedId,
    ...body,
  };

  return response.status(200).send(mockUsers[userIndex]);
});

router.patch("/api/users/:id", resolveIndexByUserId, (request, response) => {
  const { body, userIndex } = request;

  mockUsers[userIndex] = {
    ...mockUsers[userIndex],
    body,
  };
  return response.status(200).send(mockUsers[userIndex]);
});

router.delete("/api/users/:id", (request, response) => {
  const {
    body,
    params: { id },
  } = request;
  const parsedId = parseInt(id);
  if (isNaN(parsedId))
    return response.status(400).send({ msg: "Invalid User ID" });

  const userIndex = mockUsers.findIndex((user) => user.id === parsedId);

  if (userIndex === -1)
    return response.status(404).send({ msg: "User Not Found!" });
  mockUsers.splice(userIndex, 1);
  return response.status(200).send(mockUsers[userIndex]);
});

export default router;
