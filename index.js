/* eslint-disable indent */
const Discord = require('discord.js');
const client = new Discord.Client();
const meme = require('./memes.js');
const dotenv = require('dotenv');
const memes = require('./memes.json');
dotenv.config();
const messages = require('./messages');

const bot_token = process.env.DISCORD_TOKEN;

client.once('ready', () => {
    console.log('Ready!');
});

client.login(bot_token);

let roster = [];
const commands = ['roster', 'signup', 'status', 'memes'];

const handleBotCommand = message => {
    const command = messages.formatCommand(message.content);
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
            message.channel.send(meme.getRandomMeme(memes.memes));
            break;
    }
}

client.on('message', message => {
    if (messages.isValidChannel(message.channel.name, 'raid-signups') &&
        messages.containsPrefix(message.content, '!') && !messages.isMessageSentByBot(message.author)) {
        if (messages.isValidBotCommand(message.content, commands)) {
            handleBotCommand(message);
        } else {
            message.channel.send(`${message.author}, ${message.content} is not a valid command.`);
        }
    }
})
