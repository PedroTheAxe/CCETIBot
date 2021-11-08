const Command = require("../../Structures/Command.js");
const Discord = require("discord.js");

module.exports = new Command({
	name: "module4",
	description: "Shows the fourth channel's content",
	type: "BOTH",
	slashCommandOptions: [],
	permission: "SEND_MESSAGES",
	async run(channel, client) {
		const embedLearning = new Discord.MessageEmbed();
		const embedContent = new Discord.MessageEmbed();
        const embedPractical = new Discord.MessageEmbed();

		const multipleChoiceA = '🇦'
		const multipleChoiceB = '🇧'
		const multipleChoiceC = '🇨'

        const learningModuleText = "\nContrarily to effective feedback, ineffective feedback happens when the person on the receiving end cannot take "
								 + "advantage out of it and thus cannot improve. In some extreme cases, it can even lead to that person feeling ashamed "
								 + "of what they did wrong and can hurt their performance in the future. \nHence, by giving inefficient feedback, there are "
								 + "some negative outcomes that come from it. First of all, as said by Gonzalez (2018), it might put the other person on "
								 + "the defensive if it is not appropriately done (e.g., using a threatening tone). Additionally, it can demotivate the "
								 + "person and, in the long run, deteriorate their performance. This is also achieved if the feedback content itself is unclear "
								 + "or too generic. "
		const learningModuleTxt2 = "Gonzalez (2018) also mentioned that feedback is ineffective if “It focuses primarily on ratings, not on "
								 + "development”.The author aso states that by evaluating based on ratings and not “focusing on what can be done from now on” "
								 + "deviates the focus from the main goal by wasting precious time on statistics that are not directly associated with it. "
								 + "\nAlso related to demotivation, the article states that if the feedback emphasizes negative aspects that cannot be fixed "
								 + "anymore creates, again, a sense of uselessness. “Instead of committing ourselves to improvement, which is what we would hope "
								 + "would happen, we hold onto this debilitating view of who we are instead of focusing on who we are becoming” (Hirsch, 2017)."

		embedLearning
            .setAuthor('Module 4')
			.setTitle("Describing 3 consequences of giving ineffective feedback")
			.setColor("#80dfff")
			.setThumbnail("https://www.ulisboa.pt/sites/ulisboa.pt/files/styles/logos_80px_vert/public/uo/logos/logo_ist.jpg?itok=2NCqbcIP")

		embedContent
			.setColor("#99ff99")
			.addFields(
				{ name: 'Theoretical module', value: learningModuleText},
				{ name: '\u200b', value: learningModuleTxt2},
			)
			.setFooter("\u200bJennifer Gonzalez (2018). Moving from Feedback to Feedforward (interview with Joe Hirsch). https://www.cultofpedagogy.com/feedforward/\n"
					 + "Hirsch, J. (2017). The Feedback Fix: Dump the Past, Embrace the Future, and Lead the Way to Change (paginas, capitulos…)")

        embedPractical
			.setColor("#ff6600")
            .addFields(
                { name: 'Practical module', value: 'Read the following sentence. What consequence comes from this type of feedback?'},
				{ name: 'A', value:'Demotivation'},
				{ name: 'B', value:'Defensive posture'},
				{ name: 'C', value:'Lack of focus on development'},
            )

		client.channels.cache.get(channel.id).send({ embeds: [embedLearning] });
		client.channels.cache.get(channel.id).send({ embeds: [embedContent] });
		let reactMessage = await client.channels.cache.get(channel.id).send({ embeds: [embedPractical] });

        
		reactMessage.react(multipleChoiceA)
		reactMessage.react(multipleChoiceB)
		reactMessage.react(multipleChoiceC)

        client.on('messageReactionAdd', async (reaction, user) => {

            if (user.bot) return;
            if (!reaction.message.guild) return;
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name == multipleChoiceA) {
                    client.channels.cache.get(channel.id).send("Although the feedback points out something the player did not do as "
															 + "well, it started off positively which in general should not demotivate them.")
 
                    reaction.remove(user);             
                } else if (reaction.emoji.name == multipleChoiceB) {
                    client.channels.cache.get(channel.id).send("This feedback is not done in a threatening tone which should not put the player in a defensive stance.")
                    reaction.remove(user); 
                } else if (reaction.emoji.name == multipleChoiceC) {
                    client.channels.cache.get(channel.id).send("Good work! This feedback, although being somewhat specific on what the player did in the game, "
															 + "it did not specify what they could have done better to improve for the future.")
                }
            } else {
                return;
            }

        });
	}    
});