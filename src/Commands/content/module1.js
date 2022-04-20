const Command = require("../../Structures/Command.js");
const Discord = require("discord.js");

module.exports = new Command({
	name: "module1",
	description: "Shows the first channel's content",
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

        const learningModuleText = "\nJargon has several definitions but, specifically in the context of communication, " +
								"it can be defined as a “mode of speech, full of unfamiliar words” (Kertesz, A., & Benson, D. F., 1970) " +
								"making up “technical terminology” (Lindsley, O. R., 1991) for a set of people from the same community to " + 
								"communicate more fluidly and less expressively.\n\n However, individuals outside that group may feel excluded " +
								"because they do not recognize its meaning. Nevertheless, and according to Hirst (2003), “science and technology would be crippled without it”." 
		
		embedLearning
            .setAuthor('Module 1')
			.setTitle("Defining Jargon")
			.setColor("#80dfff")
			.setThumbnail("https://www.ulisboa.pt/sites/ulisboa.pt/files/styles/logos_80px_vert/public/uo/logos/logo_ist.jpg?itok=2NCqbcIP")
			
		embedContent
			.setColor("#99ff99")
			.addFields(
				{ name: 'Theoretical module', value: learningModuleText},
			)
			.setFooter("\u200bLindsley, O. R. (1991). From technical jargon to plain English for application. Journal of applied behavior analysis, 24(3), 449. https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1279596/pdf/jaba00021-0053.pdf\n" +
					  "Hirst, R. (2003). Scientific jargon, good and bad. Journal of technical writing and communication, 33(3), 201-229. https://journals.sagepub.com/doi/pdf/10.2190/J8JJ-4YD0-4R00-G5N0\n" + 
					  "Kertesz, A., & Benson, D. F. (1970). Neologistic jargon: a clinicopathological study. Cortex, 6(4), 362-386. https://reader.elsevier.com/reader/sd/pii/S0010945270800028")

        embedPractical
			.setColor("#ff6600")
            .addFields(
                { name: 'Practical module', value: 'What are the more appropriate set of motives for using jargon?'},
				{ name: 'A', value:'Curse of knowledge, convenience, to cause confusion'},
				{ name: 'B', value:'Convenience, curse of knowledge, lack of skills'},
				{ name: 'C', value:'To cause confusion, lack of skills, to sound intellectual'},
            )

		secondEmbedPractical
			.setColor("#ff6600")
            .addFields(
                { name: 'Practical module', value: 'Which one of the following sentences do you consider to be jargon?'},
				{ name: 'A', value:'I’m pretty sure he is ghosting me and doesn’t want to do the project.'},
				{ name: 'B', value:'Tbh I don’t think that will be much of a problem.'},
				{ name: 'C', value:'Can you help me with the DB login through SSH?'},
            )
		
		let reactMessage, secondReactMessage
		
		client.channels.cache.get(channel.id).send({ embeds: [embedLearning] }).then(() => 
		client.channels.cache.get(channel.id).send({ embeds: [embedContent] })).then(async () =>
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
						client.channels.cache.get(channel.id).send(wrongAnswer + "These motives are almost all right, but it is very rare or extreme to use jargon specifically to cause confusion to an audience. It can happen sometimes but rarely does one see someone doing it on purpose, especially during a presentation or a pitch. Please try again.");     
						reaction.remove(user);             
					} else if (reaction.emoji.name == multipleChoiceB) {
						client.channels.cache.get(channel.id).send(correctAnswer + "Great job! Jargon usually is used for convenience or as a force of habit from using it so regularly, but it can also be used by someone who suffers from curse of knowledge (someone who assumes others already understand the topic in question) and/or lack of skill to translate jargon to text understood by lay people.");   
						secondQuestionFlag = true;
						secondReactMessage = await client.channels.cache.get(channel.id).send({ embeds: [secondEmbedPractical] })
						secondReactMessage.react(multipleChoiceA)
						secondReactMessage.react(multipleChoiceB)
						secondReactMessage.react(multipleChoiceC)	
					} else if (reaction.emoji.name == multipleChoiceC) {
						client.channels.cache.get(channel.id).send(wrongAnswer + "These are not the motives we are looking for as all of them, besides lack of skills, are done very rarely (as it sounds as if they are done on purpose) and do not really follow the definition of jargon. Please try again.");   
						reaction.remove(user); 
					}
				} else {
					if (reaction.emoji.name == multipleChoiceA) {
						client.channels.cache.get(channel.id).send(wrongAnswer + "This sentence does have jargon as the expression “ghosting” is not really a technical term. This word is more closely approximated to slang. Fortunately, we will address this topic later! Please try again.");     
						reaction.remove(user);             
					} else if (reaction.emoji.name == multipleChoiceB) {
						client.channels.cache.get(channel.id).send(wrongAnswer + "This sentence does have jargon as “tbh” is not really a technical term. This expression is an acronym that is considered to be slang nowadays. We will dive deeper into this topic later! Please try again.");
						reaction.remove(user);
					
					}   else if (reaction.emoji.name == multipleChoiceC) {
						client.channels.cache.get(channel.id).send(correctAnswer + "Good job! Expressions like “DB”, “login” and “SSH” are widely used in the computer science realm and are great examples of jargon. The other options are examples of slangs which will be addressed on the next module! You may proceed to the next channel.");   
					}	
				}
            } else {
                return;
            }

        });
	}    
});