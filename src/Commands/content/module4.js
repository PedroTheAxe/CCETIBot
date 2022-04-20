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
		const secondEmbedPractical = new Discord.MessageEmbed();

		const multipleChoiceA = '🇦'
		const multipleChoiceB = '🇧'
		const multipleChoiceC = '🇨'

		const correctAnswer = '✅'
		const wrongAnswer = '❌'

        const learningModuleText = "\nWith pros also come the cons, and jargon as a few consequences that can negatively affect communication.\nAccording to CopyPress (2013), it can lower trust or make someone sound less credible, which might sound contradictory to what was mentioned in the previous module. Using jargon really depends on the context and should be used upon having done proper “audience research” (CopyPress, 2013) and adapt your jargon use accordingly.\n"
		const learningModuleTxt2 = "As stated by Gray (2020), using too complex jargon can lead to confusion by the audience, which in turn makes them lose trust, relating back to the previous disadvantage mentioned. Therefore, a good communicator also needs to develop the skill to be able to translate jargon to “layman’s terms” (Gray, 2020), i.e., to expressions that the audience can comprehend, or they will lose interest.\nFinally, and as said by Gray (2020), overusing jargon can make you less “authentic and approachable” in the view of the audience. “It makes businesses seem robotic and less genuine” (Gray, 2020). Hence, it will make the audience feel more disconnected from you."
		
		embedLearning
            .setAuthor('Module 4')
			.setTitle("Three negative consequences of using jargon for non-specialized audiences")
			.setColor("#80dfff")
			.setThumbnail("https://www.ulisboa.pt/sites/ulisboa.pt/files/styles/logos_80px_vert/public/uo/logos/logo_ist.jpg?itok=2NCqbcIP")

		embedContent
			.setColor("#99ff99")
			.addFields(
				{ name: 'Theoretical module', value: learningModuleText},
				{ name: '\u200b', value: learningModuleTxt2},
			)
			.setFooter("\u200bCopyPress (2013, August 23). The Pros and Cons of Using Jargon. https://www.copypress.com/kb/copy/the-pros-and-cons-of-using-jargon/\nGray, L. (2020, September 22). The negative effects of jargon in content marketing. blend. https://www.blendb2b.com/blog/the-negative-effects-of-jargon-in-content-marketing")

        embedPractical
			.setColor("#ff6600")
            .addFields(
                { name: 'Practical module', value: 'What are the 3 different negative consequences of using jargon?'},
				{ name: 'A', value:'Lower trust, cause confusion, less authentic.'},
				{ name: 'B', value:'Cause confusion, less authentic, the audience may not understand.'},
				{ name: 'C', value:'Lower trust, the audience may not understand, makes you lose authority.'},
            )
		
		secondEmbedPractical
			.setColor("#ff6600")
            .addFields(
                { name: 'Practical module', value: 'When should you use jargon?'},
				{ name: 'A', value:'Every time you feel like it.'},
				{ name: 'B', value:'Formal/professional setting, preferably towards people with the same knowledge of the topic.'},
				{ name: 'C', value:'Toward your family explaining what happened at work that day.'},
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
						client.channels.cache.get(channel.id).send(correctAnswer + "Nice! If jargon is used either incorrectly or too much or both, it may lead to confusion of the audience, which consequently makes you sound less authentic and ultimately makes them lose trust in you and your presentation.");     
						secondQuestionFlag = true;
						secondReactMessage = await client.channels.cache.get(channel.id).send({ embeds: [secondEmbedPractical] })
						secondReactMessage.react(multipleChoiceA)
						secondReactMessage.react(multipleChoiceB)
						secondReactMessage.react(multipleChoiceC)            
					} else if (reaction.emoji.name == multipleChoiceB) {
						client.channels.cache.get(channel.id).send(wrongAnswer + "While all of these options may seem correct, the first and third have very similar meanings and therefore there is still one more consequence missing. Please try again.");
						reaction.remove(user);  	
					} else if (reaction.emoji.name == multipleChoiceC) {
						client.channels.cache.get(channel.id).send(wrongAnswer + "While all of these options may seem correct, the first and third are very similar and therefore there is still one more consequence missing. Please try again.");   
						reaction.remove(user); 
					}
				} else {
					if (reaction.emoji.name == multipleChoiceA) {
						client.channels.cache.get(channel.id).send(wrongAnswer + "You should not use jargon every time because not everyone will understand what you mean. Please try again.");  
						reaction.remove(user);               
					} else if (reaction.emoji.name == multipleChoiceB) {
						client.channels.cache.get(channel.id).send(correctAnswer + "Correct! Jargon is more commonly used in formal and professional settings, not only because there is a higher chance of them understanding you, but also makes creates a more efficient environment. You may proceed to the next channel.");
					}   else if (reaction.emoji.name == multipleChoiceC) {
						client.channels.cache.get(channel.id).send(wrongAnswer + "Not all of your family might understand what you are saying. If you are to talk to your family about work and you happen to use jargon, make sure to clarify it, and do not overuse it. Please try again.");
						reaction.remove(user);    
					}	
				}
            } else {
                return;
            }
        });
	}    
});