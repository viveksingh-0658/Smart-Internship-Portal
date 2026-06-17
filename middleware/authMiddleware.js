// const jwt = require("jsonwebtoken");

// const protect = async (req, res, next) => {
//   try {
//     let token;

//     if (
//       req.headers.authorization &&
//       req.headers.authorization.startsWith("Bearer")
//     ) {
//       token = req.headers.authorization.split(" ")[1];

//       const decoded = jwt.verify(
//         token,
//         process.env.JWT_SECRET
//       );

//       req.user = decoded;

//       next();
//     } else {
//       return res.status(401).json({
//         success: false,
//         message: "No Token, Authorization Denied",
//       });
//     }
//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       message: "Invalid Token",
//     });
//   }
// };

// module.exports = protect;

// const jwt = require("jsonwebtoken");

// const protect = (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader) {
//       return res.status(401).json({
//         message: "No token provided",
//       });
//     }

//     const token = authHeader.replace("Bearer ", "");

//     const decoded = jwt.verify(
//       token,
//       process.env.JWT_SECRET
//     );

//     req.user = decoded;

//     next();
//   } catch (error) {
//     console.log(error);
//     return res.status(401).json({
//       message: "Invalid Token",
//     });
//   }
// };

// module.exports = protect;


const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const token = authHeader.replace("Bearer ", "");

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access Denied",
      });
    }

    next();
  };
};

module.exports = {
  protect,
  authorize,
};