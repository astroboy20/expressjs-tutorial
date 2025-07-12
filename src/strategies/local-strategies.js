import passport from "passport";
import { Strategy } from "passport-local";
import { mockUsers } from "../utils/constant.js";

passport.serializeUser((user, done) => {
    console.log("inside serialize user")
    console.log(user)
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log("inside deserializer")
    console.log(`destructiong user id: ${id}`)
  try {
    const findUser = mockUsers.find((user) => user.id === id);
    if (!findUser) throw new Error("User not found");
    done(null, findUser);
  } catch (error) {
    done(error, null);
  }
});

export default passport.use(
  new Strategy({ usernameField: "name" }, (username, password, done) => {
    console.log(username, password);
    console.log("passsport-local middleware")
    try {
      const findUser = mockUsers.find((user) => user.name === username);
      if (!findUser) throw new Error("User not found");
      if (findUser.password !== password)
        throw new Error("Invalid Credentials");
      done(null, findUser);
    } catch (error) {
      done(error, null);
    }
  })
);
