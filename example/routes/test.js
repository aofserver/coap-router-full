const Router = require("../../lib/router");
const router = Router();


router.get("/", (req, res) => {
    console.log("[ payload ]",req.payload)
    console.log("[ query ]",req.query)
    console.log("[ params ]",req.params)
    console.log("\n")
    writeJSON(res, { test: "test api get." });
    res.end();
});

router.post("/", (req, res) => {
    console.log("[ payload ]",req.payload)
    console.log("[ query ]",req.query)
    console.log("[ params ]",req.params)
    console.log("\n")

    writeJSON(res, { test: "test api post." });
    res.end();
});

router.post("/echo", (req, res) => {
    console.log("[ payload ]",req.payload)
    console.log("[ query ]",req.query)
    console.log("[ params ]",req.params)
    console.log("\n")

    let resp = { ...JSON.parse(req.payload) ,timestamp: new Date().getTime() }
    writeJSON(res, resp);
    res.end();
});

router.get("/:testparams", (req, res) => {
    console.log("[ payload ]",req.payload)
    console.log("[ query ]",req.query)
    console.log("[ params ]",req.params)
    console.log("\n")

    let resp = { timestamp: new Date().getTime() }
    writeJSON(res, resp);
    res.end();
});

router.post("/:testparams", (req, res) => {
    console.log("[ payload ]",req.payload)
    console.log("[ query ]",req.query)
    console.log("[ params ]",req.params)
    console.log("\n")

    let resp = { timestamp: new Date().getTime() }
    writeJSON(res, resp);
    res.end();
});

function writeJSON(res, json)
{
    res.setOption("Content-Format", "application/json");
    res.write(JSON.stringify(json));
}

module.exports = router;
