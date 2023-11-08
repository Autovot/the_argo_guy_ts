import { dirname, importx } from '@discordx/importer'
import type { Interaction, Message } from 'discord.js'
import { IntentsBitField } from 'discord.js'
import { Client } from 'discordx'
import { Sequelize } from 'sequelize'
import 'dotenv/config'

export const bot = new Client({
  // Discord intents
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.GuildVoiceStates,
  ],

  // Debug logs are disabled in silent mode
  silent: false,

  // Configuration for @SimpleCommand
  simpleCommand: {
    prefix: '!'
  }
})

bot.once('ready', async () => {
  // Synchronize applications commands with Discord
  await bot.initApplicationCommands()

  console.log('Bot started')
})

bot.on('interactionCreate', (interaction: Interaction) => {
  bot.executeInteraction(interaction)
})

bot.on('messageCreate', async (message: Message) => {
  await bot.executeCommand(message)
})

async function run (): Promise<void> | never {
  // Get environment variables
  const {
    BOT_TOKEN,
    PG_DATABASE,
    PG_USER,
    PG_PASSWORD,
    PG_HOST,
    PG_PORT
  } = process.env;
  if (!BOT_TOKEN) throw new Error('Could not find BOT_TOKEN in your environment');
  if (!PG_DATABASE) throw new Error('Could not find PG_DATABASE in your environment');
  if (!PG_USER) throw new Error('Could not find PG_USER in your environment');
  if (!PG_PASSWORD) throw new Error('Could not find PG_PASSWORD in your environment');
  if (!PG_HOST) throw new Error('Could not find PG_HOST in your environment');
  if (!PG_PORT) throw new Error('Could not find PG_PORT in your environment');

  // Create connection to database
  const sequelize = new Sequelize(PG_DATABASE, PG_USER, PG_PASSWORD, {
    host: PG_HOST,
    port: Number(PG_PORT),
    dialect: 'postgres',
    logging: false,
    storage: 'database.postgres'
  });

  // Connect to database
  try {
    await sequelize.authenticate();
    console.info('database >> Connection has been established successfully');
  }
  catch (error) {
    console.error('database >> Unable to connect to the database:', error);
  }


  // Load files
  await importx(`${dirname(import.meta.url)}/{events,commands}/**/*.{ts,js}`);

  // Log in with your bot TOKEN
  await bot.login(BOT_TOKEN);
}

await run()
