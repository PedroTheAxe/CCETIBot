const Command = require("../../Structures/Command.js");
const Discord = require("discord.js");

module.exports = new Command({
	name: "module5",
	description: "Shows the fifth channel's content",
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

        const learningModuleText = "\nAs stated by Poplack (2001), code-switching “refers to the mixing, by bilinguals (or multilinguals), of two or more languages in discourse”. To put it simpler, it means using words of one language when speaking another. This is done very often nowadays, especially among younger people, where they frequently mix in English words with their native language vocabulary.\n There are some advantages that can be taken from code-switching. For example, it “builds cognitive flexibility” (Wheeler, R. S., 2008), which is particularly important for the younger generation, who will have an easier time to use either language later on in their life, essentially turning them bilingual.\n" 
								 
		const learningModuleTxt2 = "However, and similar to jargon, code-switching can lead to misunderstanding if not used towards a suitable audience, that is, someone who somewhat understands both languages. Also, if used too often, the speaker might show lack of understanding of one of the languages or some technical terminology in that language.\nEither way, code-switching is overall a skill that not only increases cognitive reasoning, as mentioned before, but is very useful in all realms of knowledge, especially science and literature."


		embedLearning
            .setAuthor('Module 5')
			.setTitle("Caracterize code-switching")
			.setColor("#80dfff")
			.setThumbnail("https://www.ulisboa.pt/sites/ulisboa.pt/files/styles/logos_80px_vert/public/uo/logos/logo_ist.jpg?itok=2NCqbcIP")
			
		embedContent
			.setColor("#99ff99")
			.addFields(
				{ name: 'Theoretical module', value: learningModuleText},
				{ name: '\u200b', value: learningModuleTxt2},
			)
			.setFooter("\u200bWheeler, R. S. (2008). Code-switching. Educational Leadership. https://www.ventrislearning.com/wp-content/uploads/Wheeler_Ed_Leadership_April_08.pdf\nPoplack, S. (2001). Code-switching (linguistic). International encyclopedia of the social and behavioral sciences, 12, 2062-2065. http://aix1.uottawa.ca/~sociolx/CS.pdf")

        embedPractical
			.setColor("#ff6600")
            .addFields(
                { name: 'Practical module', value: 'What is the definition of code-switching?'},
				{ name: 'A', value:'Exchanging your colleagues Python code for your own code.'},
				{ name: 'B', value:'Mixing words from another language into another language.'},
				{ name: 'C', value:'When you swap words in a phrase for similar ones.'},
            )
		
		secondEmbedPractical
			.setColor("#ff6600")
            .addFields(
                { name: 'Practical module', value: 'Identify a pro and a con of code-switching, respectively'},
				{ name: 'A', value:'It clarifies the message, but can be offensive to the other language’s speakers.'},
				{ name: 'B', value:'It is a skill, but lowers trust'},
				{ name: 'C', value:'It is a skill, but it can be misunderstood'},
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
						client.channels.cache.get(channel.id).send(wrongAnswer + "Technically it is switching code, but it is not related to the topic exposed in the learning module. Please try again. Also, remember that this is a case of plagiarism. Please try again.");     
						reaction.remove(user);            
					} else if (reaction.emoji.name == multipleChoiceB) {
						client.channels.cache.get(channel.id).send(correctAnswer + "Nice job! Code-switching happens when you mix in words from another language, usually English, into your own language. This can happen within the same phrase, without changing the context.");
						secondQuestionFlag = true;
						secondReactMessage = await client.channels.cache.get(channel.id).send({ embeds: [secondEmbedPractical] })
						secondReactMessage.react(multipleChoiceA)
						secondReactMessage.react(multipleChoiceB)
						secondReactMessage.react(multipleChoiceC)  	
					} else if (reaction.emoji.name == multipleChoiceC) {
						client.channels.cache.get(channel.id).send(wrongAnswer + "Unfortunately, this is not the right answer, because replacing words for their synonyms is not related to code switching whatsoever. Please try again.");   
						reaction.remove(user); 
					}
				} else {
					if (reaction.emoji.name == multipleChoiceA) {
						client.channels.cache.get(channel.id).send(wrongAnswer + "This answer is too vague because code-switching does not clarify the message for the audience every time (even though it makes it easier for the speaker to communicate it). Also, code-switching will very rarely be taken as an offense by anyone. Please try again.");  
						reaction.remove(user);               
					} else if (reaction.emoji.name == multipleChoiceB) {
						client.channels.cache.get(channel.id).send(wrongAnswer + "Close! Code-switching is in fact a skill as it requires knowing multiple languages and being able to mix them together but does not lower the trust the audience puts on you. In fact, in some cases, it may even increase the trust the audience has in you if you use their language correctly.");
						reaction.remove(user); 
					}   else if (reaction.emoji.name == multipleChoiceC) {
						client.channels.cache.get(channel.id).send(correctAnswer + "Good job! Code-switching is overall a skill because it requires the ability to know at least two languages and the ability to mix them together. However, not everyone has that skill and can lead to confusion, similar to jargon. You can proceed to the last channel.");   
					}	
				}
            } else {
                return;
            }
        });
	}    
});