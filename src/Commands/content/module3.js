const Command = require("../../Structures/Command.js");
const Discord = require("discord.js");

module.exports = new Command({
	name: "module3",
	description: "Shows the third channel's content",
	type: "BOTH",
	slashCommandOptions: [],
	permission: "SEND_MESSAGES",
	async run(channel, client) {
		const embedLearning = new Discord.MessageEmbed();
        const embedPractical = new Discord.MessageEmbed();

		const multipleChoiceA = '🇦'
		const multipleChoiceB = '🇧'
		const multipleChoiceC = '🇨'

        const learningModuleText = "\nOne can tell that effective feedback was given if one can identify exactly what needs to be improved "
		 						 + "on to have better performance. So, there are a few characteristics that need to be fulfilled to achieve that effectiveness. "
								 + "\nAs stated in the article “21 Components of Effective Feedback” (n.d.) and by Hattie and Timperley (2007), timing is very important "
								 + "as feedback should be given “as close to the event as possible” (“21 Components of Effective Feedback”, n.d.). "
								 + "\nWhether the feedback is positive or negative can also have different effects on the receiving end. If, on the one hand, it is positive, "
								 + "the person might accept it better because it sounds encouraging and motivating. On the other hand, if it is negative, the same person might "
								 + "receive it as well because it sounds too judgmental. Therefore, this negative feedback is better off done privately. \nAlso, according to “21 "
								 + "Components of Effective Feedback” (n.d.), feedback is most effective when it is done with the use of descriptive language. In other words, "
								 + "feedback should be detailed be easy to understand and have an appropriate tone, that is, “be presented in a positive, tactful and "
								 + "non-threatening manner” (“21 Components of Effective Feedback”, n.d.). \nIn the same article and specifically about group projects, whether "
								 + "in school or work environments, it is mentioned that feedback should be “embedded in the culture” (“21 Components of Effective Feedback”, n.d.), "
								 + "therefore being done recurringly. This way, the person receiving it can be directed on a regular basis, according to the project’s “action plan” "
								 + "(“21 Components of Effective Feedback”, n.d.). Furthermore, feedback should not necessarily be a one-way process. Both students and employees "
								 + "should have the opportunity to offer their own solutions and ideas." 

		embedLearning
            .setAuthor('Module 3')
			.setTitle("Listing 5 characteristics of effective feedback")
			.setColor("#80dfff")
			.setThumbnail("https://www.ulisboa.pt/sites/ulisboa.pt/files/styles/logos_80px_vert/public/uo/logos/logo_ist.jpg?itok=2NCqbcIP")
			.addFields(
                { name: 'Theoretical module', value:'\u200B'},
            )
			.setFooter("21 Components of Effective Feedback (n.d.). https://www.talkdesk.com/resources/infographics/21-components-of-effective-feedback/\n"
					 + "Wisniewski, B., Zierer, K., & Hattie, J. (2020). The power of feedback revisited: a meta-analysis of educational feedback research. Frontiers in Psychology, 10, 3087. https://www.frontiersin.org/articles/10.3389/fpsyg.2019.03087/full#B18\n"
					 + "Hattie, J., & Timperley, H. (2007). The power of feedback. Review of educational research, 77(1), 81-112. https://journals.sagepub.com/doi/abs/10.3102/003465430298487 ")
        client.channels.cache.get(channel.id).send({ embeds: [embedLearning] });

        client.channels.cache.get(channel.id).send(learningModuleText);

        embedPractical
			.setColor("#ff6600")
            .addFields(
                { name: 'Practical module', value: 'Read the following sentence. Identify three of the characteristics mentioned above that are present in the sentence.'},
				{ name: 'A', value:'to do'},
				{ name: 'B', value:'to do'},
				{ name: 'C', value:'to do'},
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