const Command = require("../Structures/Command.js");

const Discord = require("discord.js");

module.exports = new Command({
	name: "embed",
	description: "Shows an embed",
	type: "BOTH",
	slashCommandOptions: [],
	permission: "SEND_MESSAGES",
	async run(message, args, client) {
		const embed = new Discord.MessageEmbed();

		const user = message instanceof Discord.CommandInteraction ? message.user : message.author;

		embed
			.setTitle("Welcome!")
			.setDescription(
				""
			)
			.setColor("BLURPLE")
			.setThumbnail("https://www.ulisboa.pt/sites/ulisboa.pt/files/styles/logos_80px_vert/public/uo/logos/logo_ist.jpg?itok=2NCqbcIP")
			.setTimestamp()
			.addFields(
				{
					name: "Bot Version",
					value: "1.0.0",
					inline: true
				},
				{
					name: "Bot Name",
					value: client.user.username,
					inline: true
				}
			);

		message.reply({ embeds: [embed] });
	}
});