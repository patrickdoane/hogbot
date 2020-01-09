/* eslint-disable indent */
const Discord = require('discord.js');
const client = new Discord.Client();
const utils = require('./utils.js');
const dotenv = require('dotenv');
const memes = require('./memes.json');
dotenv.config();

const bot_token = process.env.DISCORD_TOKEN;

client.once('ready', () => {
    console.log('Ready!');
});

client.login(bot_token);

let roster = [];
const commands = ['roster', 'signup', 'status', 'memes'];

const handleBotCommand = message => {
    const command = message.content.slice(1).toLowerCase();

    switch (command) {
        case 'roster':
            message.channel.send('Roster is currently: TODO.');
            break;
        case 'signup':
            message.channel.send(`Signed up ${message.author} for raid roster.`);
            break;
        case 'status':
            message.channel.send('Status of raid: TODO.');
            break;
        case 'memes':
            message.channel.send(utils.getRandomMeme(memes.memes));
            break;
    }
};

client.on('message', message => {
    if (utils.messageInValidChannel(message.channel.name, 'raid-signups') &&
        utils.messageContainsPrefix(message.content, '!') && !utils.messageSentByBot(message.author)) {
        if (utils.isValidBotCommand(message.content, commands)) {
            handleBotCommand(message);
        } else {
            message.channel.send(`${message.content} is not a valid command.`);
        }
    }
});