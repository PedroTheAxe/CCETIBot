const Command = require("../../Structures/Command.js");
const Discord = require("discord.js");

module.exports = new Command({
	name: "module1",
	description: "Shows the first channel's content",
	type: "BOTH",
	slashCommandOptions: [],
	permission: "SEND_MESSAGES",
	async run(channel, client) {
		const embed = new Discord.MessageEmbed();
		
		embed
			.setTitle("TITULO 9")
			.setDescription("DESCRICAO 9")
			.setColor("BLURPLE")
			.setThumbnail("https://www.ulisboa.pt/sites/ulisboa.pt/files/styles/logos_80px_vert/public/uo/logos/logo_ist.jpg?itok=2NCqbcIP")
			.setTimestamp()
		console.log(channel.id);
		client.channels.cache.get(channel.id).send({ embeds: [embed] });
	}
});