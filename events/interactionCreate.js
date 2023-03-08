const { Client, GatewayIntentBits, Collection, Partials } = require('discord.js');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		//console.log(`interaction.channel.type: ${interaction.channel.type}`);
		if (interaction.isCommand()) {
			if (interaction.channel.type === 0) { 
				if ((interaction.user.id === process.env.USER_ID_1) || (interaction.user.id === process.env.USER_ID_2)) {
					console.log(`You triggered ${interaction.commandName} in a guild`);
				} 
				else {
					console.log(`${interaction.user.tag} triggered ${interaction.commandName} in a guild`);
				}
			}
			else if (interaction.channel.type === 1) {
				if ((interaction.user.id === process.env.USER_ID_1) || (interaction.user.id === process.env.USER_ID_2)) {
					console.log(`You triggered ${interaction.commandName} in a DM`);
				} 
				else {
					console.log(`${interaction.user.tag} triggered ${interaction.commandName} in a DM`);
				}
			}
			else if (interaction.channel.type === 5) {
				if ((interaction.user.id === process.env.USER_ID_1) || (interaction.user.id === process.env.USER_ID_2)) {
					console.log(`You triggered ${interaction.commandName} in an announcement channel`);
				} 
				else {
					console.log(`${interaction.user.tag} triggered ${interaction.commandName} in an announcement channel`);
				}
			}					
			else {
				console.log(`${interaction.user.tag} triggered ${interaction.commandName} ...somewhere?`);
			}
		}
	},
};