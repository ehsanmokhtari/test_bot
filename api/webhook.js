// Require our Telegram helper package
const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters')

// Export as an asynchronous function
// We'll wait until we've responded to the user
module.exports = async (request, response) => {
    try {
        // Create our new bot handler with the token
        // that the Botfather gave us
        // Use an environment variable so we don't expose it in our code
        const bot = new Telegraf(process.env.BOT_TOKEN);

        bot.start((ctx) => ctx.reply('Welcome'))
        bot.help((ctx) => ctx.reply('Send me a sticker'))
        bot.on(message('sticker'), (ctx) => ctx.reply('👍'))
        bot.hears('hi', (ctx) => ctx.reply('Hey there'))
        bot.launch()

        // Enable graceful stop
        process.once('SIGINT', () => bot.stop('SIGINT'))
        process.once('SIGTERM', () => bot.stop('SIGTERM'))
    }
    catch (error) {
        // If there was an error sending our message then we 
        // can log it into the Vercel console
        console.error('Error sending message');
        console.log(error.toString());
    }

    // Acknowledge the message with Telegram
    // by sending a 200 HTTP status code
    // The message here doesn't matter.
    response.send('OK');
};