import { Telegraf } from 'telegraf';
import { TelegrafContext } from 'telegraf/typings/context';
import { env } from '../config';

// @ts-ignore
export const bot = new Telegraf<TelegrafContext>(process.env.TOKEN);

export const sendMessage = async (text: string): Promise<void> => {
  // @ts-ignore
  await bot.telegram.sendMessage(parseInt(env.CHANNEL), text, {
    parse_mode: 'HTML',
  });
};
