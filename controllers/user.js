// require modules
const mongoose = require('mongoose');
const User = require("./models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// set up POST request for user signup
exports.user_sign_up = (req, res, next) => {
  User.find({email: req.body.email})
  .exec();
  .then(user => {
    if (user.length >= 1) {
      return res.status(409).json({
        message: "email exists"
      });
    } else {
      password: bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) {
          res.status(500).json({
            error: err
          });
        } else {
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash
          });
          user
          .save()
          .then(result => {
            console.log(result);
            res.status(201).json({
              message: "user created"
            })
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error:err
            });
          });
        }
      });
    }
  });
};
// set up POST request for user logging in
exports.user_login_in = (req, res, next) => {
  User.find({ email: req.body.email })
  .exec()
  .then(user => {
    if(user.length < 1) {
      return res.status(401).json({
        message: "auth failed"
      });
    }
    bcrypt.compare(req.body.password, user[0].password,(err, res) =>{
      if (err) {
        res.status(401).json({
          message: "Auth Fail"
        });
      }
      if (result) {
        //you can omit the callback in the sign method and place the jwt.sign in a const to run it synchonously
        const token = jwt.sign({
          email: user[0].email,
          userId: user[0]._id
        },
        process.env.JWT_KEY,
        {
          expiresIn: "1h"
        }
      );
      return res.status(200).json({
        message: "auth successful",
        token: token
      }),
      res.status(401).json({
        message: "Auth Fail"
      });
    };
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error:err
    });
  });
};
// set up to delete a user
exports.user_delete_user = (req, res, next) => {

  User.remove({_id: req.params.userId})
  .exec()
  .then(result => {
    res.status(200).json({
      message: "user has been deleted"
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error:err
    });
  });
};
