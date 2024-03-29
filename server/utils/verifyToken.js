const jwt = require("jsonwebtoken");
const { createError } = require("../Service/Error");

/************
**
 Verifiy Token
**
*************/

module.exports.verifyToken = (req, res, next) => {
  const token = req.cookies.Token;
  try {
    if (token === "undefined" || !token) {
      return next(createError(401, "Unauthorized Token"));
    }
    if (token) {
      jwt.verify(token, process.env.SECRET_KEY_JWT, (err, userData) => {
        if (err) return next(createError(403, "Token is not valid !"));
        req.infoUser = userData;
        next();
      });
    }
  } catch (err) {
    return next(err);
  }
};