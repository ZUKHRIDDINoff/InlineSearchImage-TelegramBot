const {
    Telegraf
} = require('telegraf');
require('dotenv').config();
const searchImage = require('./searchImages');

const TELEGRAM_BOT_TOKEN = process.env.BOT_TOKEN || 'bot-token';
const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

bot.start(ctx => {
    return ctx.replyWithMarkdown(`
Hi, this is images inline bot!
Just type in any chat [@InlineSearchImagesBot](t.me/InlineSearchImagesBot) <image-name>
and you will receive the some images for this search`)
})

bot.on('text', (ctx) => {});

bot.on('inline_query', async ctx => {
    const result = await searchImage(ctx.inlineQuery.query);
    // if (!result.length) return;
    const data = result.data.hits.map(hit => {
        return {
            type: "photo",
            id: hit.id,
            photo_url: hit.pageURL,
            thumb_url: hit.previewURL,
            title: hit.tags,
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "See FULL HD photo",
                        url: hit.pageURL
                    }],
                    [{
                        text: "Share bot with friends",
                        switch_inline_query: ""
                    }]
                ]
            }
        }
    })


    ctx.answerInlineQuery(data);
})

bot.launch()
console.log('Bot started');