import express, { request, response } from "express";
import routes from "./routes/index.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import { mockUsers } from "./utils/constant.js";
import passport from "passport";
import "./strategies/local-strategies.js";
import mongoose from "mongoose";
const app = express();

app.disable("x-powered-by");

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

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

// const loginMiddleware = (request, response, next) => {
//   console.log(`${request.url}-${request.method}`);
//   next();
// };

// app.use(loginMiddleware);
const PORT = process.env.PORT || 8100;

mongoose
  .connect(
    "mongodb+srv://tolulopeakinkunmi7:October19@cluster0.iwtkqnh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to Database");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

app.get("/", (request, response) => {
  console.log(request.session);
  console.log(request.session.id);
  request.session.visited = true;
  response.cookie("hello", "world", { maxAge: 60000, signed: true });
  response.status(200).send({ msg: "Hello There!" });
});

app.post("/api/auth", passport.authenticate("local"), (request, response) => {
  // const { name, password } = request.body;

  // const findUser = mockUsers.find((user) => user.name === name);
  // if (!findUser || findUser.password !== password)
  //   return response.status(401).send({ msg: "Unauthenticated" });

  // request.session.user = findUser;

  // return response.status(200).send(findUser);
  response.status(200).json({ msg: "Login successful", user: request.user });
});

app.get("/api/auth/status", (request, response) => {
  console.log("inside /auth/status");
  console.log(request.user);
  console.log(request.session);
  return request.user ? response.send(request.user) : response.sendStatus(401);
  // request.sessionStore.get(request.sessionID, (err, session) => {
  //   console.log(session);
  // });
  // return request.session.user
  //   ? response.status(200).send(request.session.user)
  //   : response.status(401).send({ msg: "Unauthenticated" });
});

app.post("/api/auth/logout", (request, response) => {
  if (!request.user) return response.sendStatus(401);
  request.logOut((err) => {
    if (err) return response.sendStatus(400);
    response.send(200);
  });
});
