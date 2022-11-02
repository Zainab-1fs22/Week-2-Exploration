const express = require("express");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

// Set up Global configuration access
dotenv.config();
const app = express();

let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is up and running on ${PORT} ...`);
});

app.post("/user/generateToken", (req, res) => {
  // Validates User & then generates JWT
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let data = {
    time: Date(),
    userId: 12,
  };
  const token = jwt.sign(data, jwtSecretKey);
  res.send(token);
});

app.get("/user/validateToken", (req, res) => {
  // Tokens passed in the header of the request for security.
  let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
    const token = req.header(tokenHeaderKey);
    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      return res.send("Successfully Verified");
    } else {
      return res.status(401).send(error);
    }
  } catch (error) {
    return res.status(401).send(error);
  }
});
