import { Telegraf } from 'telegraf';
import { env } from '../config';

// @ts-ignore
const bot = new Telegraf(process.env.TOKEN);

bot.start(async (ctx) => {
  await ctx.replyWithHTML('Hello!')
})

export const sendMessage = async (text: string): Promise<void> => {
  await bot.telegram
    // @ts-ignore
    .sendMessage(parseInt(env.CHANNEL), text, {
      parse_mode: 'HTML',
    })
    .then((message) => {
      return message.message_id;
    });
};

export default bot