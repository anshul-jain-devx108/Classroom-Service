// const admin = require("firebase-admin");
// const dotenv = require("dotenv");
// const fs = require("fs");

// dotenv.config(); // Load environment variables

// const serviceAccountPath = process.env.FIREBASE_CREDENTIALS;

// if (!serviceAccountPath) {
//     throw new Error("FIREBASE_CREDENTIALS environment variable is not set.");
// }

// const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
// });

// const db = admin.firestore();
// module.exports = db;


// const admin = require("firebase-admin");
// const dotenv = require("dotenv");

// dotenv.config(); // Load environment variables

// // Ensure all required Firebase credentials are present
// if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_PRIVATE_KEY || !process.env.FIREBASE_CLIENT_EMAIL) {
//     throw new Error("❌ Missing Firebase environment variables!");
// }

// // Initialize Firebase Admin SDK
// const firebaseConfig = {
//     type: process.env.FIREBASE_TYPE,
//     project_id: process.env.FIREBASE_PROJECT_ID,
//     private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
//     private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"), // Fix multiline private key
//     client_email: process.env.FIREBASE_CLIENT_EMAIL,
//     client_id: process.env.FIREBASE_CLIENT_ID,
//     auth_uri: process.env.FIREBASE_AUTH_URI,
//     token_uri: process.env.FIREBASE_TOKEN_URI,
//     auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
//     client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
//     universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
// };

// if (!admin.apps.length) {
//     admin.initializeApp({
//         credential: admin.credential.cert(firebaseConfig),
//     });
// }

// const db = admin.firestore(); // ✅ Firestore instance

// module.exports = { admin, db };

const admin = require("firebase-admin");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_PRIVATE_KEY || !process.env.FIREBASE_CLIENT_EMAIL) {
    throw new Error("❌ Missing Firebase environment variables!");
}

// Parse Firebase private key properly
const serviceAccount = {
    type: "service_account",
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"), // Fix multiline private key
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
};

// Initialize Firebase Admin
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}


// Ensure Firestore instance is initialized
const db = admin.firestore();
console.log("✅ Firestore initialized:", !!db); // Debugging Log

module.exports = { admin, db };
