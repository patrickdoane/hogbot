const messages = require('./messages');
const { exec } = require('child_process');
const meme = require('./memes.js');
const memes = require('./memes.json');

const handleCommand = message => {
    const command = messages.formatCommand(message.content);
    switch (command) {
        case 'roster':
            const roster = getRoster();
            message.channel.send(`${message.author}`, { files: [roster.img] });
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

const getRoster = () => {
    const roster = {};
    generateRoster();
    roster.img = './out.png';
    return roster;
}

const generateRoster = () => {
    exec('Rscript rscript/raid_PNG.R rscript/roster.csv out.png'), (err, stdout, stderr) => {
        if (err) {
            return;
        }

        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    }
}

module.exports = {
    handleCommand: handleCommand,
}