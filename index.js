const Discord = require('discord.js');
const client = new Discord.Client();
const dotenv = require('dotenv');
const utils = require('./util.js');
dotenv.config();

const bot_token = process.env.DISCORD_TOKEN;

client.once('ready', () => {
    console.log('Ready!');
});

client.login(bot_token);

client.on('message', message => {
    console.log(message.content);
    console.log(message.channel.name);

    if (utils.checkIfCorrectChannel(message.channel.name, 'raid-signups')) {
        if (utils.checkIfBotCommand(message.content)) {
            message.channel.send('Command not recognized!');
        }
    }

});

let signups = [];