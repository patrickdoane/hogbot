function messageContainsPrefix(messageContent, prefix = '!') {
    if (messageContent.charAt(0) === prefix) {
        return true;
    } else { return false; }
}

function messageInValidChannel(messageChannel, channelName) {
    //TODO: Handle multiple channels
    if (messageChannel === channelName) {
        return true;
    } else { return false; }
}

function isValidBotCommand(messageContent, botCommands) {
    const command = messageContent.slice(1).toLowerCase();
    if (botCommands.includes(command)) {
        return true;
    } else { return false; }
}

function messageSentByBot(messageAuthor) {
    if (messageAuthor.bot) {
        console.log(messageAuthor.bot);
        return true;
    } else { return false; }
}

module.exports.messageContainsPrefix = messageContainsPrefix;
module.exports.messageInValidChannel = messageInValidChannel;
module.exports.isValidBotCommand = isValidBotCommand;
module.exports.messageSentByBot = messageSentByBot;