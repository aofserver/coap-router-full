const coap = require("coap");
const app = require("./app");

const coapTiming = {
    ackTimeout: 0.25,
    ackRandomFactor: 1.0,
    maxRetransmit: 3,
    maxLatency: 2,
    piggybackReplyMs: 10
}
coap.updateTiming(coapTiming)
const server = coap.createServer(app);
var PORT = 5683
server.listen(PORT, () => {
    console.log(`The CoAP server is now running port ${PORT}.\n` + app.help);
});
