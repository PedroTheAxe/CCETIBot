const Command = require("../../Structures/Command.js");
const Discord = require("discord.js");

module.exports = new Command({
	name: "module10",
	description: "Shows the first channel's content",
	type: "BOTH",
	slashCommandOptions: [],
	permission: "SEND_MESSAGES",
	async run(channel, client) {
		const embedLearning = new Discord.MessageEmbed();
        const embedContent = new Discord.MessageEmbed();
        const embedPractical = new Discord.MessageEmbed();

		const multipleChoiceA = '🇦'
		const multipleChoiceB = '🇧'

        const learningModuleText = '\nIn this module we will identify, select and implement two different alternative strategies presented with a couple case studies mentioned by O’Hara (2015).\n'
								 + 'The first strategy is "Get the right feedback to grow". O’Hara (2015) presents the case of an employee that was only getting praise from her work but not anything '
								 + 'that could help her grow. The identified the different kind of feedback she needed and aproached her boss asking how she could "exceed is expectations". Needless to say, the '
								 + 'boss was impressed with her initiative and strategy to ask for feedback.\n'
								 + 'The second strategy is "Keep your questions narrow". O’Hara (2015) presents us a different case study where another employee wasn’t getting much feedback from her superiors, '
								 + 'and what she did get was "generic and vague". Her strategy to fix that was to approach a client and ask specific feedback questions to her clients, which helped create a '
								 + '"virtuous cycle of future feedback"'
		
		embedLearning
            .setAuthor('Module 9')
			.setTitle("Identifying, selecting and implementing 2 strategies to solicit effective feedback")
			.setColor("#80dfff")
			.setThumbnail("https://www.ulisboa.pt/sites/ulisboa.pt/files/styles/logos_80px_vert/public/uo/logos/logo_ist.jpg?itok=2NCqbcIP")
            
        embedContent
            .setColor("#663300")
            .addFields(
                { name: 'Theoretical module', value: learningModuleText},
            )
            .setFooter("\u200bO’Hara, C. (2015, August 12). How to Get the Feedback You Need. Harvard Business Review. https://hbr.org/2015/05/how-to-get-the-feedback-you-need")

        embedPractical
			.setColor("#ff6600")
            .addFields(
                { name: 'Practical module', value: 'What kind of "attitudes" should you strive to have when asking for feedback?'},
                { name: 'A', value: 'Defensiveness, asking for feedback as soon as possible, asking general questions.'},
                { name: 'B', value: 'Asking general questions, being open to criticism, asking for feedback as soon as possible.'},
                { name: 'C', value: 'Being open to criticism, asking for feedback as soon as possible, asking specific questions.'},
            )
        client.channels.cache.get(channel.id).send({ embeds: [embedLearning] });
        client.channels.cache.get(channel.id).send({ embeds: [embedContent] });
        let reactMessage = await client.channels.cache.get(channel.id).send({ embeds: [embedPractical] });

        
		reactMessage.react(multipleChoiceA)
		reactMessage.react(multipleChoiceB)

        client.on('messageReactionAdd', async (reaction, user) => {

            if (user.bot) return;
            if (!reaction.message.guild) return;
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name == multipleChoiceA) {
                    client.channels.cache.get(channel.id).send("Not quite right, you want to avoid being on the defensive when asking for feedback.")
                    reaction.remove(user);             
                } else if (reaction.emoji.name == multipleChoiceB) {
                    client.channels.cache.get(channel.id).send("Not quite right, you should ask for specific feedback instead of general feedback whenever possible.")
					reaction.remove(user); 
                } else if (reaction.emoji.name == multipleChoiceB) {
                    client.channels.cache.get(channel.id).send("Nicely done! Almost done, please proceed to the last channel");   
                }
            } else {
                return;
            }

        });
	}    
});