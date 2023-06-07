# coap-router-full [![npm version](https://badge.fury.io/js/coap-router-full.svg)](https://badge.fury.io/js/coap-router-full)
A quick demo on how to leverage web router to build [CoAP (Constrained Application Protocol)](https://en.wikipedia.org/wiki/Constrained_Application_Protocol) server.

## Reference the source code
[Github](https://github.com/MagicCube/coap-router)

## 1. Motivation
Currently I'm working on a Node.js based IoT (Internet of Things) platform. It allows Node.js powered DTU (Data Transfer Unit) to serve as CoAP server on smart devices like Raspberry PI.

When you design a Node.js based HTTP server, web router is one of your best choices to manage incoming requests from clients. Unfortunately, CoAP doesn't have one like Express Router, this project is to demonstrate how to leverage web router concept to simplify CoAP server implementation.



## 2.Usage

Inspired by many other JavaScript routers, `coap-router` does almost the same recursive routing as [Express.Router](http://expressjs.com/en/guide/routing.html).

Let's take a look at the example.

#### Example

##### ./server.js

```js
const coap = require("coap");
const app = require("./app");
const server = coap.createServer(app);
server.listen(() => {
    console.log("The CoAP server is now running.\n" + app.help);
});
```

##### ./app.js

```js
const Router = require("coap-router-full");
const app = Router();

app.get("/", (req, res) => {
    res.end("Hello, world");
});

app.use("/test", require("./routes/test"));

module.exports = app;
```

##### ./routes/test.js
```js
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
```



## 3. How to Install
### 3.1 Basic Requirements

* Node.js 6 or above
* UDP compatible network connected

### 3.2 Installation

```sh
$ npm install
```



## 4. How to Test

### 4.1 Install CoAP Client

Although there're dozens of CoAP clients available, one of the easiest ways is to install Node.js based client named `coap-cli`.

```sh
$ npm install coap-cli -g
$ coap
```

### 4.2 Tests

1. Start example server. By default the CoAP server is listening at port 5683.

   ```sh
   $ npm start
   ```

2. Get literal resource.

   ```sh
   $ coap get "coap://127.0.0.1:5683/"
   ```

2. TEST API.
   ```sh
   $ coap get "coap://127.0.0.1:5683/test"
   $ coap post "coap://127.0.0.1:5683/test"
   $ coap get "coap://127.0.0.1:5683/test/abc?de=fg"
   $ coap post "coap://127.0.0.1:5683/test/abc?de=fg" -p "{'temp':100}"
   $ coap post "coap://localhost/test/echo" -p "{'abc':123}"
   ```

   ​
