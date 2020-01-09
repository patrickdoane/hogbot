/* eslint-disable indent */
const Discord = require('discord.js');
const client = new Discord.Client();
const utils = require('./utils.js');
const dotenv = require('dotenv');
dotenv.config();

const bot_token = process.env.DISCORD_TOKEN;

client.once('ready', () => {
    console.log('Ready!');
});

client.login(bot_token);

let roster = [];
const commands = ['roster', 'signup', 'status'];

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
    }
};

client.on('message', message => {
    console.log(message.content);
    console.log(message.channel.name);

    if (utils.messageInValidChannel(message.channel.name, 'raid-signups') &&
        utils.messageContainsPrefix(message.content, '!') && !utils.messageSentByBot(message.author)) {
        if (utils.isValidBotCommand(message.content, commands)) {
            handleBotCommand(message);
        } else {
            message.channel.send(`${message.content} is not a valid command.`);
        }
    }
});