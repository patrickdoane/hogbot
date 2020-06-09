/* eslint-disable indent */
const Discord = require('discord.js');
const client = new Discord.Client();
const dotenv = require('dotenv');
dotenv.config();
const messages = require('./bot/messages.js');
const bot = require('./bot/bot.js')
const fs = require('fs');

const bot_token = process.env.DISCORD_TOKEN;

let derivativesMessages = [];
let derivativesMessageContents = []

client.once('ready', () => {
    console.log('Ready!');
    // get derivatives messages
    const derivativesId = '218077152883638272'
    const channelId = '701225649892753410'
    const testChannel = client.channels.get(channelId);
    testChannel.fetchMessages()
        .then(messages => {
            derivativesMessages = messages.filter(message => message.author.id === derivativesId);
            derivativesMessageContents = derivativesMessages.map(message => message.content);
            console.log(derivativesMessageContents);
            fs.writeFile('file.json', JSON.stringify(derivativesMessageContents), err => console.error);
        }).catch(console.error);
});

client.login(bot_token);

const commands = ['roster', 'signup', 'status', 'memes', 'leave', 'rant'];

client.on('messageReactionAdd', messageReaction => {
    if (messageReaction.message.id === '675040480475611148') {
        console.log(messageReaction);
    }
});

client.on('message', message => {
    if (messages.isValidChannel(message.channel.name, 'general') &&
        messages.containsPrefix(message.content, '!') && !messages.isMessageSentByBot(message.author)) {
        if (messages.isValidBotCommand(message.content, commands)) {
            bot.handleCommand(message);
        }
        else {
            message.channel.send(`${message.author}, ${message.content} is not a valid command.`);
        }
    }
});