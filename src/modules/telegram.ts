import { channel, token } from '../config';
import { Telegraf, Scenes, session, Composer, Context } from 'telegraf';

const bot = new Telegraf(token);

interface WizardSession extends Scenes.WizardSessionData {
  message: string[],
  photos: string[]
}

interface WizardContext extends Context {
  scene: Scenes.SceneContextScene<WizardContext, WizardSession>
  wizard: Scenes.WizardContextWizard<WizardContext>
}

const messageHandler = new Composer<WizardContext>();
messageHandler.on('text', async (ctx) => {
  ctx.scene.session.message.push(ctx.message.text)
})
messageHandler.command('next', async (ctx) => {
  await ctx.reply('Noice!');
  return ctx.wizard.next();
});
messageHandler.use((ctx) =>
  ctx.replyWithMarkdown('Press `Next` button or type /next when you\'re done!' ),
);

const wizard = new Scenes.WizardScene(
  'wizard',
  async (ctx) => {
    await ctx.reply(
      'Hello, friend! Start typing '
    );
    return ctx.wizard.next();
  },
  messageHandler,
  async (ctx) => {
    await ctx.reply('Step 3');
    return ctx.wizard.next();
  },
  async (ctx) => {
    await ctx.reply('Step 4');
    return ctx.wizard.next();
  },
  async (ctx) => {
    await ctx.reply('Done');
    for (const message of ctx.scene.session.message) {
      await ctx.reply(message)
    }
    return await ctx.scene.leave();
  },
);

const stage = new Scenes.Stage<WizardContext>([wizard], {
  default: 'wizard',
});
bot.use(session());
// @ts-ignore
bot.use(stage.middleware());

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
