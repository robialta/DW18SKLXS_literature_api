const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: "robialta",
    api_key: "837955293963166",
    api_secret: "lmvknaUie9v6Z50jn9GVWgR7pDo",
});

module.exports = { cloudinary };
