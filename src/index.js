import express, { request, response } from "express";

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
const PORT = process.env.PORT || 8100;
const mockUsers = [
  { id: 1, name: "John Doe", displayName: "Doe 1" },
  { id: 2, name: "Jane Doe", displayName: "Doe 2" },
  { id: 3, name: "Jim Doe", displayName: "Doe 3" },
  { id: 4, name: "Jim Doe", displayName: "Doem 3" },
];

app.get("/", (request, response) => {
  // response.send("Hwllo!")
  response.status(200).send({ msg: "Hello There!" });
});

app.get("/api/users", (request, response) => {
  console.log(request.query);
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
});

app.get("/api/users/:id", (request, response) => {
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

app.post("/api/users", (request, response) => {
  const { body } = request;
  const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body };
  mockUsers.push(newUser);
  return response.status(201).send(newUser);
});

app.put("/api/users/:id", (request, response) => {
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

app.patch("/api/users/:id", (request, response) => {
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
    ...mockUsers[userIndex],
    body,
  };
  return response.status(200).send(mockUsers[userIndex]);
});

app.delete("/api/users/:id", (request, response) => {
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
  mockUsers.splice(userIndex,1);
  return response.status(200).send(mockUsers[userIndex]);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
