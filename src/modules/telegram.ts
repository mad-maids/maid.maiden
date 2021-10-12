/* eslint-disable @typescript-eslint/no-floating-promises */
import { channel, token } from '../config';
import { Telegraf } from 'telegraf';

const bot = new Telegraf(token);

export const sendMessage = async (text: string): Promise<void> => {
  console.log(text.length)
  if (text.length > 32) {await bot.telegram
    .sendMessage(parseInt(channel), text, {
      parse_mode: 'HTML',
    })
    .then((message) => {
      return message.message_id;
    });}
  else {throw Error("Message should be more than 32 characters long!")}
};

export const sendPicture = async (
  type: 'buffer' | 'url' | 'animation',
  content: string,
  message?: string,
): Promise<void> => {
  switch (type) {
    case 'buffer':
      await bot.telegram.sendPhoto(
        parseInt(channel),
        { source: content },
        { caption: message, parse_mode: 'HTML' },
      );
      break;
    case 'url':
      await bot.telegram.sendPhoto(
        parseInt(channel),
        { url: content },
        {
          caption: message,
          parse_mode: 'HTML',
        },
      );
      break;
    case 'animation':
      await bot.telegram.sendAnimation(
        parseInt(channel),
        { url: content },
        {
          caption: message,
          parse_mode: 'HTML',
        },
      );
      break
    default:
      throw Error("Content type not specified")
  }
};

export default bot;
