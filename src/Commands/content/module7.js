const Command = require("../../Structures/Command.js");
const Discord = require("discord.js");

module.exports = new Command({
	name: "module7",
	description: "Shows the first channel's content",
	type: "BOTH",
	slashCommandOptions: [],
	permission: "SEND_MESSAGES",
	async run(channel, client) {
		const embedLearning = new Discord.MessageEmbed();
        const embedPractical = new Discord.MessageEmbed();

		const multipleChoiceA = '🇦'
		const multipleChoiceB = '🇧'
		const multipleChoiceC = '🇨'
		const multipleChoiceD = '🇩'

        const learningModuleText = '\nAs mentioned, feedforward is a different strategy in giving feedback '
                                 + 'that focuses on the future rather than the past. It offers constructive '
                                 + 'advice in a way that indicates and sets expectations in what one individual can do better going forward'
		
		embedLearning
            .setAuthor('Module 7')
			.setTitle("Defining Feedforward")
			.setColor("#80dfff")
            .addFields(
                { name: 'Theoretical module', value:'\u200B'},
            )
			.setThumbnail("https://www.ulisboa.pt/sites/ulisboa.pt/files/styles/logos_80px_vert/public/uo/logos/logo_ist.jpg?itok=2NCqbcIP")
		console.log(channel.id);
        client.channels.cache.get(channel.id).send({ embeds: [embedLearning] });

        client.channels.cache.get(channel.id).send(learningModuleText + '\nPlease take 2 minutes to watch this video:\nhttps://www.youtube.com/watch?v=UqphNTu7mVI');

        embedPractical
			.setColor("#ff6600")
            .addFields(
                { name: 'Practical module', value: 'Qual é a tua letra favorita?'},
            )
		console.log(channel.id);
        let reactMessage = await client.channels.cache.get(channel.id).send({ embeds: [embedPractical] });

        
		reactMessage.react(multipleChoiceA)
		reactMessage.react(multipleChoiceB)
		reactMessage.react(multipleChoiceC)
		reactMessage.react(multipleChoiceD)

        client.on('messageReactionAdd', async (reaction, user) => {

            if (user.bot) return;
            if (!reaction.message.guild) return;
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name == multipleChoiceA) {
                    client.channels.cache.get(channel.id).send("Uh-oh - That's not quite right. Try again!");     
                    reaction.remove(user);             
                } else if (reaction.emoji.name == multipleChoiceB) {
                    client.channels.cache.get(channel.id).send("Uh-oh - That's not quite right. Try again!");   
                    reaction.remove(user); 
                } else if (reaction.emoji.name == multipleChoiceC) {
                    client.channels.cache.get(channel.id).send("That's correct! Great job! You can proceed to the next module.");   
                } else if (reaction.emoji.name == multipleChoiceD) {
                    client.channels.cache.get(channel.id).send("Uh-oh - That's not quite right. Try again!");   
                    reaction.remove(user); 
                }
            } else {
                return;
            }

        });
	}    
});