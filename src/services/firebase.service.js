import admin from "firebase-admin";

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

