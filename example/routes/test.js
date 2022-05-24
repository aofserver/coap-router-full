const Router = require("../../lib/router");
const router = Router();


router.get("/", (req, res) => {
    console.log("[ payload ]",req.payload.toString())
    console.log("[ query ]",req.query)
    console.log("[ params ]",req.params)
    writeJSON(res, {
        test: "test"
    });
    res.end();
});

router.get("/:testparams", (req, res) => {
    console.log("[ payload ]",req.payload.toString())
    console.log("[ query ]",req.query)
    console.log("[ params ]",req.params)
    writeJSON(res, {
        test: "test",
        timestamp: new Date().getTime()
    });
    res.end();
});

router.get("/:abc/abc", (req, res) => {
    console.log("[ payload ]",req.payload.toString())
    console.log("[ query ]",req.query)
    console.log("[ params ]",req.params)
    writeJSON(res, {
        test: "test test",
        timestamp: new Date().getTime()
    });
    res.end();
});



function writeJSON(res, json)
{
    res.setOption("Content-Format", "application/json");
    res.write(JSON.stringify(json));
}

module.exports = router;
