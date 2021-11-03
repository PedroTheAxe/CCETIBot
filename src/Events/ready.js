const Event = require("../Structures/Event.js");

module.exports = new Event("ready", (client) => {

    client.on("ready", () => console.log("Bot is online"));

});