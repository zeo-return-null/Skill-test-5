import bcrypt from "bcrypt";

const encryptPassword = async (password) => {
  const saltRounds = 8;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);

  return hash;
};

const comparePassword = async (password, userPassword) => {
  const validation = await bcrypt.compare(password, userPassword);
  return validation;
};

export { encryptPassword, comparePassword };
