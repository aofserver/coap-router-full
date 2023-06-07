const Router = require("../lib/router");
const app = Router();

app.help = `URL: coap://127.0.0.1:5683/
Usage:
 GET  / - Display this help document.
 GET  /test --- Test api get.
 POST /test --- Test api post.
 GET  /test/abc?de=fg --- Test api get with query string.
 POST /test/abc?de=fg -p "{'temp':100}" --- Test api post with query string and payload.`



app.get("/", (req, res) => {
    res.end(app.help);
});

app.use("/test", require("./routes/test"))


app.all("/", (req, res) => {
    res.code = 404
    res.end(Buffer.from(JSON.stringify({ msg: 'Not Found' })));
});



module.exports = app;
