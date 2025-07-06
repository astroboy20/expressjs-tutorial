import express, { request, response } from "express";
import routes from "./routes/index.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import { mockUsers } from "./utils/constant.js";

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser("heloworld"));
app.use(
  session({
    secret: "helloworld",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60 * 60 * 24 * 1000,
    },
  })
);
app.use(routes);

// const loginMiddleware = (request, response, next) => {
//   console.log(`${request.url}-${request.method}`);
//   next();
// };

// app.use(loginMiddleware);
const PORT = process.env.PORT || 8100;

app.get("/", (request, response) => {
  console.log(request.session);
  console.log(request.session.id);
  request.session.visited = true;
  response.cookie("hello", "world", { maxAge: 60000, signed: true });
  response.status(200).send({ msg: "Hello There!" });
});

app.post("/api/auth", (request, response) => {
  const { name, password } = request.body;

  const findUser = mockUsers.find((user) => user.name === name);
  if (!findUser || findUser.password !== password)
    return response.status(401).send({ msg: "Unauthenticated" });

  request.session.user = findUser;

  return response.status(200).send(findUser);
});

app.get("/api/auth/status", (request, response) => {
  request.sessionStore.get(request.sessionID, (err, session) => {
    console.log(session);
  });
  return request.session.user
    ? response.status(200).send(request.session.user)
    : response.status(401).send({ msg: "Unauthenticated" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
