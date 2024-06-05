"use strict";

import admin from "firebase-admin";
import config from "./configs/firebase.configs.js";

const adminConfig = {
  projectId: config.projectId,
  privateKey: config.privateKey.replace(/\\n/g, "\n"),
  clientEmail: config.clientEmail,
};

const initializeFirebase = () => {
  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
    databaseURL: config.dataBaseURL,
  });
};

const startServer = async () => {
  const app = (await import("./app.js")).default;
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`API REST running on http://localhost:${port}`);
  });
};

(async () => {
  try {
    initializeFirebase();
    await startServer();
  } catch (error) {
    console.error(error);
  }
})();
