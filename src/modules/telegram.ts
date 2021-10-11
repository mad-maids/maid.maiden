import { Telegraf } from "telegraf";
import { TelegrafContext } from "telegraf/typings/context";
import { env } from "../config";

export const bot = new Telegraf<TelegrafContext>(<string>env.TOKEN);

export const sendMessage = async (text: string): Promise<void> => {
  await bot.telegram.sendMessage(parseInt(<string>env.CHANNEL), text, {
    parse_mode: "HTML"
  })
}