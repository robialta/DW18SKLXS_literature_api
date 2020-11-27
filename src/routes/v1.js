const express = require("express");
const router = express.Router();
const { cloudUploadFiles } = require("../middleware/cloudUploadFiles");

const { register, login, checkAuth } = require("../controllers/auth");
const { authenticated } = require("../middleware/authentication");
const {
    collection,
    addCollection,
    removeCollection,
} = require("../controllers/collection");
const { updateProfile, profile, getUsers } = require("../controllers/user");
const {
    getLiteratures,
    addLiterature,
    searchLiterature,
    myLiteratures,
    detailLiterature,
    updateLiterature,
    deleteLiterature,
} = require("../controllers/literature");

router.post("/register", register);
router.post("/login", login);
router.get("/auth", authenticated, checkAuth);
router.get("/profile/:id", authenticated, profile);
router.get("/users", authenticated, getUsers);
router.patch("/updateprofile/:id", authenticated, updateProfile);
router.post(
    "/uploadprofile/:id",
    authenticated,
    cloudUploadFiles("photo"),
    (req, res) => {
        const uploadedFileNAme = req.file.filename;
        res.send({ message: "Success", data: uploadedFileNAme });
    }
);

router.get("/literatures", authenticated, getLiteratures);
router.get("/literature/:id", authenticated, detailLiterature);
router.get("/myliteratures/:id", authenticated, myLiteratures);
router.patch("/literature/:id", authenticated, updateLiterature);
router.delete("/literature/:id", authenticated, deleteLiterature);
router.get("/search", authenticated, searchLiterature);
router.post(
    "/literature",
    authenticated,
    cloudUploadFiles("literature"),
    addLiterature
);

router.get("/mycollections/:id", authenticated, collection);
router.post("/addcollection", authenticated, addCollection);
router.delete("/removecollection/:id", authenticated, removeCollection);

module.exports = router;
