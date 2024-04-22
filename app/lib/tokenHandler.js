import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { header } from "express-validator";
import { createHash } from "crypto";
config();

// ACCESS_TOKEN_SECRET=57324ea6126309785056304ee1d2df1620d875f47276dd3c62d7a1b8656f0c0b
// REFRESH_TOKEN_SECRET=f1e87ea2c6725855bdd406298a6d426daa22a9b14d9c0edd94ed5f1ed7eaf683
// ACCESS_TOKEN_EXPIRY=3600  # Expiration time in seconds
// REFRESH_TOKEN_EXPIRY=86400 # Expiration time in seconds


export const generateToken = (data, access = true) => {
  const secret = access ? process.env.ACCESS_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET;
  const expiry = access ? process.env.ACCESS_TOKEN_EXPIRY : process.env.REFRESH_TOKEN_EXPIRY;

  // const secret = access ? "57324ea6126309785056304ee1d2df1620d875f47276dd3c62d7a1b8656f0c0b" : "f1e87ea2c6725855bdd406298a6d426daa22a9b14d9c0edd94ed5f1ed7eaf683";
  // const expiry = access ? 3600 : 86400;

  if (!secret) {
    throw new Error("Token secret is not configured(generateToken).");
  }

  return jwt.sign(data, secret, { expiresIn: parseInt(expiry) });
};

export const verifyToken = (token, access = true) => {
  const secret = access ? process.env.ACCESS_TOKEN_SECRET : process.env.REF_TOKEN_SECRET;

  if (!secret) {
    throw new Error("Token secret is not configured.");
  }

  return jwt.verify(token, secret);
};

export const hashRefreshToken = (refreshToken) => {
  return createHash("md5").update(refreshToken).digest("hex");
};

export const tokenValidation = (isRefresh = false) => {
  let refreshText = isRefresh ? "Refresh" : "Authorization";

  return [
    header("Authorization", `Please provide your ${refreshText} token`)
      .exists()
      .not()
      .isEmpty()
      .custom((value, { req }) => {
        if (!value.startsWith("Bearer") || !value.split(" ")[1]) {
          throw new Error(`Invalid ${refreshText} token`);
        }
        if (isRefresh) {
          req.headers.refresh_token = value.split(" ")[1];
          return true;
        }
        req.headers.access_token = value.split(" ")[1];
        return true;
      }),
  ];
};
