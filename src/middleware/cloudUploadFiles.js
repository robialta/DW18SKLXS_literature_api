const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { cloudinary } = require("../../config/cloudinary");

exports.cloudUploadFiles = (fieldName) => {
    return (req, res, next) => {
        const storage = new CloudinaryStorage({
            cloudinary,
            filename: (req, file, cb) => {
                fieldName === "literature"
                    ? cb(
                          null,
                          req.body.title
                              .toLowerCase()
                              .replace(/ /g, "_")
                              .slice(0, 50)
                      )
                    : cb(
                          null,
                          fieldName + "_" + req.params.id + "_" + Date.now()
                      );
            },
            params: {
                folder: `literature/${fieldName}s`,
                public_id: (req, res) =>
                    fieldName === "literature"
                        ? req.body.title
                              .toLowerCase()
                              .replace(/ /g, "_")
                              .slice(0, 50)
                        : fieldName + "_" + req.params.id + "_" + Date.now(),
            },
        });

        const upload = multer({
            storage,
        }).single(fieldName);

        upload(req, res, (err) => {
            if (err) {
                return res.status(400).send(err);
            } else if (err) {
                return res.status(400).send(err);
            }
            return next();
        });
    };
};
