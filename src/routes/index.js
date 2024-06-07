"use strict";

import express from "express";

import { isAdmin, isAuth } from "../middlewares/auth.middleware.js";
import { checkToken, signIn, signUp } from "../controllers/users.controller.js";
import template from "../controllers/template.js";
import { AllRecords } from "../controllers/records.controller.js";

const api = express.Router();

//Users
api.post("/signup", signUp);
api.post("/login", signIn);

// //Productos
// api.post('/product', auth.isAdmin, productCtrl.Create)
// api.get('/product/:key', productCtrl.Get)
// api.get('/product/n/:name', productCtrl.GetByName)
// api.delete('/product/:key',auth.isAdmin, productCtrl.Delete)
// api.put('/product/:key',auth.isAdmin, productCtrl.Edit)

// //ordenes
// api.get('/order',auth.isAuth, orderCtrl.List)
// api.get('/order/:key',auth.isAuth, orderCtrl.Get)
// api.post('/order',auth.isAuth, orderCtrl.Create)
// api.delete('/order/:key',auth.isAdmin, orderCtrl.Delete)
api.get("/new", isAuth, template);

api.get("/user", isAdmin, (req, res) => {
  res.send([req.user]);
});

api.get("/checktoken", checkToken);

api.get("/records", isAuth, AllRecords);

export default api;
