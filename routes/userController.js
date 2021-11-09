const express = require("express")

const router = express.Router()

//////////////////// S T A R T   S E T U P   M U L T E R ////////////////////
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("file");
//////////////////// E N D   S E T U P   M U L T E R ////////////////////

//////////////////// S T A R T   S E T U P   F I R E B A S E ////////////////////
const db = require("../firebase/db");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");
const { doc, setDoc, getDoc } = require("firebase/firestore");

const firebaseApp = require("../firebase/firebaseConfig");
//////////////////// E N D   S E T U P   F I R E B A S E ////////////////////





//////////////////// S T A R T   S E T U P   A P I s ////////////////////
router.post("/api/upload", upload, async (req, res) => {
    try {
      // Grab the file
      const file = req.file;
  
      // Format the filename
      const timestamp = Date.now();
      const name = file.originalname.split(".")[0];
      const type = file.originalname.split(".")[1];
      const fileName = `${name}_${timestamp}.${type}`;
  
      const storage = getStorage(firebaseApp);
  
      const storageRef = ref(storage, fileName);
  
      // 'file' comes from the Blob or File API
      const upload = await uploadBytes(storageRef, file.buffer);
      const url = await getDownloadURL(storageRef);
      console.log(url);
      res.send(url);
    } catch (error) {
      res.status(400).send(error.message);
      console.log(error);
    }
  });
  
  router.post("/api/data", async (req, res) => {
    try {
      let a = db.collection("users");
      let docRef = a.doc(req.body.id);
      const newUser = await docRef.set({
        hobby: req.body.hobby,
        age: req.body.age,
      });
      res.send({ msg: "Uploaded" });
    } catch (error) {
      res.send(error.message);
    }
  });

  router.put("/api/user/:id", async(req, res) => {
    try {
      let a = db.collection("users");
      let docRef = a.doc(req.params.id);
      const newUser = await docRef.update({
        ...req.body
      })
      res.send({ msg: "Edited Successfully" });
    } catch (error) {
      res.status(400).send(error.message)
    }
  })

  router.delete("/api/user/:id", async(req, res) => {
    try {
      let a = db.collection("users");
      let docRef = a.doc(req.params.id);
      const deletedUser = await docRef.delete()
      res.send({ msg: "Deleted Successfully" });
      
    } catch (error) {
      res.status(400).send(error.message)
    }
  })
  
  ///// G E T   A L L   U S E R S /////
  router.get("/api/users", async (req, res) => {
    try {
      //get all users
      const data = await db.collection("users").get();
      const dataArr = [];
  
      const dataLoop = data.forEach((doc) => {
        const data = {
          id: doc.id,
          ...doc.data(),
        };
        dataArr.push(data);
      });
  
      res.send(dataArr);
    } catch (error) {
      res.send(error.message);
    }
  });
  
  ///// G E T   S P E C I F I C   U S E R /////
  router.get("/api/users/data/:id", async (req, res) => {
    try {
      //get a specific user
      var docRef = db.collection("users").doc(req.params.id);
      const mario = await docRef.get();
      res.send(mario.data());
    } catch (error) {
      res.send(error.message);
    }
  });


  
  //////////////////// E N D   S E T U P   A P I s ////////////////////
  

module.exports = router