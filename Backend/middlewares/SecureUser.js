import jwt from "jsonwebtoken";
import Users from "../models/userModel.js";

const secureUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    // console.log(token);
    if (!token) {
      return res.status(401).json({ error: " Not a valid token" });
    }
    

    const decode = jwt.verify(token, process.env.JWT_KEY);
    // console.log(decode);
    if (!decode) {
      return res.status(402).json({ error: "Token not fount" });
    }

    const user = await Users.findById(decode.id).select("-password");
    // console.log(user);
    if (!user) {
      return res.status(403).json({ error: "user not fount (secureUser)" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in secureRoute: ", error);
    res.status(500).json({ error: "Internal server error {SecureUser}" });
  }
};

export default secureUser;