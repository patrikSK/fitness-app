import bcrypt from "bcrypt"
import jsonwebtoken from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
import jwt_decode from "jwt-decode"

const pathToKey = path.join(__dirname, '..', 'id_rsa_priv.pem')
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8')

/**
 * -------------- HELPER FUNCTIONS ----------------
 */

/**
 * 
 * @param {*} password - The plain text password
 * @param {*} hashedPassword - The hashed password stored in the database
 * 
 * This function uses the bcrypt library to decrypt the hashed password and then compares
 * the decrypted password with the password that the user provided at login
 */
function validPassword(password: any, hashedPassword: any) {

    return bcrypt.compare(password, hashedPassword)
    
}

/**
 * 
 * @param {*} password - The password string that the user inputs to the password field in the register form
 * 
 * This function takes a plain text password and creates a hashed password
 */
function genPassword(password: any) {

    return bcrypt.hash(password, 10)

}


/**
 * @param {*} user - The user object.  We need this to set the JWT `sub` payload property to the database user ID
 */
function issueJWT(user: any) {
  const id = user.id;

  const expiresIn = '1d';

  const payload = {
    sub: id,
    iat: Date.now()
  };

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn
  }
}

/**
 * 
 * @param {*} Bearer - the Bearer token sended from client
 * 
 * This function decrypts Bearer token sended from user and extract the user ID
 */
function getIdFromToken(Bearer: any) {
  let token = Bearer.split(" ")[1]
  let decoded = jwt_decode(token)
  return decoded.sub
}


export {
    validPassword,
    genPassword,
    issueJWT,
    getIdFromToken
}
