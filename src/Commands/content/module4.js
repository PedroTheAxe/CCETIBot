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
								 + "or too generic. \nGonzalez (2018) also mentioned that feedback is ineffective if “It focuses primarily on ratings, not on "
								 + "development” (Gonzalez, 2018). By evaluating based on ratings and not “focusing on what can be done from now on” (Gonzalez, 2018) "
								 + "deviates the focus from the main goal by wasting precious time on statistics that are not directly associated with it. "
								 + "\nAlso related to demotivation, the article states that if the feedback emphasizes negative aspects that cannot be fixed "
								 + "anymore creates, again, a sense of uselessness. “Instead of committing ourselves to improvement, which is what we would hope "
								 + "would happen, we hold onto this debilitating view of who we are instead of focusing on who we are becoming” (Hirsch, 2017)."

		embedLearning
            .setAuthor('Module 4')
			.setTitle("Describing 3 consequences of giving ineffective feedback")
			.setColor("#80dfff")
			.setThumbnail("https://www.ulisboa.pt/sites/ulisboa.pt/files/styles/logos_80px_vert/public/uo/logos/logo_ist.jpg?itok=2NCqbcIP")
			.addFields(
                { name: 'Theoretical module', value:'\u200B'},
            )
			.setFooter("Jennifer Gonzalez (2018). Moving from Feedback to Feedforward (interview with Joe Hirsch). https://www.cultofpedagogy.com/feedforward/\n"
			         + "Hirsch, J. (2017). The Feedback Fix: Dump the Past, Embrace the Future, and Lead the Way to Change (paginas, capitulos…)")
        client.channels.cache.get(channel.id).send({ embeds: [embedLearning] });

        client.channels.cache.get(channel.id).send(learningModuleText);

        embedPractical
			.setColor("#ff6600")
            .addFields(
                { name: 'Practical module', value: 'Read the following sentence. What consequence comes from this type of feedback? TO DO'},
				{ name: 'A', value:'Demotivation'},
				{ name: 'B', value:'Defensive posture'},
				{ name: 'C', value:'Lack of focus on development'},
            )
		console.log(channel.id);
        let reactMessage = await client.channels.cache.get(channel.id).send({ embeds: [embedPractical] });

        
		reactMessage.react(multipleChoiceA)
		reactMessage.react(multipleChoiceB)
		reactMessage.react(multipleChoiceC)

        client.on('messageReactionAdd', async (reaction, user) => {

            if (user.bot) return;
            if (!reaction.message.guild) return;
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name == multipleChoiceA) {
                    client.channels.cache.get(channel.id).send("to do")
 
                    reaction.remove(user);             
                } else if (reaction.emoji.name == multipleChoiceB) {
                    client.channels.cache.get(channel.id).send("to do")

                } else if (reaction.emoji.name == multipleChoiceC) {
                    client.channels.cache.get(channel.id).send("to do")
                    reaction.remove(user); 
                }
            } else {
                return;
            }

        });
	}    
});