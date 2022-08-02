const { Telegraf, Markup } = require('telegraf');
const axios = require('axios');
const cc = require('currency-codes');
const { commands } = require('../TestYaleBot/const');
require('dotenv').config()

//const TELEGRAM_BOT_TOKEN =
//   process.env.TELEGRAM_BOT_TOKEN ||
//   "803022483:AAGNuHqcEKyqlJvWIG0bx6MfTXhe7SAMXgQ";

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start((ctx) => {
    return ctx.reply('Welcome to Mono Currensy Bot');
});

bot.command('currency', async (ctx) => {
    try {
        await ctx.replyWithHTML('<b>Курсы валют</b>', Markup.removeKeyboard(
                [
                    [Markup.removeKeyboard.callback('Редакторы', 'btn_1'), Markup.button.callback('Обзоры', 'btn_2'), 
                     Markup.button.callback('JS', 'btn_3')]
                ]
            ))
    } catch (e) {
        console.error(e)
    }
})

bot.hears(/^[A-Z]+$/i, async (ctx) => {
    const clientCurCode = ctx.message.text;
    const currency = cc.code(clientCurCode);
    console.log(currency);
    // check for existing currency
    if (!currency) {
        return ctx.reply('Currency didnt found');
    }
    try {
        const currencyObj = await axios.get(
            'https://api.monobank.ua/bank/currency'
        );

        const foundCurrency = currencyObj.data.find((cur) => {
            return cur.currencyCodeA.toString() == currency.number;
        });
        console.log(foundCurrency)
        if (!foundCurrency || !foundCurrency.rateBuy || !foundCurrency.rateSell) {
            return ctx.reply('Currency didnt found in Monobank API');
        }
        return ctx.replyWithMarkdown(
            `CURRENCY: ${currency.code} to UAH
RATE BUY: *${foundCurrency.rateBuy}*
RATE SELL: *${foundCurrency.rateSell}*
        `);
    } catch (error) {
        return ctx.reply(error);
    }


});

bot.startPolling();
function newFunction() {
    return {};
}

