const admin = require("./firebaseAdminConfig")
let db = admin.firestore();
// let a = db.collection("users");
module.exports = db
