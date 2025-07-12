import passport from "passport";
import { Strategy } from "passport-local";

passport.use(
    new Strategy({usernameField:"name"},(username,password, done)=>{
        
    })
)