const { MessageEmbed } = require('discord.js');
const {
    cooldown
} = require('../../config.json');
module.exports = {
    name: 'start',
    cooldown: cooldown,
    description: "Start command",
    async execute(message, args, client) {
        try {
            message.author.send(new MessageEmbed().setTitle('Create your nation !')
            .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL())
                
                .setDescription('I will ask you some questions, you have 60 seconds each time to answer. Just react to the corresponding reaction. Please wait for all the reactions to show up before reaction. If it\'s not working, try to re-react again.\nYou must not exceed 5 points in order to make a balanced nation.\nPlease react with 🟢 to start.')
            ).then(startMessage => {



                startMessage.react('🟢')
                const collector = startMessage.createReactionCollector(

                    (reaction, user) => ['🟢'].includes(reaction.emoji.name) && user.id === message.author.id,

                    {
                        time: 60000
                    }
                )
                let answers = [];
                let points = 0;
                collector.on('collect', async reaction => {

                    if (reaction.emoji.name === '🟢') {
                        message.author.send(new MessageEmbed()
                            .setTimestamp()
                            .setFooter(`${client.user.username} | points: X`, client.user.displayAvatarURL())
                            .setTitle('What is the state of your economy ?')
                            .setDescription('🟢 Amazing\n🟠 Decent\n🔴 Below Average')
                        ).then(async firstQuestion => {
                            await firstQuestion.react('🟢')
                            await firstQuestion.react('🟠')
                            await firstQuestion.react('🔴')

                            const filter = (reaction, user) => user.id === message.author.id
                            firstQuestion.awaitReactions(filter, {
                                    time: 60000,
                                    max: 1
                                })
                                .then(collected1 => {
                                    if(!collected1.first()) return message.author.send('Time expired, please restart.')
                                    switch (collected1.first().emoji.name) {
                                        case '🟢':
                                            answers.push('Amazing')
                                            points =   points + 3
                                            console.log(points)
                                            break;
                                        case '🟠':
                                            answers.push('Decent')
                                            points =   points + 2
                                            break;
                                        case '🔴':
                                            answers.push('Below Average')
                                            points =    points + 1
                                            break;
                                        default:
                                            return message.author.send('Wrong reaction, please restart.')
                                            
                                    }
                                    //============================================================================================================

                                    message.author.send(new MessageEmbed()
                                        .setTimestamp()
                                        .setFooter(`${client.user.username} | points: ${points}`, client.user.displayAvatarURL())
                                        .setTitle('How stable is your country ?')
                                        .setDescription('🟢 Perfect\n🟠 Good\n🔴 Average')
                                    ).then(async secondQuestion => {
                                        await secondQuestion.react('🟢')
                                        await secondQuestion.react('🟠')
                                        await secondQuestion.react('🔴')

                                        const filter = (reaction, user) => user.id === message.author.id
                                        secondQuestion.awaitReactions(filter, {
                                                time: 60000,
                                                max: 1
                                            })
                                            .then(collected2 => {
                                                if(!collected2.first()) return message.author.send('Time expired, please restart.')
                                                switch (collected2.first().emoji.name) {
                                                    case '🟢':
                                                        answers.push('Perfect')
                                                        points = points + 3
                                                        break;
                                                    case '🟠':
                                                        answers.push('Good')
                                                        points =  points + 2
                                                        break;
                                                    case '🔴':
                                                        answers.push('Average')
                                                        points =   points + 1
                                                        break;
                                                    default:
                                                        return message.author.send('Wrong reaction, please restart.')

                                                }
                                                //=======================================================================================
                                                message.author.send(new MessageEmbed()
                                                    .setTimestamp()
                                                    .setFooter(`${client.user.username} | points: ${points}`, client.user.displayAvatarURL())
                                                    .setTitle('How is your military ?')
                                                    .setDescription('🟢 Above Average\n🟠 Average\n🔴 Bad')
                                                ).then(async thirdQuestion => {
                                                    await thirdQuestion.react('🟢')
                                                    await thirdQuestion.react('🟠')
                                                    await thirdQuestion.react('🔴')
            
                                                    const filter = (reaction, user) => user.id === message.author.id
                                                    thirdQuestion.awaitReactions(filter, {
                                                            time: 60000,
                                                            max: 1
                                                        })
                                                        .then(collected3 => {
                                                            if(!collected3.first()) return message.author.send('Time expired, please restart.')
                                                            switch (collected3.first().emoji.name) {
                                                                case '🟢':
                                                                    answers.push('Above Average')
                                                                    points =    points + 3
                                                                    break;
                                                                case '🟠':
                                                                    answers.push('Average')
                                                                    points =     points + 2
                                                                    break;
                                                                case '🔴':
                                                                    answers.push('Bad')
                                                                    points =     points + 1
                                                                    break;
                                                                default:
                                                                    return message.author.send('Wrong reaction, please restart.')
            
                                                            }
            
                                                            if(points > 5) return message.author.send('You exceeded 5 points, please restart again.')
                                                            else client.channels.cache.get('737648949459943509').send(new MessageEmbed()
                                                            .setTimestamp()
                                                            .setFooter(`${client.user.username} | Total Points: ${points}`, client.user.displayAvatarURL())
                                                            .setTitle('New Nation !')
                                                            .setDescription(`State of the economy: \`${answers[0]}\`\nCountry Stability: \`${answers[1]}\`\n Military state: \`${answers[2]}\``)
                                                            )
                                                        })
            
            
            
                                                })
            


                                            })



                                    })





                                })



                        })



                        //     🟢 🟠 🔴


                    } else {
                        message.author.send('Wrong reaction !').then(msg => msg.delete({
                            timeout: 5000
                        }))
                    }

                })


            })




        } catch(err) {
            console.log(err)
            message.channel.send('I couldn\'t dm you, check your dm\'s settings.')
        }


    }
}