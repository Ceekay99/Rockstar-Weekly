const { Client, GatewayIntentBits, PermissionsBitField, Collection, Partials, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require('discord.js');
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile

module.exports = {
	name: 'interactionCreate',
	async execute(interaction, user) {

		if (!interaction.isButton()) {return};
		if ( (interaction.customId.startsWith(`rdostopback -`)) || (interaction.customId.startsWith(`gtastopback -`)) ) {

			let rdo_gta = "";
			if (interaction.customId.startsWith(`rdostopback -`)) {
				rdo_gta += 'rdo';
			} else {
				rdo_gta += 'gta';
			} 

		let buttonUserID01 = (interaction.customId).split(`${rdo_gta}stopback - `);
		let buttonUserID = buttonUserID01[1];
			//console.log(`stopback buttonUserID: ${buttonUserID}`);
			//console.log(`stopback interaction.user.id === buttonUserID? ${interaction.user.id === buttonUserID}`);
			//console.log(`stopback interaction.user.id: ${interaction.user.id} && buttonUserID: ${buttonUserID}`);

		let guildRoleIds = [];
		fs.readFile('./rolesDataBase.txt', 'utf8', async function (err, data) {
		    if (err) {console.log(`Error: ${err}`)} //If an error, console.log
		
					interaction.guild.roles.cache.forEach(role => {
							if (data.includes(role.id)) {
								guildRoleIds.push(role.id);
							}
					});
			guildRoleIds.splice(guildRoleIds.length - 1); //.splice(guildRoleIds.length - 1) removes the @everyone role
				//console.log(`guildRoleIds: ${guildRoleIds}`);

			function AdminRequired() {
				let AdminRequiredBoolean = data.split(`guild:${interaction.guild.id} - admin:`);
				if (AdminRequiredBoolean[1] === undefined) {
					 	fs.appendFile(`./rolesDataBase.txt`,`guild:${interaction.guild.id} - admin:yes - role:undefined - \n`, err => {
 							if (err) {
 								console.error(err)
 								return
 							}					
 						}); //end fs.appendFile	
				}
				else if (AdminRequiredBoolean[1].startsWith(`yes`)) {
					return "AdminRequiredYes";
				}
				else {
					return "AdminRequiredNo";
				}
			}		
				//console.log(`AdminRequired(): ${AdminRequired()}`)

//--BEGIN TRANSLATIONS--//
			fs.readFile('./LANGDataBase.txt', 'utf8', async function (err, data) {
			  if (err) {console.log(`Error: ${err}`)} 
				else {
					let lang03 = data.split("lang:");
					//console.log(`lang03.length: ${lang03.length}`);

					let langArray = [];
					for (i=2; i <= lang03.length - 1; i++) { //first will always be undefined
						let lang02 = lang03[i].split(" -");
						//console.log(`lang02 at ${i}: ${lang02}`);
						
						let lang01 = lang02[0];
						//console.log(`lang01 at ${i}: ${lang01}`);

						langArray.push(lang01);
					}

					//console.log(`langArray: ${langArray}`);

					let guildID03 = data.split("guild:");
					//console.log(`guildID03.length: ${guildID03.length}`);
					let guildIDArray = [];
					for (i=2; i <= guildID03.length - 1; i++) { //first two will always be undefined
						let guildID02 = guildID03[i].split(" -");
						//console.log(`lang02 at ${i}: ${lang02}`);
						
						let guildID01 = guildID02[0];
						//console.log(`lang01 at ${i}: ${lang01}`);

						guildIDArray.push(guildID01);
					}

					//console.log(`guildIDArray: ${guildIDArray}`);	

					let lang = "";
					for (i=0; i <= guildIDArray.length - 1; i++) {
						//console.log(`guildIDArray at ${i}: ${guildIDArray[i]}`);
						//console.log(`langArray at ${i}: ${langArray[i]}`);
						//console.log(`interaction.guildID at ${i}: ${interaction.guild.id}`);

						if (interaction.guild.id === guildIDArray[i]) {
							lang += `${langArray[i]}`;
						}
					}

					//console.log(`lang: ${lang}`);	

	function stopTitle() {
		if (lang === "en") {
			return `Stop Auto Posting`;
		}
		else if (lang === "es") {
			return `Detener publicaciones automáticas`;
		}
		else if (lang === "ru") {
			return `Остановка автоматических сообщений`;
		}
		else if (lang === "de") {
			return `Automatische Beiträge stoppen`;
		}
		else if (lang === "pt") {
			return `Parar postagens automáticas`;
		}
		else {
			return `Stop Auto Posting`;
		}		
	}

	function stopDesc() {
		if (lang === "en") {
			return `Click **\'GTA\'** to remove a channel from receiving GTA Online Auto Posts.
			\nClick **\'RDO\'** to remove a channel from receiving Red Dead Online Auto Posts.`;
		}
		else if (lang === "es") {
			return `Haga clic en **\'GTA\'** para quitar un canal de GTA Online.
			\nHaga clic en **\'RDO\'** para quitar un canal Red Dead Online.`;
		}
		else if (lang === "ru") {
			return `Щелчок **\'GTA\'** удалить канал GTA Online.
			\nЩелчок **\'RDO\'** удалить канал Red Dead Online.`;
		}
		else if (lang === "de") {
			return `Klicken **\'GTA\'** So entfernen Sie einen GTA Online-Kanal.
			\nKlicken **\'RDO\'** So entfernen Sie einen Kanal-Red Dead Online.`;
		}
		else if (lang === "pt") {
			return `Clique **\'GTA\'** para remover um canal GTA Online.
			\nClique **\'RDO\'** para remover um canal Red Dead Online.`;
		}
		else {
			return `Click **\'GTA\'** to remove a channel from receiving GTA Online Auto Posts.
			\nClick **\'RDO\'** to remove a channel from receiving Red Dead Online Auto Posts.`;
		}		
	}

	function goBack() {
		if (lang === "en") {
				return `Go Back`;
		}
		else if (lang === "es") {
			return `Volver`;
		}
		else if (lang === "ru") {
			return `Вернуться`;
		}
		else if (lang === "de") {
			return `Zurück`;
		}
		else if (lang === "pt") {
			return `Voltar`;
		}
		else {
			return `Go Back`;
		}					
	}	

	function notYourButtonString() {
		if (lang === "en") {
			return `These buttons are not for you.`;
		}
		else if (lang === "es") {
			return `Estos botones no son para ti.`;
		}
		else if (lang === "ru") {
			return `Эти кнопки не для вас.`;
		}
		else if (lang === "de") {
			return `Diese Schaltflächen sind nicht für Sie.`;
		}
		else if (lang === "pt") {
			return `Esses botões não são para você.`;
		}
		else {
			return `These buttons are not for you.`;
		}				
	}	

	function firstCommandString() {
		if (lang === "en") {
			return `It looks like this is your first time using this command. Please try the stop button again.`;
		}
		else if (lang === "es") {
			return `Esta es la primera vez que usas este comando. Vuelva a intentar el botón Detener.`;
		}
		else if (lang === "ru") {
			return `Эта команда используется впервые. Попробуйте нажать кнопку Стоп еще раз.`;
		}
		else if (lang === "de") {
			return `Dies ist das erste Mal, dass Sie diesen Befehl verwenden. Wiederholen Sie die Schaltfläche Stopp.`;
		}
		else if (lang === "pt") {
			return `Esta é a primeira vez que você usa este comando. Tente o botão Parar novamente.`;
		}
		else {
			return `It looks like this is your first time using this command. Please try the stop button again.`;
		}				
	}

	function missingPermissions()	{
		if (lang === "en") {
			return `You do not have the required permissions to do that.`;
		}
		else if (lang === "es") {
		  return `No tienes permiso para hacer eso.`;
		}
		else if (lang === "ru") {
		  return `У вас нет разрешения на это.`;
		}
		else if (lang === "de") {
		  return `Sie haben keine Erlaubnis dazu.`;
		}
		else if (lang === "pt") {
		  return `Você não tem permissão para fazer isso.`;
		}
		else {
		  return `You do not have the required permissions to do that.`;
		}				
	}	

	function notYourButtonString() {
		if (lang === "en") {
			return `These buttons are not for you.`;
		}
		else if (lang === "es") {
			return `Estos botones no son para ti.`;
		}
		else if (lang === "ru") {
			return `Эти кнопки не для вас.`;
		}
		else if (lang === "de") {
			return `Diese Schaltflächen sind nicht für Sie.`;
		}
		else if (lang === "pt") {
			return `Esses botões não são para você.`;
		}
		else {
			return `These buttons are not for you.`;
		}				
	}	

	function errorString() {
		if (lang === "en") {
			return `There was an error executing this button.`;
		}
		if (lang === "es") {
			return `Se ha producido un error.`;
		}
		if (lang === "ru") {
			return `Произошла ошибка.`;
		}
		if (lang === "de") {
			return `Es ist ein Fehler aufgetreten.`;
		}
		if (lang === "pt") {
			return `Ocorreu um erro.`;
		}			
		else {
			return `There was an error executing this button.`;
		}			
	}	

//-----END TRANSLATIONS-----//

		const stopEmbed = new EmbedBuilder()
			.setColor(0xFF0000) //red
			.setTitle(`${stopTitle()}`)
			.setDescription(`${stopDesc()}`)	
			
		const stopButtons = new ActionRowBuilder()
			.addComponents(
			    new ButtonBuilder()
			        .setCustomId(`gtastop - ${interaction.user.id}`)
			        .setLabel('GTA')
			        .setStyle(ButtonStyle.Success),
			    new ButtonBuilder()
			        .setCustomId(`rdostop - ${interaction.user.id}`)
			        .setLabel('RDO')
			        .setStyle(ButtonStyle.Danger),		
					new ButtonBuilder()
			        .setCustomId(`stopback - ${interaction.user.id}`)
			        .setLabel(`${goBack()}`)
			        .setStyle(ButtonStyle.Secondary),	
			);				

//begin checking for permissions
		await interaction.deferUpdate();
		//console.log(`AdminRequired(): ${AdminRequired()}`)
		if (interaction.user.id != buttonUserID) {
			await interaction.followUp({ content: `${notYourButtonString()}`, ephemeral: true });
		}	
		else if (AdminRequired() === undefined) {
				await interaction.followUp({ content: `${firstCommandString()}`, ephemeral: true });
		}
		else if (AdminRequired() === "AdminRequiredYes") { //if admin permissions are required
			if ( (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) && (interaction.user.id === buttonUserID) ) {
					await interaction.editReply({ embeds: [stopEmbed], components: [stopButtons] }).catch(err => console.log(`stopEmbed Error: ${err}`));	
			} 
			else if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
					await interaction.followUp({content: `${missingPermissions()}`, ephemeral: true});
			}
				
			else if (!interaction.user.id === buttonUserID)  {
					await interaction.followUp({ content: `${notYourButtonString()}`, ephemeral: true });	
			}
		}
			
		else if (AdminRequired() === "AdminRequiredNo") { //if admin permissions are NOT required

				//console.log(`guildRoleIds.length: ${guildRoleIds.length}`)
				let hasARole = 0;
				for (a=0;a<=guildRoleIds.length - 1;a++) { //iterates through each role
					//console.log(`guildRoleIds at ${i}: ${guildRoleIds[i]}`);
					if (interaction.member.roles.cache.has(guildRoleIds[a])) {
						hasARole += 1;
					}
				} //end loop to check for hasARole
					//console.log(`hasARole: ${hasARole} && required roles:${guildRoleIds.length}`)
				if ( (guildRoleIds.length === 0) && (interaction.user.id === buttonUserID) ) { //no role required
					await interaction.editReply({ embeds: [stopEmbed], components: [stopButtons] }).catch(err => console.log(`stopButtons Error: ${err.stack}`));
				}
					
				else if ( (hasARole >= 1) && (interaction.user.id === buttonUserID) ) { //if the user has at least one role listed
						await interaction.editReply({ embeds: [stopEmbed], components: [stopButtons] }).catch(err => console.log(`stopButtons Error: ${err.stack}`));
				}
					
				else if ( (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) && (interaction.user.id === buttonUserID) ) { //If the user is an administrator
						await interaction.editReply({ embeds: [stopEmbed], components: [stopButtons] }).catch(err => {console.log(`stopButtons Error: ${err.stack}`); process.kill(1);});
				}		
				else if (hasARole <= 0) { //if the user does not have a listed role and is not an administrator
					await interaction.followUp({content: `${missingPermissions()}`, ephemeral: true});
				}											
		}
			
		else {
			await interaction.followUp({ content: `${errorString()}`, ephemeral: true });
		} //end checking for permissions	

			function expiredDesc() {
				if (lang === "en") {
					return `This interaction expired`;
				}
				if (lang === "es") {
					return `Esta interacción expiró.`;
				}
				if (lang === "ru") {
					return `Срок действия этого взаимодействия истек.`;
				}
				if (lang === "de") {
					return `Diese Interaktion ist abgelaufen`;
				}
				if (lang === "pt") {
					return `Esta interação expirou.`;
				}
				else {
					return `This interaction expired`;
				}						
			}

			const expiredButton = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setCustomId(`expired`)
						.setLabel(`${expiredDesc()}`)
						.setStyle(ButtonStyle.Secondary)
						.setEmoji(':RSWeekly:1025248227248848940')
						.setDisabled(true),			
				);						

				setTimeout(() => {
					interaction.editReply({components: [expiredButton]}).catch(err => {console.log(`stopBack expiredButton Error: ${err.stack}`)});
				}, (60000 * 5))						

				}});// end fs:readFile for LANGData.txt
		}); //end fs:readFile			
	
	} //end if stop
	},
}