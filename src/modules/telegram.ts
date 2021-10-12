import { Telegraf } from 'telegraf';

const channel = process.env.CHANNEL || "-1001785784747"
const token = process.env.TOKEN || "2059294408:AAFZrRNbMqxIX6dZ74vnbdCHxq4lQlc6U6I"
const bot = new Telegraf(token);

bot.start(async (ctx) => {
  await ctx.replyWithHTML('Hello!')
})

export const sendMessage = async (text: string): Promise<void> => {
  await bot.telegram
    .sendMessage(parseInt(channel), text, {
      parse_mode: 'HTML',
    })
    .then((message) => {
      return message.message_id;
    });
};

export default bot