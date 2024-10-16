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

// bot
//     .launch({
//         webhook: {
//             domain: "https://test-bot-drab-two.vercel.app"
//         }
//     })
//     .then(() => console.log("Webhook bot launch"));

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));


// Export the function for Vercel
module.exports = async (req, res) => {
    await bot.handleUpdate(req.body);
    res.status(200).send('OK');
};
