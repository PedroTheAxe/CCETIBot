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
        const embedPractical = new Discord.MessageEmbed();

		const multipleChoiceA = '🇦'
		const multipleChoiceB = '🇧'
		const multipleChoiceC = '🇨'

        const learningModuleText = "\nAs mentioned by Scott (2014), there is no universal definition of feedback. "
								 + "Usually, when people think of feedback, they relate to their school or work environments. "
								 + "It is something that is given by their teachers, employers, or peers in order to help "
								 + "understand the consequences of what they did and improve their future work (pp. 49-57). " 
		
		embedLearning
            .setAuthor('Module 1')
			.setTitle("Defining Feedback")
			.setColor("#80dfff")
			.setThumbnail("https://www.ulisboa.pt/sites/ulisboa.pt/files/styles/logos_80px_vert/public/uo/logos/logo_ist.jpg?itok=2NCqbcIP")
			.addFields(
                { name: 'Theoretical module', value:'\u200B'},
            )
			.setFooter("Scott, S. V. (2014). Practising what we preach: towards a student-centred definition of feedback. Teaching in Higher Education, 19(1), 49-57. https://www.tandfonline.com/doi/abs/10.1080/13562517.2013.827639")
        client.channels.cache.get(channel.id).send({ embeds: [embedLearning] });

        client.channels.cache.get(channel.id).send(learningModuleText);

        embedPractical
			.setColor("#ff6600")
            .addFields(
                { name: 'Practical module', value: 'When you think of giving good feedback which of these comes to your mind first?'},
				{ name: 'A', value:'"I did not like the way you wrote your essay."'},
				{ name: 'B', value:'"I appreciated the way you presented the topic, but there was too much information in each slide and the colour palette was not the best."'},
				{ name: 'C', value:'"Your painting is lovely, but I cant stand the way you coloured it and the way you framed it."'},
            )
		console.log(channel.id);
        let reactMessage = await client.channels.cache.get(channel.id).send({ embeds: [embedPractical] });

        
		reactMessage.react(multipleChoiceA)
		reactMessage.react(multipleChoiceB)
		reactMessage.react(multipleChoiceC)

        client.on('messageReactionAdd', async (reaction, user) => {

            if (user.bot) return;
            if (!reaction.message.guild) return;
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name == multipleChoiceA) {
                    client.channels.cache.get(channel.id).send("This approach to giving feedback is too vague which can cause "
															 + "some confusion as to what is to be improved on. This is called "
															 + "ineffective feedback and will be addressed in the next few topics. "
															 + "Please try again.");     
                    reaction.remove(user);             
                } else if (reaction.emoji.name == multipleChoiceB) {
                    client.channels.cache.get(channel.id).send("Good job! In this case, the receiver can not only understand if "
					                                         + "they did well or not, but they can also recognize which aspects "
															 + "they need to improve on in the future. The effectiveness of this "
															 + "feedback is due to the one giving it being more detailed and specific. "
															 + "These terms will be approached later! You can proceed to the next channel!");   
                } else if (reaction.emoji.name == multipleChoiceC) {
                    client.channels.cache.get(channel.id).send("This is a decent approach to giving feedback; however, it was given "
															 + "in a very aggressive manner which can cause the other person to not "
															 + "receive it as well. Therefore, although the feedback is somewhat specific, "
															 + "it can still be ineffective. These topics will be tackled later! Please try again. ");   
                    reaction.remove(user); 
                }
            } else {
                return;
            }

        });
	}    
});