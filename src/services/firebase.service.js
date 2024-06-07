import admin from "firebase-admin";

export const db = admin.database();

export const checkUser = async (identifier) => {
  const eventref = db.ref("users");
  
  const queries = [
    eventref.orderByChild("email").equalTo(identifier).limitToFirst(1).once("value"),
    eventref.orderByChild("username").equalTo(identifier).limitToFirst(1).once("value")
  ];
  
  const [emailSnapshot, usernameSnapshot] = await Promise.all(queries);

  const emailData = emailSnapshot.val();
  const usernameData = usernameSnapshot.val();

  if (emailData) return Object.values(emailData)[0];
  if (usernameData) return Object.values(usernameData)[0];

  return null;
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


export const getAllRecord = async () => {
  const eventref = db.ref("certificates");
  const count = await eventref.count().get();
  console.log(count.data().count);
  return count.data().count;
};
