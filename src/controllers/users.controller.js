"use strict";
import User from "../models/user.model.js";
import {
  verificarEmail,
  verificarUsers,
  db,
} from "../services/firebase.service.js";
import { createToken, decodeToken } from "../services/auth.service.js";
import config from "../configs/app.configs.js";
import bcrypt from "bcrypt";

const SALT_ROUNDS = Number(config.SALT_ROUNDS || 10);

export const signUp = async (req, res) => {
  if (!req.body.username || !req.body.email || !req.body.password)
    return res.status(400).send({ message: "Se requieren todos los datos" });
  const typeAccount = (await verificarUsers()) ? "user" : "admin";
  const password = await bcrypt.hash(req.body.password, SALT_ROUNDS);
  const user = User(req.body.username, req.body.email, password, typeAccount);
  const emailCheck = await verificarEmail(user.email);
  if (emailCheck)
    return res.status(500).send({
      message: `Error al crear el usuario: El correo ya esta registrado`,
    });
  db.ref("users").push(user);
  return res.status(201).send({ token: createToken(user), typeAccount });
};

export const signIn = async (req, res) => {
  if (!req.body.email)
    return res
      .status(400)
      .send({ message: "Se requieren las credenciales de inicio" });
  verificarEmail(req.body.email).then(async (user) => {
    if (!user) return res.status(404).send({ message: "No existe el usuario" });
    //console.log(user.password);

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match)
      return res.status(401).send({ message: "Contraseña incorrecta" });

    req.user = user;
    res.status(200).send({
      message: "Te has logueado correctamente",
      token: createToken(user),
    });
  });
};
