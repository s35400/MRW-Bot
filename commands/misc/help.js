const { MessageEmbed } = require('discord.js');
const {
    cooldown
} = require('../../config.json');
module.exports = {
    name: 'help',
    cooldown: cooldown,
    description: "commande help ? ",
    async execute(message, args, client) {
       message.channel.send(new MessageEmbed()
    .setDescription('🔥 The start command will help you to create a new nation. I will ask you a few questions in your DM\'s, and will transmit your answers. (Make sure to have your dm\'s enabled ! )')
    .setFooter(client.user.username, client.user.displayAvatarURL())
     .setTitle('Start command')
     .setTimestamp()
       )

        }
    }