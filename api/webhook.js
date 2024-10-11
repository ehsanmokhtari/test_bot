const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters')

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on(message('sticker'), async (ctx) => {
    console.log('Received a sticker');
    try {
        await ctx.reply('👍');
    } catch (error) {
        console.error('Error sending reply:', error);
    }
});
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

module.exports = async (request, response) => {
    response.send('OK');
};