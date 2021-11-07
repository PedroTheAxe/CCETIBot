const { MessageEmbed } = require("discord.js");
const Command = require("../Structures/Command.js");
const Discord = require("discord.js");

const module1 = require("../Commands/content/module1.js");
const module2 = require("../Commands/content/module2.js");
const module3 = require("../Commands/content/module3.js");
const module4 = require("../Commands/content/module4.js");
const module5_6 = require("../Commands/content/module5-6.js");
const module7_8 = require("../Commands/content/module7-8.js");
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
			.setTitle("Welcome to Group 9's CCETI project!")
			.setDescription(
				"With the help of our friend CCETIBot, today we will learn about effective feedback! More specifically:"
			)
            .addFields(
                { name: '1 - Defining feedback', value: '\u200b'},
                { name: '2 - Describing the 2 main objectives of giving feedback', value: '\u200b'},
                { name: '3 - Listing 5 characteristics of effective feedback', value: '\u200b'},
                { name: '4 - Describing 3 consequences of giving ineffective feedback', value: '\u200b'},
                { name: '5 - Differentiating general feedback from specific feedback', value: '\u200b'},
                { name: '6 - Converting general feedback into specific feedback', value: '\u200b'},
                { name: '7 - Defining feedforward', value: '\u200b'},
                { name: '8 - Distinguishing feedback from feedforward', value: '\u200b'},
                { name: '9 - Converting feedback into feedforward', value: '\u200b'},
                { name: '10 - Identifying, selecting and implementing 2 strategies to solicit effective feedback', value: '\u200b'},
                { name: '11 - Non-verbal feedback', value: '\u200b'},
                { name: '\u200b', value: 'Whenever you are ready, click the green checkmark emoji to start and the bot will create anonymous channels '
                                            + '(only admins and you can see them) that will help you learn and practice these topics.'},
            )
			.setColor("BLURPLE")
			.setThumbnail("https://www.ulisboa.pt/sites/ulisboa.pt/files/styles/logos_80px_vert/public/uo/logos/logo_ist.jpg?itok=2NCqbcIP")

        let lm = channel.lastMessageId;
        
        let reactMessage = await client.channels.cache.get(channel).send({ embeds: [embed] });
        
        reactMessage.react(part1Emoji);

        message.delete(lm)

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
                if (idx == 6 || idx == 8) {
                    continue;
                } else if (idx == 5) {
                    name = user.username + "- 5and6";
                } else if (idx == 7) {
                    name = user.username + "- 7and8";
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
                            module7_8.run(channel, client);
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