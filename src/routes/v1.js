const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const uploadFIle = (fieldName) => {
    const diskStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `uploads/${file.fieldname}s`);
        },
        filename: (req, file, cb) => {
            fieldName === "literature"
                ? cb(
                      null,
                      `${
                          req.body.title
                              .toLowerCase()
                              .replace(/ /g, "_")
                              .slice(0, 50) + path.extname(file.originalname)
                      }`
                  )
                : cb(
                      null,
                      `${
                          fieldName +
                          Date.now() +
                          path.extname(file.originalname)
                      }`
                  );
        },
    });
    const upload = multer({
        storage: diskStorage,
    }).single(fieldName);

    return (req, res, next) => {
        upload(req, res, (err) => {
            return next();
        });
    };
};

const { register, login, checkAuth } = require("../controllers/auth");
const { authenticated } = require("../middleware/authentication");
const { collection, addCollection } = require("../controllers/collection");
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
    "/uploadprofile",
    authenticated,
    uploadFIle("photo"),
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
    uploadFIle("literature"),
    addLiterature
);

router.get("/mycollections/:id", authenticated, collection);
router.post("/addcollection", authenticated, addCollection);

module.exports = router;
