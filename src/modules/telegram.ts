import { channel, token } from '../config';
import { Telegraf, Composer, Scenes, session } from 'telegraf';

interface Session extends Scenes.WizardSessionData {
  messages: string[];
  photos: string[];
}

type User = Scenes.WizardContext<Session>;

const stepHandler = new Composer<User>();
stepHandler.action('next', async (ctx) => {
  await ctx.reply('Step 2. Via inline button');
  return ctx.wizard.next();
});
stepHandler.command('next', async (ctx) => {
  await ctx.reply('Step 2. Via command');
  return ctx.wizard.next();
});
stepHandler.use((ctx) =>
  ctx.replyWithMarkdown('Press `Next` button or type /next'),
);
stepHandler.on('text', async (ctx) => {
  ctx.scene.session.messages.push(ctx.message.text);
});

const wizard = new Scenes.WizardScene(
  'wizard',
  async (ctx) => {
    await ctx.reply('Step 1');
    return ctx.wizard.next();
  },
  stepHandler,
  async (ctx) => {
    const responseText = [
      'Step 3.',
      `Your messages are ${ctx.scene.session.messages.join(' ')}`,
    ].join('\n');
    await ctx.reply(responseText);
    return ctx.wizard.next();
  },
  async (ctx) => {
    await ctx.reply('Step 4');
    return ctx.wizard.next();
  },
  async (ctx) => {
    await ctx.reply('Done');
    return await ctx.scene.leave();
  },
);

const bot = new Telegraf<User>(token);
const stage = new Scenes.Stage<User>([wizard], {
  default: 'wizard',
});
bot.use(session());
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
