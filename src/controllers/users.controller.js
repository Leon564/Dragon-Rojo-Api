"use strict";
import User from "../models/user.model.js";
import { checkUser, verificarUsers, db } from "../services/firebase.service.js";
import { createToken, decodeToken } from "../services/auth.service.js";
import config from "../configs/app.configs.js";
import bcrypt from "bcrypt";

const SALT_ROUNDS = Number(config.SALT_ROUNDS || 10);

export const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send({ message: "Se requieren todos los datos" });
  }

  const typeAccount = (await verificarUsers()) ? "user" : "admin";
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const user = { username, email, password: hashedPassword, typeAccount };

  const emailCheck = await checkUser(email);
  if (emailCheck) {
    return res.status(500).send({
      message: "Error al crear el usuario: El correo ya está registrado",
    });
  }

  const usernameCheck = await checkUser(username);
  if (usernameCheck) {
    return res.status(500).send({
      message: "Error al crear el usuario: El nombre de usuario ya está registrado",
    });
  }

  db.ref("users").push(user);
  return res.status(201).send({ token: createToken(user), typeAccount, username });
};

export const signIn = async (req, res) => {
  if (!req.body.email && !req.body.username)
    return res
      .status(400)
      .send({ message: "Se requieren las credenciales de inicio" });
  checkUser(req.body.email || req.body.username).then(async (user) => {
    if (!user) return res.status(404).send({ message: "No existe el usuario" });
    
    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match)
      return res.status(401).send({ message: "Contraseña incorrecta" });

    req.user = user;
    res.status(200).send({
      message: "Te has logueado correctamente",
      token: createToken(user, !!req?.body?.remember),
    });
  });
};

const sendUnauthorized = (res) =>
  res.status(401).send({ message: "No autorizado" });

export const checkToken = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) return sendUnauthorized(res);

    const user = await decodeToken(token);
    
    if (!user) return sendUnauthorized(res);
    
    const userCheck = await checkUser(user.email || user.username);
    if (!userCheck) return sendUnauthorized(res);

    return res.status(200).send({ message: "Autorizado", user: user});
  } catch (error) {
    return sendUnauthorized(res);
  }
};
