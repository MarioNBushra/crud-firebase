
var admin = require("firebase-admin");

var serviceAccount = require("./crud-2aad3-firebase-adminsdk-tkk1a-f948a2238a.json");




admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin