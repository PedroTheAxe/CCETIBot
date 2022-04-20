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
		const embedContent = new Discord.MessageEmbed();
        const embedPractical = new Discord.MessageEmbed();
		const secondEmbedPractical = new Discord.MessageEmbed();

		const multipleChoiceA = '🇦'
		const multipleChoiceB = '🇧'
		const multipleChoiceC = '🇨'

		const correctAnswer = '✅'
		const wrongAnswer = '❌'

        const learningModuleText = "\nAs it was mentioned before, jargon has very bad reputation in today’s society, especially with people outside the scientific community. However, one can discuss some benefits that jargon can provide not only to these communities but also to society as a whole.\n\nAs mentioned by Gray (2020), the most noticeable benefit of jargon is that “it helps you communicate effectively”. Jargon usage is especially successful when the audience or the person you are talking is on the same wavelength as you, that is, understands the terminology as well as you do. Therefore, jargon can be very useful to approach “more in-depth topics quicker” (Gray, 2020)."
		const learningModuleTxt2 = "As Gray (2020) also mentioned, “it builds credibility (if used correctly)”, i.e., it makes you sound more experienced and familiar with the terminology. For example, when selling an information system to client and you say “this system is extremely secure against injection attacks” instead of “this system is extremely secure against attacks”, where you omit the jargon, the client will be more looking forward to the product you are selling even if they do not understand the meaning of the jargon.\nLastly, it makes modern society function properly. For example, in medicine, the use of jargon is very much necessary to, for one, make appointments more efficient, but also create a vocabulary that may also allow society as a whole to identify certain topics about medicine, like COVID-19."
		
		embedLearning
            .setAuthor('Module 3')
			.setTitle("Three benefits of using jargon")
			.setColor("#80dfff")
			.setThumbnail("https://www.ulisboa.pt/sites/ulisboa.pt/files/styles/logos_80px_vert/public/uo/logos/logo_ist.jpg?itok=2NCqbcIP")

		embedContent
			.setColor("#99ff99")
			.addFields(
				{ name: 'Theoretical module', value: learningModuleText},
				{ name: '\u200b', value: learningModuleTxt2},
			)
			.setFooter("\u200bGray, L. (2020, September 22). The negative effects of jargon in content marketing. blend. https://www.blendb2b.com/blog/the-negative-effects-of-jargon-in-content-marketing")

        embedPractical
			.setColor("#ff6600")
            .addFields(
                { name: 'Practical module', value: 'What are the 3 benefits of using jargon?'},
				{ name: 'A', value:'More credible, easier communication, strengthens your deductive skills.'},
				{ name: 'B', value:'Easier communication, increase observational skills, useful in many areas of knowledge.'},
				{ name: 'C', value:'Easier communication, more credible, useful in many areas of knowledge.'},
            )
		
		secondEmbedPractical
			.setColor("#ff6600")
            .addFields(
                { name: 'Practical module', value: 'If we were to add one more benefit of jargon, which one would be more fitting?'},
				{ name: 'A', value:'Jargon enables better scientific paper development.'},
				{ name: 'B', value:'Jargon increases self-confidence.'},
				{ name: 'C', value:'Jargon creates a sense of accomplishment.'},
            )

		let reactMessage, secondReactMessage

		client.channels.cache.get(channel.id).send({ embeds: [embedLearning] }).then(() => 
		client.channels.cache.get(channel.id).send({ embeds: [embedContent] })).then(async() =>
		{reactMessage = await client.channels.cache.get(channel.id).send({ embeds: [embedPractical] })}).then(() => {
		reactMessage.react(multipleChoiceA)
		reactMessage.react(multipleChoiceB)
		reactMessage.react(multipleChoiceC)	
		})

        let secondQuestionFlag = false
        client.on('messageReactionAdd', async (reaction, user) => {

            if (user.bot) return;
            if (!reaction.message.guild) return;
            if (reaction.message.channel.id == channel) {
				if (secondQuestionFlag == false) {
					if (reaction.emoji.name == multipleChoiceA) {
						client.channels.cache.get(channel.id).send(wrongAnswer + "Nice try! The first and second benefits are indeed correct, but the last one, although jargon may increase some cognitive skills, has little to do with it. Please try again.");                
						reaction.remove(user); 
					} else if (reaction.emoji.name == multipleChoiceB) {
						client.channels.cache.get(channel.id).send(wrongAnswer + "The first and third benefits are correct, but the second one is not related to jargon in any way. Please try again.");
						reaction.remove(user);  	
					} else if (reaction.emoji.name == multipleChoiceC) {
						client.channels.cache.get(channel.id).send(correctAnswer + "Great job! As stated in the learning module, jargon makes communication easier, it can make you more credible in the eyes of the customer and can be useful in scientific areas like medicine. However, it is important that you use jargon according to your audience and not too often.");   
						secondQuestionFlag = true;
						secondReactMessage = await client.channels.cache.get(channel.id).send({ embeds: [secondEmbedPractical] })
						secondReactMessage.react(multipleChoiceA)
						secondReactMessage.react(multipleChoiceB)
						secondReactMessage.react(multipleChoiceC) 
					}
				} else {
					if (reaction.emoji.name == multipleChoiceA) {
						client.channels.cache.get(channel.id).send(correctAnswer + "Nice! As you would imagine it would be very challenging to write a paper or an academic document without the use of jargon, especially since they are usually targeted toward an audience that is on the same page as you on the topic. You may proceed to the next channel.");                 
					} else if (reaction.emoji.name == multipleChoiceB) {
						client.channels.cache.get(channel.id).send(wrongAnswer + "As mentioned before, jargon can increase credibility which in turn might make you more confident to use it, but this answer is too vague to be called a benefit. Please try again.");
						reaction.remove(user);
					}   else if (reaction.emoji.name == multipleChoiceC) {
						client.channels.cache.get(channel.id).send(wrongAnswer + "Although after using jargon successfully makes you feel like you got your point across, it does not necessarily mean that it is a benefit. Please try again.");
						reaction.remove(user);    
					}	
				}
            } else {
                return;
            }
        });
	}    
});