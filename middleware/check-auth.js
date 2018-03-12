// require module
const jwt = require('jsonwebtoken');

// set up token authentication and error.
module.exports = (req, res, next) => {
  try {
        //when you console.log the split seperates the word 'bearer' + whitespace from the token.  then we retrieve that second element which is the token value
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
  } catch (error) {
    return res.status(401).json({
      message: "auth failed"
    });
  }
};
