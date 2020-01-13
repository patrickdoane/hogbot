// Helper functions for bot messages

const containsPrefix = (messageContent, prefix = '!') => {
    if (messageContent.charAt(0) === prefix) {
        return true;
    } else { return false; }
}

const formatCommand = messageContent => {
    return messageContent.slice(1).toLowerCase();
}

const isValidChannel = (messageChannel, channelName) => {
    if (messageChannel === channelName) {
        return true;
    } else { return false; }
}

const isValidBotCommand = (messageContent, botCommands) => {
    if (containsPrefix(messageContent)) {
        const command = formatCommand(messageContent);
        if (botCommands.includes(command)) {
            return true;
        } else { return false; }
    } else { return false; }
}

const isMessageSentByBot = messageAuthor => {
    if (messageAuthor.bot) {
        return true;
    } else { return false; }
}

module.exports = {
    containsPrefix: containsPrefix,
    formatCommand: formatCommand,
    isValidBotCommand: isValidBotCommand,
    isValidChannel: isValidChannel,
    isMessageSentByBot: isMessageSentByBot,
}