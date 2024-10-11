const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
    console.log('Bot started:', ctx.from);
    ctx.reply('Welcome');
});

bot.help((ctx) => {
    console.log('Help command received:', ctx.from);
    ctx.reply('Send me a sticker');
});

bot.on(message('sticker'), (ctx) => {
    console.log('Received a sticker from:', ctx.from);
    ctx.reply('👍');
});

bot.hears('hi', (ctx) => {
    console.log('Greeting received from:', ctx.from);
    ctx.reply('Hey there');
});

bot
    .launch({ webhook: { domain: "https://test-bot-drab-two.vercel.app/", port: process.env.PORT || 443 } })
    .then(() => console.log("Webhook bot listening on port", "3000"));

    // Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));


module.exports = async (request, response) => {
    console.log('Webhook received:', request.body);
    response.send('OK');
};

