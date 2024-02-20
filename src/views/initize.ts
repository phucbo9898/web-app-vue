const admin = require("firebase-admin");
const serviceAccount = require("../../public/hello-notification-28963-firebase-adminsdk-7sghc-c3b2172a90.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

export const adminFB = admin