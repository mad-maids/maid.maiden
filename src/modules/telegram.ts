/* eslint-disable @typescript-eslint/no-floating-promises */
import { channel, token } from '../config';
import { Telegraf } from 'telegraf';

const bot = new Telegraf(token);

export const sendMessage = async (text: string): Promise<void> => {
  if (text.length > 32) {
    if (text.includes(' ')) {
      await bot.telegram
        .sendMessage(parseInt(channel), text, {
          parse_mode: 'HTML',
        })
        .then((message) => {
          return message.message_id;
        });
    } else throw Error("Hold on, let's make it more meaningful buddy!");
  } else throw Error('Message should be more than 32 characters long!');
};

export const sendPicture = async (
  content: string,
  message?: string | undefined,
): Promise<void> => {
  if (content) {
    await bot.telegram.sendPhoto(
      parseInt(channel),
      content,
      {
        caption: message,
        parse_mode: 'HTML',
      },
    );
  } else throw Error('Content is not specified');
};

export default bot;
