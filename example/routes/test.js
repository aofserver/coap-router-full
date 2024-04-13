const Router = require("../../lib/router");
const router = Router();


router.get("/", (req, res) => {
    console.log("[ payload ]",req.payload)
    console.log("[ query ]",req.query)
    console.log("[ params ]",req.params)
    console.log("\n")

    res.status(200).json({ test: "test api get." });
});

router.post("/", (req, res) => {
    console.log("[ payload ]",req.payload)
    console.log("[ query ]",req.query)
    console.log("[ params ]",req.params)
    console.log("\n")
    res.status(200).json({ test: "test api post." });
});

router.post("/echo", (req, res) => {
    console.log("[ payload ]",req.payload)
    console.log("[ query ]",req.query)
    console.log("[ params ]",req.params)
    console.log("\n")

    let resp = { ...JSON.parse(req.payload) ,timestamp: new Date().getTime() }
    res.status(200).json(resp);
});

router.get("/:testparams", (req, res) => {
    console.log("[ payload ]",req.payload)
    console.log("[ query ]",req.query)
    console.log("[ params ]",req.params)
    console.log("\n")

    let resp = { timestamp: new Date().getTime() }
    res.status(200).json(resp);
});

router.post("/:testparams", (req, res) => {
    console.log("[ payload ]",req.payload)
    console.log("[ query ]",req.query)
    console.log("[ params ]",req.params)
    console.log("\n")

    let resp = { timestamp: new Date().getTime() }
    res.status(200).json(resp);
});


module.exports = router;
