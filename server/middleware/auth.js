import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.cookies.token;
    console.log(token);
    if (!token) {
      return res.status(403).json({ message: "Please login it" });
    }
    // console.log("the token is");
    // console.log(token);
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    // res.cookie("token", "", { expires: new Date(0) });
    res.status(403).json({ message: "Please login" });
  }
};
