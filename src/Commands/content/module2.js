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
		const secondEmbedPractical = new Discord.MessageEmbed();

		const multipleChoiceA = '🇦'
		const multipleChoiceB = '🇧'
		const multipleChoiceC = '🇨'

		const correctAnswer = '✅'
		const wrongAnswer = '❌'

        const learningModuleText = "\nAccording to the Merriam-Webster Dictionary slang is defined as “an informal nonstandard vocabulary”. As stated by Fasola (2012), it can cause “different reactions among the general public, scholars and linguists in particular” because it is mostly viewed as bad use of the language in question. They also mentioned that there is an argument that “slang is improper, unsystematic, unacceptable language usage”."
		const learningModuleTxt2 = "Considering what was said in the previous learning module about the definition of jargon, there are some clear differences between the two terms. First of all, jargon is generally considered to be formal while slang is informal by nature. Therefore, jargon can be used in a professional setting while slang preferably should not be used.\nAlso, while both terms usually have a negative connotation among the general public, slang tends to be viewed more negatively than jargon."
		
		embedLearning
            .setAuthor('Module 2')
			.setTitle("Difference between jargon and slang")
			.setColor("#80dfff")
			.setThumbnail("https://www.ulisboa.pt/sites/ulisboa.pt/files/styles/logos_80px_vert/public/uo/logos/logo_ist.jpg?itok=2NCqbcIP")

		embedContent
			.setColor("#99ff99")
			.addFields(
				{ name: 'Theoretical module', value: learningModuleText},
				{ name: '\u200b', value: learningModuleTxt2},
			)
			.setFooter("\u200bMerriam-Webster. (n.d.). Slang. In Merriam-Webster.com dictionary. Retrieved April 16, 2022, from https://www.merriam-webster.com/dictionary/slang\n"
					 + "Fasola, J. (2012). Slang and Its history. United States. https://dukonference.lv/files/proceedings_of_conf/53konf/valodnieciba_literaturzinatne/Fasola.pdf")

        embedPractical
			.setColor("#ff6600")
            .addFields(
                { name: 'Practical module', value: 'In which aspect do slang and jargon diverge the most?'},
				{ name: 'A', value:'Slang is viewed more negatively than jargon.'},
				{ name: 'B', value:'Slang is informal while jargon is used in a more formal setting.'},
				{ name: 'C', value:'Slang brings people in while jargon tends to exclude people.'},
            )
		
		secondEmbedPractical
			.setColor("#ff6600")
            .addFields(
                { name: 'Practical module', value: 'What is the main similarity between jargon and slang?'},
				{ name: 'A', value:'They both tend to facilitate communication and can exclude people outside the group.'},
				{ name: 'B', value:'They both use a lot of acronyms.'},
				{ name: 'C', value:'They share the same purpose of making a whole new language.'},
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
						client.channels.cache.get(channel.id).send(wrongAnswer + "Close! While this can be considered a difference between both, they are not actually polar opposites. Please try again.");     
						reaction.remove(user);             
					} else if (reaction.emoji.name == multipleChoiceB) {
						client.channels.cache.get(channel.id).send(correctAnswer + "Good job! Jargon tends to be used in a formal/professional setting more often than not while slang should not be used in those settings and is considered more informal or even foul language.");   
						secondQuestionFlag = true;
						secondReactMessage = await client.channels.cache.get(channel.id).send({ embeds: [secondEmbedPractical] })
						secondReactMessage.react(multipleChoiceA)
						secondReactMessage.react(multipleChoiceB)
						secondReactMessage.react(multipleChoiceC)	
					} else if (reaction.emoji.name == multipleChoiceC) {
						client.channels.cache.get(channel.id).send(wrongAnswer + "This sentence is simply false because in fact slang can also exclude people outside the group making this a similarity to jargon. Please try again.");   
						reaction.remove(user); 
					}
				} else {
					if (reaction.emoji.name == multipleChoiceA) {
						client.channels.cache.get(channel.id).send(correctAnswer + "Good job! While it is true that both jargon and slang facilitate communication between the members of the community, it tends to leave others apart due to lack of comprehension. You may proceed to the next channel.");                 
					} else if (reaction.emoji.name == multipleChoiceB) {
						client.channels.cache.get(channel.id).send(wrongAnswer + "While it may be true that both use a lot of acronyms, it is too vague of an answer, it is not considered the main similarity between them and not it as good of a reason as the facilitation of communication both slang and jargon provide. Please try again.");
						reaction.remove(user);
					}   else if (reaction.emoji.name == multipleChoiceC) {
						client.channels.cache.get(channel.id).send(wrongAnswer + "This answer does not seem true although there are some people who complain and discriminate both jargon and slang because they almost seem like a whole new language since they do not understand it. Please try again.");
						reaction.remove(user);    
					}	
				}
            } else {
                return;
            }
        });
	}    
});