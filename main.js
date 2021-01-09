const fs = require('fs');
const {
    MessageEmbed,
    Client,
    Collection,
    Intents
} = require('discord.js');

const config = require('./config.json');

const Enmap = require('enmap')

const client = new Client({
    ws: {
        intents: Intents.ALL
    },
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
client.config = config
client.commands = new Collection();
client.setup = new Enmap({name: "setup"})




//                              //
//              EVENT           //
//                              // 

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(async file => {

        if (!file.endsWith(".js")) return;

        const event = await require(`./events/${file}`);

        let eventName = file.split(".")[0];

        client.on(eventName, event.bind(null, client));
    });
});



const commandFolders = fs.readdirSync('./commands').filter(folder => folder);

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {

        const command = require(`./commands/${folder}/${file}`)
        console.log(`[${folder}]Loaded module ${file}`)
        client.commands.set(command.name, command);
    }
}

client.on('warn', (e) => console.log(e));



process.on('unhandledRejection', error => {
    console.log(error.stack);
});

client.login(config.token);
