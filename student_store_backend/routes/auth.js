const express = require("express");
const User = require("../models/user");
const Order = require("../models/order");
const { createUserJwt } = require("../utils/tokens");
const security = require("../middleware/security");
const router = express.Router();

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.login(req.body);
    const token = createUserJwt(user);

    console.log({
      "context": "auth.js/post('/login')",
      "user": user,
      "token": token
    });

    return res.status(200).json({ user, token });
  } catch (err) {
    next(err);
  }
})

router.post("/register", async (req, res, next) => {
  try {
    const user = await User.register({ ...req.body, isAdmin: false });
    const token = createUserJwt(user);

    console.log({
      "context": "auth.js/post('/register')",
      "user": user,
      "token": token
    });

    return res.status(201).json({ user, token });
  } catch (err) {
    next(err);
  }
})

router.get("/me", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const { email } = res.locals.user;
    const user = await User.fetchUserByEmail(email);
    const orders = await Order.listOrdersForUser(user)

    console.log({
      "context": "auth.js/post('/me')",
      "email": email,
      "user": user,
      "publicUser": publicUser
    });

    return res.status(200).json({ user, orders });
  } catch(err) {
    next(err);
  }
});

module.exports = router;
