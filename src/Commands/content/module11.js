const Command = require("../../Structures/Command.js");
const Discord = require("discord.js");

module.exports = new Command({
	name: "module11",
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

        const learningModuleText = '\nWe chose for our final module to expose a bit about a theme related to feedback that we found interesting: Feedback in non-verbal communication.\n'
                                 + 'As Seppälä (2017) mentions, "we are constantly reading each others facial expressions and body language. Imagine that you are the person walking into someone’s'
                                 + 'office to receive feedback or that you are in an interview. By definition, your boss or the interviewer is in the position of power. You are probably paying close '
                                 + 'attention to their facial expression and nonverbal cues to get an idea of where they are coming from and how they are responding to you".\n'
                                 + 'There are many of non verbal cues that give us feedback - Facial expressions, eye contact, voice and posture are all important components that can transmit others '
                                 + 'plenty information. For example, we will feel less connected to someone crossing their arms as opposed to someone with their chest open, transmitting a sense of friendliness.'
		
		embedLearning
            .setAuthor('Module 11')
			.setTitle("Feedback through non-verbal communication")
			.setColor("#80dfff")
			.setThumbnail("https://www.ulisboa.pt/sites/ulisboa.pt/files/styles/logos_80px_vert/public/uo/logos/logo_ist.jpg?itok=2NCqbcIP")
            
        embedContent
            .setColor("#99ff99")
            .addFields(
                { name: 'Theoretical module', value: learningModuleText},
            )
            .setFooter("\u200bSeppälä, E. (2017, May 1). When Giving Critical Feedback, Focus on Your Nonverbal Cues. Harvard Business Review. https://hbr.org/2017/01/when-giving-critical-feedback-focus-on-your-nonverbal-cues\n"
                     + "Businesswoman bored in a meeting. (n.d.). [Photograph]. https://previews.123rf.com/images/wavebreakmediamicro/wavebreakmediamicro1108/wavebreakmediamicro110837557/10113683-brunette-businesswoman-bored-in-a-meeting.jpg")

        embedPractical
			.setColor("#ff6600")
            .addFields(
                { name: 'Practical module', value: 'Please have a look at the image below from a work meeting. What sentence better fits the non-verbal feedback being transmitted in this image?'},
                { name: 'A', value: 'The person looks extremely bored.'},
                { name: 'B', value: 'The person look attentive and enthusiastic about the meeting.'},
                { name: 'C', value: 'The person looks curious and inquisitive.'},
            )
   
        let reactMessage

        client.channels.cache.get(channel.id).send({ embeds: [embedLearning] }).then(() => 
		client.channels.cache.get(channel.id).send({ embeds: [embedContent] })).then(async() =>
		{reactMessage = await client.channels.cache.get(channel.id).send({ embeds: [embedPractical] })}).then(() => {
        reactMessage.react(multipleChoiceA)
        reactMessage.react(multipleChoiceB)
        reactMessage.react(multipleChoiceC)
        client.channels.cache.get(channel.id).send("https://previews.123rf.com/images/wavebreakmediamicro/wavebreakmediamicro1108/wavebreakmediamicro110837557/10113683-brunette-businesswoman-bored-in-a-meeting.jpg")})
                
		

        client.on('messageReactionAdd', async (reaction, user) => {

            if (user.bot) return;
            if (!reaction.message.guild) return;
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name == multipleChoiceA) {
                    client.channels.cache.get(channel.id).send(correctAnswer + " Nicely done! That's it from us, we hope you have enjoyed this experience and learned a couple of things about feedback.")            
                } else if (reaction.emoji.name == multipleChoiceB) {
                    client.channels.cache.get(channel.id).send(wrongAnswer + " Not quite right, the person's posture and facial expressions do not express attentiveness.")
                    reaction.remove(user); 
                } else if (reaction.emoji.name == multipleChoiceC) {
                    client.channels.cache.get(channel.id).send(wrongAnswer + " Not quite right, the person's posture and facial expressions do not express attentiveness.");   
                    reaction.remove(user);
                }
            } else {
                return;
            }

        });
	}    
});