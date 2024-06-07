"use strict";

// const jwt = require('jwt-simple')
// const moment = require('moment')
// const config = require('../config')
import jwt from "jwt-simple";
import moment from "moment";
import config from "../configs/app.configs.js";

export const createToken = (user, remeberMe = false) => {
  const payload = {
    sub: user.email,
    us: user.username,
    iat: moment().unix(),
    exp: remeberMe
      ? moment().add(30, "days").unix()
      : moment().add(1, "days").unix(),
  };
  return jwt.encode(payload, config.SECRET_TOKEN);
};

export const decodeToken = (token) => {
  const decoded = new Promise((resolve, reject) => {
    try {
      const payload = jwt.decode(token, config.SECRET_TOKEN);

      if (payload.exp <= moment().unix()) {
        reject({
          status: 401,
          message: "El token ha expirado",
        });
      }
      resolve({email: payload.sub, username: payload.us});
    } catch (err) {
      reject({
        status: 500,
        message: "Invalid Token",
      });
    }
  });

  return decoded;
};
