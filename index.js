/* eslint-disable indent */
const Discord = require('discord.js');
const client = new Discord.Client();
const dotenv = require('dotenv');
dotenv.config();
const messages = require('./bot/messages.js');
const bot = require('./bot/bot.js')

const bot_token = process.env.DISCORD_TOKEN;

client.once('ready', () => {
    console.log('Ready!');
});

client.login(bot_token);

const commands = ['roster', 'signup', 'status', 'memes', 'leave'];

client.on('message', message => {
    if (messages.isValidChannel(message.channel.name, 'raid-signups') &&
        messages.containsPrefix(message.content, '!') && !messages.isMessageSentByBot(message.author)) {
        if (messages.isValidBotCommand(message.content, commands)) {
            bot.handleCommand(message);
        }
        else {
            message.channel.send(`${message.author}, ${message.content} is not a valid command.`);
        }
    }
})
