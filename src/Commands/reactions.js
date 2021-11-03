const { MessageEmbed } = require("discord.js");
const Command = require("../Structures/Command.js");
const Discord = require("discord.js");

const module1 = require("../Commands/content/module1.js");
const module2 = require("../Commands/content/module2.js");
const module3 = require("../Commands/content/module3.js");
const module4 = require("../Commands/content/module4.js");
const module5_6 = require("../Commands/content/module5-6.js");
const module7 = require("../Commands/content/module7.js");
const module8 = require("../Commands/content/module8.js");
const module9 = require("../Commands/content/module9.js");
const module10 = require("../Commands/content/module10.js");

module.exports = new Command({

    name: "reactions",
	description: "Start quiz",
	type: "BOTH",
	slashCommandOptions: [],
	permission: "SEND_MESSAGES",

    async run(message, args, client) {

        const embed = new Discord.MessageEmbed();

        const channel = "897131627770175508";
        const part1 = message.guild.roles.cache.find(role => role.name === "Part1");

        const part1Emoji = '✅'

        embed
			.setTitle("Welcome!")
			.setDescription(
				"Click the green mark emoji to start"
			)
			.setColor("BLURPLE")
			.setThumbnail("https://www.ulisboa.pt/sites/ulisboa.pt/files/styles/logos_80px_vert/public/uo/logos/logo_ist.jpg?itok=2NCqbcIP")
			.setTimestamp()

		let reactMessage = await message.reply({ embeds: [embed] });
        reactMessage.react(part1Emoji);
        
        async function makeChannel(guild, user) {

            let category = guild.channels.create(user.username, {
                type: 'GUILD_CATEGORY',
                permissionOverwrites: [
                    {
                      id: guild.id, // shortcut for @everyone role ID
                      deny: 'VIEW_CHANNEL'
                    },
                    {
                      id: user.id,
                      allow: 'VIEW_CHANNEL'
                    }
                  ]
            })
            let idx = 1;
            for(; idx < 11; idx++) {
                let name = user.username + "-" + idx;
                if (idx == 6) {
                    continue;
                } else if (idx == 5) {
                    name = user.username + "- 5and6";
                }
                await guild.channels.create(name, {
                    type: 'text',
                    permissionOverwrites: [
                    {
                        id: guild.id, // shortcut for @everyone role ID
                        deny: 'VIEW_CHANNEL'
                    },
                    {
                        id: user.id,
                        allow: 'VIEW_CHANNEL'
                    }]
                }).then(channel => {
                    let category = guild.channels.cache.find(c => c.name == user.username && c.type == "GUILD_CATEGORY");
                    console.log("PARENT - " + channel.id);
                    channel.setParent(category.id);
                    switch(idx) {
                        case 1:
                            module1.run(channel, client);
                            break;
                        case 2:
                            module2.run(channel, client);
                            break;
                        case 3:
                            module3.run(channel, client);
                            break;
                        case 4:
                            module4.run(channel, client);
                            break;
                        case 5:
                            module5_6.run(channel, client);
                            break;
                        case 7:
                            module7.run(channel, client);
                            break;
                        case 8:
                            module8.run(channel, client);
                            break;
                        case 9:
                            module9.run(channel, client);
                            break;
                        case 10:
                            module10.run(channel, client);
                            break;
                    }
                });
            }
        }

        client.on('messageReactionAdd', async (reaction, user) => {

            if (user.bot) return;
            if (!reaction.message.guild) return;
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name == part1Emoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(part1);
                    
                        makeChannel(message.guild, user);                        
                }
            } else {
                return;
            }

        });

        client.on('messageReactionRemove', async (reaction, user) => {

            if (user.bot) return;
            if (!reaction.message.guild) return;
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name == part1Emoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(part1);
                }
            } else {
                return;
            }

        });
    }
});