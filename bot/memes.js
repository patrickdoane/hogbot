const getRandomMeme = memes => {
    return memes[Math.floor(Math.random() * memes.length)];
}

module.exports = {
    getRandomMeme: getRandomMeme
}