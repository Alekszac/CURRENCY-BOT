const { Telegraf } = require('telegraf');
const TELEGRAM_BOT_TOKEN =
    process.env.TELEGRAM_BOT_TOKEN ||
    "803022483:AAGNuHqcEKyqlJvWIG0bx6MfTXhe7SAMXgQ";

const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

bot.start((ctx) => {
    return ctx.reply('Welcome to Mono Currensy Bot');
});

bot.hears('hi', (ctx)=> {
    return ctx.reply('Hi, from bot');
});

bot.startPolling();
