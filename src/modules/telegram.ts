import { channel, token } from "../config";
import { Telegraf, Scenes, Markup, session, Composer } from 'telegraf';


const bot = new Telegraf(token);

const stepHandler = new Composer<Scenes.WizardContext>()
stepHandler.action('next', async (ctx) => {
  await ctx.reply('Step 2. Via inline button')
  return ctx.wizard.next()
})
stepHandler.command('next', async (ctx) => {
  await ctx.reply('Step 2. Via command')
  return ctx.wizard.next()
})
stepHandler.use((ctx) =>
  ctx.replyWithMarkdown('Press `Next` button or type /next')
)

const superWizard = new Scenes.WizardScene(
  'super-wizard',
  async (ctx) => {
    await ctx.reply(
      'Step 1',
      Markup.inlineKeyboard([
        Markup.button.url('❤️', 'http://telegraf.js.org'),
        Markup.button.callback('➡️ Next', 'next'),
      ])
    )
    return ctx.wizard.next()
  },
  stepHandler,
  async (ctx) => {
    await ctx.reply('Step 3')
    return ctx.wizard.next()
  },
  async (ctx) => {
    await ctx.reply('Step 4')
    return ctx.wizard.next()
  },
  async (ctx) => {
    await ctx.reply('Done')
    return await ctx.scene.leave()
  }
)

const stage = new Scenes.Stage<Scenes.WizardContext>([superWizard], {
  default: 'super-wizard',
})
bot.use(session())
// @ts-ignore
bot.use(stage.middleware())

export const sendMessage = async (text: string): Promise<void> => {
  await bot.telegram
    .sendMessage(parseInt(channel), text, {
      parse_mode: 'HTML',
    })
    .then((message) => {
      return message.message_id;
    });
};

export default bot;
