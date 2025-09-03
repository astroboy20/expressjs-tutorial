import bcrypt from "bcrypt";

const saltRounds = 10;
export const hashPassword =async  (password) => {
    console.log(password,"password")
  const salt = bcrypt.genSaltSync(saltRounds);
  console.log(salt)
  return bcrypt.hashSync(password, salt);
};

export const comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}