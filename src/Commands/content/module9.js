const Command = require("../../Structures/Command.js");
const Discord = require("discord.js");

module.exports = new Command({
	name: "module9",
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

        const learningModuleText = '\nTo convert feedback into feedforward, we have to remove the retrospective aspect from feedback. As Singh (2020) mentions that to convert to feedforwarding we need'
								 + '"personalized discussion about the future (...) to instill the idea of positive change in a better manner", follow the "idea of plussing", which means to iterate '
								 + 'on ideas without being judgemental and to work on "self-improvement". Implementing all of these components allows us to focus on our actions going forward to better find solutions and improvements '
		
		embedLearning
            .setAuthor('Module 9')
			.setTitle("Converting feedback into feedforward")
			.setColor("#80dfff")
			.setThumbnail("https://www.ulisboa.pt/sites/ulisboa.pt/files/styles/logos_80px_vert/public/uo/logos/logo_ist.jpg?itok=2NCqbcIP")
            
        embedContent
            .setColor("#663300")
            .addFields(
                { name: 'Theoretical module', value: learningModuleText},
            )
            .setFooter("\u200bSingh, S. (2020, October 18). Turning Feedback into Valuable Feedforward. Classcardapp. https://www.classcardapp.com/post/turning-feedback-into-valuable-feedforward")

        embedPractical
			.setColor("#ff6600")
            .addFields(
                { name: 'Practical module', value: 'Which would be the appropriate feedforward version of this sentence?\nYour code is a mess and it’s not properly documented.'},
                { name: 'A', value: 'Your code is a mess and you would do better if it was properly documented.'},
                { name: 'B', value: 'Your code would be even better if it was clearer and properly documented.'},
                { name: 'B', value: 'Your code would be better if it was clearer, but the documentation is an absolute mess.'},
            )
        client.channels.cache.get(channel.id).send({ embeds: [embedLearning] });
        client.channels.cache.get(channel.id).send({ embeds: [embedContent] });
        let reactMessage = await client.channels.cache.get(channel.id).send({ embeds: [embedPractical] });

        
		reactMessage.react(multipleChoiceA)
		reactMessage.react(multipleChoiceB)

        client.on('messageReactionAdd', async (reaction, user) => {

            if (user.bot) return;
            if (!reaction.message.guild) return;
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name == multipleChoiceA) {
                    client.channels.cache.get(channel.id).send("Not quite right, this sentence is not fully converted to feedforwarding.")
                    reaction.remove(user);             
                } else if (reaction.emoji.name == multipleChoiceB) {
                    client.channels.cache.get(channel.id).send("Nicely done! This sentence has been converted to feedback and provides future-oriented solutions with constructive feedback.")
                } else if (reaction.emoji.name == multipleChoiceB) {
                    client.channels.cache.get(channel.id).send("Not quite right, this sentence is not fully converted to feedforwarding.");   
					reaction.remove(user); 
                }
            } else {
                return;
            }

        });
	}    
});