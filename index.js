const { Client } = require("klasa");
const { config, token } = require("./config");

class Sparky extends Client {

    constructor(...args) {
        super(...args);

        // Add any properties to your Klasa Client
    }

    // Add any methods to your Klasa Client

}

new Sparky(config).login(token || process.env.token);
