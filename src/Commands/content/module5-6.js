const Command = require("../../Structures/Command.js");
const Discord = require("discord.js");

module.exports = new Command({
	name: "module5-6",
	description: "Shows the fifth and sixth channel's content",
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
		const multipleChoiceD = '🇩'

		const correctAnswer = '✅'
		const wrongAnswer = '❌'

        const learningModuleText = "\nThere are two sides to feedback that influence how effective it is.\n If it is general, you do not add much detail "
		                         + "to the feedback being given and you address the issues that need to be improved on in a broader way. "
								 + "Consequently, for the most part, it is less efficient than its specific counterpart because it leaves the receiver in a state "
								 + "of uncertainty due to lack of information.\n As for the specific one, each area is approached more thoroughly in order to pinpoint "
								 + "exactly what needs to be improved on and how to achieve that improvement. "
								 + "However, in more radical cases, if the feedback is way too long or too complex (e.g., use of too much tecnical vocabulary) "
								 + "it might lead to a similar effect to general feedback, where the receiver "
								 + "will feel confusion and will not be able to understand exactly what to do." 
								 
		const learningModuleTxt2 = "\nSo, in conclusion, specific feedback, if done correctly "
								 + "is much better than general feedback because it is more detailed and, as stated in the article “21 Components of Effective Feedback” "
								 + "(n.d.), relates to “a specific, measurable performance goal”. \nNow, how do we change from general to specific feedback? The article "
								 + "“How to give feedback the right way” (n.d.) gives a great approach to this conversion: \nThe first step is providing the right context. "
								 + "That is, giving a specific reference point to the situation you are referring to, instead of giving an overview of the problem. "

		const learningModuleTxt3 = "\nNext, you need to provide an observation. In other words, you need to provide a clear description “on the actions” – or behaviour "
								 + "- and not on the “personality” (“How to give feedback the right way”, n.d.). \nCommenting on what kind of impact the behaviour had before "
								 + "the feedback is also important as it shows how it may have affected other people. This step is most relevant “when you talk about the "
								 + "effect on the group” (“How to give feedback the right way”, n.d.). \nFinally, and probably the most important step, you need to “offer "
								 + "some suggestions of what they could do to improve” (“How to give feedback the right way”, n.d.)."

		embedLearning
            .setAuthor('Module 5-6')
			.setTitle("Differentiating general feedback from specific feedback\n" + "Converting general feedback into specific feedback")
			.setColor("#80dfff")
			.setThumbnail("https://www.ulisboa.pt/sites/ulisboa.pt/files/styles/logos_80px_vert/public/uo/logos/logo_ist.jpg?itok=2NCqbcIP")
			
		embedContent
			.setColor("#99ff99")
			.addFields(
				{ name: 'Theoretical module', value: learningModuleText},
				{ name: '\u200b', value: learningModuleTxt2},
				{ name: '\u200b', value: learningModuleTxt3},
			)
			.setFooter("\u200b21 Components of Effective Feedback (n.d.). https://www.talkdesk.com/resources/infographics/21-components-of-effective-feedback/\n"
			         + "How to give feedback the right way (n.d.). https://www.impraise.com/blog/how-to-give-feedback-the-right-way")

        embedPractical
			.setColor("#ff6600")
            .addFields(
                { name: 'Practical module', value: 'Read the following general feedback sentences. What is the appropriate conversion to specific feedback?'},
				{ name: 'A', value:'“I did not like your essay.” -> “I did not like your essay because of your vocabulary.”'},
				{ name: 'B', value:'“Your presentation was boring.” -> “Your presentation was boring, so you need to change your tone of voice and posture.”'},
				{ name: 'C', value:'“You did not play according to the plan.” -> “Last game against Manchester City, on the second half, you did not do your '
				                 + 'job as a captain by keeping the team together very well. Both myself and the team were not very happy with your performance. '
								 + 'Try not to get in your own head and keep a rational mindset for the upcoming games.”'},
				{ name: 'D', value:'“You sounded angry during the meeting.” -> “During the meeting when we were talking about the project you came up with '
								 + 'and how it was not doing so well, you sounded angry and talked over our boss several times, without even noticing. He was not very pleased.”'},
            )
		
		let reactMessage

		client.channels.cache.get(channel.id).send({ embeds: [embedLearning] }).then(() => 
		client.channels.cache.get(channel.id).send({ embeds: [embedContent] })).then(async() =>
		{reactMessage = await client.channels.cache.get(channel.id).send({ embeds: [embedPractical] })}).then(() => {
		reactMessage.react(multipleChoiceA)
		reactMessage.react(multipleChoiceB)
		reactMessage.react(multipleChoiceC)
		reactMessage.react(multipleChoiceD)
		})
        
        client.on('messageReactionAdd', async (reaction, user) => {

            if (user.bot) return;
            if (!reaction.message.guild) return;
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name == multipleChoiceA) {
                    client.channels.cache.get(channel.id).send(wrongAnswer + " This conversion lacks all mentioned steps above except the observation itself, this an example of general and poor feedback. Please try again.")
                    reaction.remove(user);             
                } else if (reaction.emoji.name == multipleChoiceB) {
                    client.channels.cache.get(channel.id).send(wrongAnswer + " This conversion presents itself with an observation and how to fix it, however it does not give context or impact that it had. Please try again.")
					reaction.remove(user);  
                } else if (reaction.emoji.name == multipleChoiceC) {
                    client.channels.cache.get(channel.id).send(correctAnswer + " Good work! This is a wonderful example of a conversion to specific feedback with all mentioned steps, in the right order and given the right way. You can proceed to the next channel!")
                } else if (reaction.emoji.name == multipleChoiceD) {
					client.channels.cache.get(channel.id).send(wrongAnswer + " This conversion is almost perfect, although it misses on how to fix the issue mentioned above. Please try again.")
					reaction.remove(user); 
				}
            } else {
                return;
            }

        });
	}    
});