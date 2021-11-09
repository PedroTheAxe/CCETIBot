const Discord = require("discord.js");

function runFunction(client, ...eventArgs) {}

class Event {
    constructor(event, runFunction) {
        this.event = event;
        this.run = runFunction;
    }
}

module.exports = Event;