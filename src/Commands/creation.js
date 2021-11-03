const Command = require("../Structures/Command.js");

module.exports = new Command({

    name: "creation",
    description: "Showcases account creation",

    async run(message, args, client) {

        message.reply(`Acccount creation: ${message.author.createdAt.toUTCString()} ms`);
    }
});