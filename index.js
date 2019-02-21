const { Client } = require("klasa");
const { config, token } = require("./config");

class Sparky extends Client {
}
new Sparky(config).login(token);
