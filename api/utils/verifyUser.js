import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

// import { errorHandler } from "./error";

// const errorHandler = (statusCode, message) => {
//   const error = new Error();
//   error.statusCode = statusCode;
//   error.message = message;
//   return error;
// }; 


export const verifyUser = (req, res, next) => {
  const token = req.cookies?.access_token;
  //   console.log(token);
  if (!token) {
    return next(errorHandler(401, "Unauthorised"));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, "Unauthorised"));
    }
    req.user = user;
    next();
  });
};
