const firebaseConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  dataBaseURL: process.env.FIREBASE_CLIENT_DATABASE_URL,
};

export default firebaseConfig;