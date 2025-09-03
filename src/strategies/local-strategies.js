import passport from "passport";
import { Strategy } from "passport-local";
import { mockUsers } from "../utils/constant.js";
import { MockUser } from "../mongoose/schemas/user.js";
import { comparePassword } from "../utils/helpers.js";

passport.serializeUser((user, done) => {
  console.log("inside serialize user");
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log("inside deserializer");
  console.log(`destructiong user id: ${id}`);
  try {
    const findUser = await MockUser.findById(id);
    if (!findUser) throw new Error("User not found");
    done(null, findUser);
  } catch (error) {
    done(error, null);
  }
});

export default passport.use(
  new Strategy({ usernameField: "name" }, async (username, password, done) => {
    console.log(username, password);
    console.log("passsport-local middleware");
    try {
      const findUser = await MockUser.findOne({ name: username });
      if (!findUser) throw new Error("User not found");
      if (!comparePassword(password, findUser.password))
        throw new Error("Bad Credentials");
      done(null, findUser);
    } catch (error) {
      done(error, null);
    }
  })
);
