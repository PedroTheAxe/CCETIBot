const Command = require("../../Structures/Command.js");
const Discord = require("discord.js");

module.exports = new Command({
	name: "module7-8",
	description: "Shows the first channel's content",
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

        const correctAnswer = '✅'
		const wrongAnswer = '❌'

        const learningModuleText = '\nAs mentioned by Marshall Goldsmith (2018), feedforward is a different strategy in giving feedback '
                                 + 'that "is always focused on the future not the past". It offers constructive '
                                 + 'advice in a way that indicates and sets expectations in what one individual can do better going forward'
		
		embedLearning
            .setAuthor('Module 7-8')
			.setTitle("Defining Feedforward\n" + "Distinguishing feedback from feedforward")
			.setColor("#80dfff")
			.setThumbnail("https://www.ulisboa.pt/sites/ulisboa.pt/files/styles/logos_80px_vert/public/uo/logos/logo_ist.jpg?itok=2NCqbcIP")
            .setFields(
                {name: '\u200b', value: 'Please take 2 minutes to watch this video:'},
            )
        embedContent
            .setColor("#99ff99")
            .addFields(
                { name: 'Theoretical module', value: learningModuleText},
            )
            .setFooter("\u200bMarshall Goldsmith. (2018, March 19). #15: What is Feedforward? How does it work? Explains Marshall Goldsmith [Video]. YouTube. https://www.youtube.com/watch?v=UqphNTu7mVI")

        embedPractical
			.setColor("#ff6600")
            .addFields(
                { name: 'Practical module', value: 'Which of these sentence applies feedforwarding?'},
                { name: 'A', value: 'Your presentation was a mess.'},
                { name: 'B', value: 'This code is confusing.'},
                { name: 'C', value: 'Next time, try to cram less information in a single paragraph.'},
            )

        let reactMessage

        client.channels.cache.get(channel.id).send({ embeds: [embedLearning] }).then(() =>
        client.channels.cache.get(channel.id).send("https://www.youtube.com/watch?v=UqphNTu7mVI").then(() => 
		client.channels.cache.get(channel.id).send({ embeds: [embedContent] })).then(async() =>
		{reactMessage = await client.channels.cache.get(channel.id).send({ embeds: [embedPractical] })})).then(() => {
		reactMessage.react(multipleChoiceA)
		reactMessage.react(multipleChoiceB)
        reactMessage.react(multipleChoiceC)
        })

        client.on('messageReactionAdd', async (reaction, user) => {

            if (user.bot) return;
            if (!reaction.message.guild) return;
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name == multipleChoiceA) {
                    client.channels.cache.get(channel.id).send(wrongAnswer + " Not quite right, this sentence does not provide any kind of constructive advice and instead focuses on past actions.")
                    reaction.remove(user);             
                } else if (reaction.emoji.name == multipleChoiceB) {
                    client.channels.cache.get(channel.id).send(wrongAnswer + " Not quite right, this sentence does not provide any kind of future-oriented solution.")
                    reaction.remove(user); 
                } else if (reaction.emoji.name == multipleChoiceC) {
                    client.channels.cache.get(channel.id).send(correctAnswer + " Nicely done! This sentence provides a future-oriented solution and constructive feedback. You can proceed to the next channel!");   
                }
            } else {
                return;
            }

        });
	}    
});