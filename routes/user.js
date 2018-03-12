// require modules
const express = require('express');
const router = express.Router();

const UserController = require('./controllers/user');
const checkAuth = require('./middleware/check-auth');


//handle incoming signup, login and DELETE requests to /user
route.post("/signup", UserController.user_sign_up);

route.post("/login", UserController.user_login_in);

route.delete("/:userId", checkAuth, UserController.user_delete_user);

module.exports = router;
