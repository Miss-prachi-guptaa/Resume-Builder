import { Users } from "../schema/userSchema.js";

import { comparePassword, generateToken, hashPassword } from "../services/auth.services.js";


export const getRegistrationPage = (req, res) => {
  if (req.user) return res.redirect("/");
  return res.render("auth/register");
}

export const postRegistrationPage = async (req, res) => {
  if (req.user) return res.redirect("/");
  const { name, email, password } = req.body;
  console.log(name, email, password);

  // Check if user already exists
  const users = await Users.findOne({ email });
  if (users) {
    return res.redirect('/register');
  }
  const hashedPassword = await hashPassword(password);
  // Insert into model
  const user = await Users.create({ name, email, password: hashedPassword });


  return res.redirect("/login");

}

export const getLoginPage = (req, res) => {
  if (req.user) return res.redirect("/");
  return res.render("auth/login");
}

export const postLogin = async (req, res) => {
  if (req.user) return res.redirect("/");
  // check email exit in db then login

  const { email, password } = req.body;
  console.log(email, password);

  const user = await Users.findOne({ email });
  console.log(user)
  if (!user)
    return res.redirect("/login");

  const isPasswordValid = await comparePassword(user.password, password);
  // if (user.password !== password)
  //   return res.redirect("/login");

  if (!isPasswordValid) return res.redirect("/login");
  // res.cookie('isLoggedIn', true);
  const token = generateToken({
    id: user.id,
    name: user.name,
    email: user.email,
  });

  res.cookie("access_token", token);

  return res.redirect("/");
}

export const logoutUser = (req, res) => {
  res.clearCookie("access_token");
  res.redirect("/login");
}