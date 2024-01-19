const jwt = require("jsonwebtoken");


const authenticateUser = (req, res, next) => {
  let token = req.header("Authorization");
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Authorization token is required" });
  }
  token = token.replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)
    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authenticateUser;
