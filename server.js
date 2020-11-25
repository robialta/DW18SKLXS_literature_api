const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./src/routes/v1");

const app = express();
const port = process.env.port || 5100;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Wellcome to Literature Production");
});

app.use("/api/v1/", router);

app.listen(port, () => {
    console.log("Aplication running on port " + port);
});
