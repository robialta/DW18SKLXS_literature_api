const express = require("express");
const cors = require("cors");
const router = require("./src/routes/v1");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Wellcome to Literature Production");
});

app.use("/api/v1/", router);

app.listen(port, () => {
    console.log("Aplication running on http://localhost:" + port);
});
