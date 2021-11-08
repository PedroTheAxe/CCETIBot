const Command = require("../../Structures/Command.js");
const Discord = require("discord.js");

module.exports = new Command({
	name: "module2",
	description: "Shows the second channel's content",
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

        const learningModuleText = "\nWhen giving feedback, you are aiming for either one of these two main objectives: modify or maintain behaviour. "
								 + "As stated by DeFranzo (n.d.), modifying behaviour is done as a means of improving performance. Often, the way people "
								 + "try to persuade others to change their behaviour is through criticism, whether it is negative or constructive. The latter "
								 + "is usually viewed as the more effective way to give feedback, as it is better accepted, and people are more prone to take "
								 + "note on what they have to adjust. Also, it is stated that it “is a tool for continued learning” (DeFranzo, n.d.). "
		const learningModuleTxt2 = "Having "
								 + "periodic meetings to correct and improve on certain aspects by giving feedback is a great strategy to not only develop on "
								 + "those difficulties but to also create better relationships between students, co-workers, teachers and so on. "
								 + "\nDeFranzo (n.d.) further explains that feedback might not affect behaviour but can motivate the person to maintain "
								 + "it. People in general like to feel fulfilled and that they did a good job. As consequence, they will also improve their "
								 + "performance but will not deviate much form the approaches they were using earlier. "
		
		embedLearning
            .setAuthor('Module 2')
			.setTitle("Describing the two main objectives of giving feedback")
			.setColor("#80dfff")
			.setThumbnail("https://www.ulisboa.pt/sites/ulisboa.pt/files/styles/logos_80px_vert/public/uo/logos/logo_ist.jpg?itok=2NCqbcIP")

		embedContent
			.setColor("#99ff99")
			.addFields(
				{ name: 'Theoretical module', value: learningModuleText},
				{ name: '\u200b', value: learningModuleTxt2},
			)
			.setFooter("\u200bDeFranzo, Susan E. (n.d.). 5 Reasons Why Feedback is Important.https://www.snapsurveys.com/blog/5-reasons-feedback-important/\n"
					 + "Casal, S., DellaValle, N., Mittone, L., & Soraperra, I. (2017). Feedback and efficient behavior. PloS one, 12(4), e0175738. https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5400271/")

        embedPractical
			.setColor("#ff6600")
            .addFields(
                { name: 'Practical module', value: 'Which of these sentences is an example of maintaining behaviour through feedback?'},
				{ name: 'A', value:'"Your essay is a bit sloppy, make sure to correct your grammar, spelling and use better statements as it gives off a bad impression."'},
				{ name: 'B', value:'"You did a great job, but there were some issues regarding the efficiency of your code and how it can perform at a larger scale."'},
				{ name: 'C', value:'"I loved the way you approached this project and how you brought together the team around your idea. You are on your way to become the employee of the month!"'},
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
                    client.channels.cache.get(channel.id).send("This is clearly feedback to modify behaviour. There was no intent to motivate the other to keep writing "
															 + "the same way, and therefore there was a need for a change. Please try again.")
 
                    reaction.remove(user);             
                } else if (reaction.emoji.name == multipleChoiceB) {
                    client.channels.cache.get(channel.id).send("This is somewhat of a grey area, as there was motivation in the beginning, but the person who gave the "
					                                         + "feedback wanted some minor adjustments and therefore some behaviour change. Please try again. ")
					reaction.remove(user);
                } else if (reaction.emoji.name == multipleChoiceC) {
                    client.channels.cache.get(channel.id).send("Great! This a wonderful example on how to motivate someone through feedback output. You can proceed to the next channel! ") 
                }
            } else {
                return;
            }

        });
	}    
});