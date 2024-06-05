// const admin = require("firebase-admin");
// var utils = require("leonn-utils");
// const config = require("../config");
import admin from "firebase-admin";
import config from "../configs/firebase.configs.js";
//var serviceAccount = require("./api-users-86678-firebase-adminsdk-jjep8-466b6a016f");
const adminConfig = {
  projectId: config.projectId,
  privateKey: config.privateKey.replace(/\\n/g, "\n"),
  clientEmail: config.clientEmail,
};

admin.initializeApp({
  credential: admin.credential.cert(adminConfig),
  databaseURL: config.dataBaseURL,
});

export const db = admin.database();

export const verificarEmail = (email) => {
  const eventref = db.ref("users");
  return eventref
    .orderByChild("email")
    .equalTo(email)
    .limitToFirst(1)
    .once("value")
    .then((snapshot) => {      
      return Object.values(snapshot.val())[0];
    });
};

export const verificarUsers = async () => {
  const eventref = db.ref("users");
  return eventref
    .orderByChild("role")
    .equalTo("admin")
    .limitToFirst(1)
    .once("value")
    .then((snapshot) => {
      return snapshot.val();
    });
};

