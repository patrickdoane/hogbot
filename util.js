function checkIfBotCommand(messageContent) {
    if (messageContent.charAt(0) === "!") {
        return true;
    } else { return false; }
}

function checkIfCorrectChannel(messageChannel, channelName) {
    if (messageChannel === channelName) {
        return true;
    } else { return false; }
}

module.exports.checkIfBotCommand = checkIfBotCommand;
module.exports.checkIfCorrectChannel = checkIfCorrectChannel;