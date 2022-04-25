const { MessageEmbed } = require("discord.js");
const Command = require("../Structures/Command.js");
const Discord = require("discord.js");

const module1 = require("../Commands/content/module1.js");
const module2 = require("../Commands/content/module2.js");
const module3 = require("../Commands/content/module3.js");
const module4 = require("../Commands/content/module4.js");
const module5 = require("../Commands/content/module5.js");
const module6 = require("../Commands/content/module6.js");

module.exports = new Command({

    name: "reactions",
	description: "Start quiz",
	type: "BOTH",
	slashCommandOptions: [],
	permission: "SEND_MESSAGES",

    async run(message, args, client) {

        const embed = new Discord.MessageEmbed()

        const channel = "907716227793817631"

        const part1Emoji = '✅'

        let userLists = []

        embed
			.setTitle("Welcome to Group 78's CCETI project!")
			.setDescription(
				"With the help of our friend CCETIBot, today we will learn about jargon and technical language! More specifically:"
			)
            .addFields(
                { name: '1 - Defining jargon', value: '\u200b'},
                { name: '2 - Difference between jargon and slang', value: '\u200b'},
                { name: '3 - Three benefits of using jargon', value: '\u200b'},
                { name: '4 - Three negative consequences of using jargon for non-specialized audiences', value: '\u200b'},
                { name: '5 - Caracterize code-switching', value: '\u200b'},
                { name: '6 - TODO', value: '\u200b'},
                { name: '\u200b', value: 'Whenever you are ready, click the green checkmark emoji below to start and the bot will create anonymous channels '
                                            + '(only admins and you can see them) that will help you learn and practice these topics.'},
            )
			.setColor("BLURPLE")
			.setThumbnail("https://www.ulisboa.pt/sites/ulisboa.pt/files/styles/logos_80px_vert/public/uo/logos/logo_ist.jpg?itok=2NCqbcIP")
            .setFooter("By:\nPedro Morais - 93607\nFrancisco Bento - 93581\nFrancisco Rosa - 93578\nJoão Lopes - 93588")

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
            for(; idx < 7; idx++) { //change to 12 
                let name = user.username + "-" + idx;
                if (idx == 8) {
                    continue;
                } else if (idx == 5) {
                    name = user.username + "- 5";
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
                            module5.run(channel, client);
                            break;
                        case 6:
                            module6.run(channel, client);
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
                    if (userLists.includes(user.username)) {
                        return;
                    }
                    userLists.push(user.username)
                    makeChannel(message.guild, user);             
                }
            } else {
                return;
            }

        });
    }
});