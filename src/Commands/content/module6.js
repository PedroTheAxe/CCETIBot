const Command = require("../../Structures/Command.js");
const Discord = require("discord.js");

module.exports = new Command({
	name: "module6",
	description: "Shows the fifth and sixth channel's content",
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
		const multipleChoiceD = '🇩'

		const correctAnswer = '✅'
		const wrongAnswer = '❌'

        const learningModuleText = "\nAs it was mentioned in the previous learning module, code-switching is a common practice among all languages, but for the most part “code-mixing has, of course, been limited to spoken discourse” (Martin, E., 1998). However, especially in non-English native countries, code-switching can be used in advertising as a way of bringing more customers in. Let us take a look at the main reasons why one would use code-switching (specifically English) in advertising.\nAccording to Nerghes (2011), it is a marketing strategy that globalizes brands as “having a uniform campaign or slogan” will bring in more foreign customers.\n" 
								 
		const learningModuleTxt2 = "Nerghes (2011) also mentioned that code-mixing is used as a creative way of filling lexical gaps, especially when there are no appropriate words or expressions in the host language to be utilized. Not only that, but it may attract more attention of customers as English buzzwords (which can be viewed as fashionable jargon) used in advertising are short, easy to memorize and fine sounding.\nFinally, and according to Nerghes (2011), English carries certain cultural connotations which are used to reflect positivity on the product and appeal to the consumer. It is believed that the use of English code-switching draws customers in because it is associated with “youth, prestige, modernity, globalization, cosmopolitanism, and internationalism” (Ustinova & Bhatia, 2005 pg 117)."


		embedLearning
            .setAuthor('Module 6')
			.setTitle("Code-switching in advertising")
			.setColor("#80dfff")
			.setThumbnail("https://www.ulisboa.pt/sites/ulisboa.pt/files/styles/logos_80px_vert/public/uo/logos/logo_ist.jpg?itok=2NCqbcIP")
			
		embedContent
			.setColor("#99ff99")
			.addFields(
				{ name: 'Theoretical module', value: learningModuleText},
				{ name: '\u200b', value: learningModuleTxt2},
			)
			.setFooter("\u200bMartin, E. (1998). The use of English in written French advertising: A study of code-switching, code-mixing, and borrowing in a commercial context. https://www.ideals.illinois.edu/bitstream/handle/2142/11555/SLS1998v28.1-10Martin.pdf?sequence=2\nNerghes, A. (2011). The impact of code-switching on persuasion: An elaboration likelihood perspective. Wageningen University.https://www.researchgate.net/profile/Adina-Nerghes/publication/267625964_The_impact_of_code-switching_on_information_processing_An_Elaboration_Likelihood_Perspective/links/547c64140cf205d1688207a6/The-impact-of-code-switching-on-information-processing-An-Elaboration-Likelihood-Perspective.pdf\nLeung, C.-H. (n.d.). An example of a Cantonese print advertisement mixed with English terms [Image]. An Empirical Study on Code Mixing in Print Advertisements in Hong Kong. https://scialert.net/fulltext/?doi=ajm.2010.49.61")

        embedPractical
			.setColor("#ff6600")
            .addFields(
                { name: 'Practical module', value: 'What are the main reasons for using code-switching in advertising?'},
				{ name: 'A', value:'Globalize brand, fill lexical gap, values it carries appeal to the customer.'},
				{ name: 'B', value:'Fill lexical gap, globalize brand, appeal to customer support.'},
				{ name: 'C', value:'Globalize brand, deceive clients, it is common practice in all languages.'},
            )
		
		secondEmbedPractical
			.setColor("#ff6600")
            .addFields(
                { name: 'Practical module', value: 'Which of the following reasons presented in the question above justify the use of code switching in this advertising?'},
				{ name: 'A', value:'Lexical gap'},
				{ name: 'B', value:'Globalize brand'},
				{ name: 'C', value:'Buzzwords that are appealing to the customer'},
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
						client.channels.cache.get(channel.id).send(correctAnswer + "Correct! As it was mentioned, code-switching English into other languages for advertising can interest foreign customers by using marketing that can be understood by most, but also native speakers as English words are widely as buzzwords.");     
						secondQuestionFlag = true;
						secondReactMessage = await client.channels.cache.get(channel.id).send({ embeds: [secondEmbedPractical] })
						secondReactMessage.react(multipleChoiceA)
						secondReactMessage.react(multipleChoiceB)
						secondReactMessage.react(multipleChoiceC)           
					} else if (reaction.emoji.name == multipleChoiceB) {
						client.channels.cache.get(channel.id).send(wrongAnswer + "Close one! Although code-switching can be used to bring in more clients through a uniform slogan or campaign and can be more fine sounding, but it has no correlation to customer support whatsoever. Please try again.");
						reaction.remove(user); 
					} else if (reaction.emoji.name == multipleChoiceC) {
						client.channels.cache.get(channel.id).send(wrongAnswer + "Nice try! Code-switching is in fact widely used in pretty much all languages and attracts foreign customers, it is not used with ill intents by deceiving or misleading customers. Please try again.");   
						reaction.remove(user); 
					}
				} else {
					if (reaction.emoji.name == multipleChoiceA) {
						client.channels.cache.get(channel.id).send(wrongAnswer + "Nice try! There are plenty of synonyms to translate such words as “perfect”, “size” and “juicy”. Please try again.");  
						reaction.remove(user);               
					} else if (reaction.emoji.name == multipleChoiceB) {
						client.channels.cache.get(channel.id).send(wrongAnswer + "Close one! In this scenario there is no relation with creating a brand through the use of code switching in order to try to globalize the brand. Please try again.");
						reaction.remove(user); 
					}   else if (reaction.emoji.name == multipleChoiceC) {
						client.channels.cache.get(channel.id).send(correctAnswer + "Correct! You can see that code-switching the words “perfect”, “juicy” and “size” appeal more to the drink as buzzwords and bring in more customers than if the package was all written in Chinese. We hope you enjoyed our project and our modules were useful for your learning. Thank you for your time!");   
					}	
				}
            } else {
                return;
            }
        });
	}    
});