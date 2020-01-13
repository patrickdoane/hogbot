const messages = require('./messages');

const handleCommand = message => {
    const command = messages.formatCommand(message.content);
    switch (command) {
        case 'roster':
            const roster = getRoster();
            message.channel.send(`${message.author}, ${roster.img}`);
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
    return roster;
}

module.exports = {
    handleCommand: handleCommand,
}