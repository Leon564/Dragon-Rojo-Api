"use strict";

// const services = require('../services/auth.service')
// const firebase = require('../db/firebase')
import { decodeToken, createToken } from "../services/auth.service.js";
import { checkUser } from "../services/firebase.service.js";

export const isAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: "No tienes autorización" });
  }

  const token = req.headers.authorization.split(" ")[1];

  decodeToken(token)
    .then((response) => {
      checkUser(response).then((result) => {
        if (!result)
          return res.status(401).send({ message: "El usuario ya no existe" });
        req.user = response;
        next();
      });
    })
    .catch((response) => {
      res.status(response.status);
    });
};

export const isAdmin = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: "No tienes autorización" });
  }

  const token = req.headers.authorization.split(" ")[1];

  decodeToken(token)
    .then((response) => {
      checkUser(response).then((result) => {
        if (!result)
          return res.status(401).send({ message: "El usuario ya no existe" });
        if (result.role != "admin")
          return res.status(403).send({ message: "No tienes autorización" });
        req.user = response;
        next();
      });
    })
    .catch((response) => {
      res.status(response.status);
    });
};
