import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import jwt_decode from "jwt-decode";

type Payload = {
  sub: string;
  iat: number;
  exp: number;
};

/**
 * This function uses the bcrypt library to decrypt the hashed password and then compares
 * the decrypted password with the password that the user provided at login
 */
const validPassword = (password: string, hashedPassword: string) =>
  bcrypt.compare(password, hashedPassword);

/**
 * This function takes a plain text password and creates a hashed password
 */
const genPassword = (password: string) => bcrypt.hash(password, 10);

/**
 * This function creates new bearer token and return it with expiration date
 */
const issueJWT = async (userId: string | number) => {
  const id = userId;

  const expiresIn = "1d";

  const payload = {
    sub: id,
    iat: Date.now(),
  };

  const signedToken = jsonwebtoken.sign(payload, process.env.PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
};

/**
 * This function decrypts Bearer token sended from user and extract the user ID
 */
const getIdFromToken = (bearer: string) => {
  let token = bearer.split(" ")[1];
  let decodedToken = jwt_decode(token) as Payload;
  return decodedToken.sub;
};

export { validPassword, genPassword, issueJWT, getIdFromToken };
