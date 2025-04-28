//@ts-check
const bcrypt = require("bcrypt");

const pass = "foxajawew";
async function hash_pass(params) {
  const hashedPassword = await bcrypt.hash(pass, 10);
  console.log(hashedPassword);
}

hash_pass();
