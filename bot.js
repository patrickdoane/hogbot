const messages = require('./messages');
const { exec } = require('child_process');
const meme = require('./memes.js');
const memes = require('./memes.json');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

const handleCommand = message => {
    const command = messages.formatCommand(message.content);
    switch (command) {
        case 'roster':
            message.channel.send(`${message.author}`, { files: [roster.img] });
            console.log(roster);
            break;
        case 'signup':
            if (isRosterFull(roster)) {
                message.channel.send(`Could not sign up ${message.author} because the roster is full.`);
            } else if (isDuplicateUser(message.author)) {
                message.channel.send(`Could not sign up ${message.author} because you are already on the roster!`);
            } else {
                roster.users.push(message.author);
                roster.size = roster.users.length;
                message.channel.send(`Signed up ${message.author} for raid roster. The raid is now ${roster.size}/${roster.limit}.`);
            }
            break;
        case 'status':
            if (isRosterFull(roster)) {
                message.channel.send(`${message.author}, the raid is currently full!`);
            } else {
                message.channel.send(`${message.author}, the raid is currently ${roster.size}/${roster.limit}.`);
            }
            break;
        case 'memes':
            message.channel.send(meme.getRandomMeme(memes.memes));
            break;
    }
}

const getRoster = () => {
    const roster = {};
    let rosterPath = path.resolve('roster.csv');
    fs.createReadStream(rosterPath)
        .pipe(csv())
        .on('data', data => console.log(data))
        .end('end', () => console.log('End reading CSV.'));
    generateRoster();
    roster.img = './out.png';
    roster.users = [];
    roster.limit = 40;
    roster.size = roster.users.length;
    return roster;
}

const generateRoster = () => {
    exec('Rscript rscript/raid_PNG.R roster.csv out.png'), (err, stdout, stderr) => {
        if (err) {
            return;
        }

        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    }
}

const isRosterFull = roster => {
    if (roster.size >= roster.limit) {
        return true;
    } else { return false; }
}

const isDuplicateUser = user => {
    if (roster.users.includes(user)) {
        return true;
    } else { return false; }
}

const roster = getRoster();

module.exports = {
    handleCommand: handleCommand,
}