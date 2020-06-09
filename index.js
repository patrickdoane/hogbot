/* eslint-disable indent */
const Discord = require('discord.js');
const client = new Discord.Client();
const dotenv = require('dotenv');

// Load client secret into process.env
dotenv.config();
const CLIENT_TOKEN = process.env.DISCORD_TOKEN;

// Event handling
client.once('ready', () => {
    console.log('Oink oink! Hogbot is ready!');
})

client.once('disconnect', () => {
    console.log('Snort... Hogbot was disconnected.');
})

client.login(CLIENT_TOKEN);