import express from "express";
import routes from "./routes/index.js";

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
app.use(routes);

// const loginMiddleware = (request, response, next) => {
//   console.log(`${request.url}-${request.method}`);
//   next();
// };

// app.use(loginMiddleware);
const PORT = process.env.PORT || 8100;

app.get("/", (request, response) => {
  response.cookie("hello","world",{maxAge:60000 })
  response.status(200).send({ msg: "Hello There!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
