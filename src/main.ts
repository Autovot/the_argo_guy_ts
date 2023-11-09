import { dirname, importx } from '@discordx/importer'
import type { Interaction, Message } from 'discord.js'
import { IntentsBitField } from 'discord.js'
import { Client } from 'discordx'
import 'dotenv/config'

export const bot = new Client({
  // Discord intents
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.GuildVoiceStates
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
  } = process.env
  if (BOT_TOKEN === undefined) throw new Error('Could not find BOT_TOKEN in your environment')

  // Connect to database

  // Load files
  await importx(`${dirname(import.meta.url)}/{events,commands}/**/*.{ts,js}`)

  // Log in with your bot TOKEN
  await bot.login(BOT_TOKEN)
}

await run().catch(async (error) => {
  console.error(error)
  await bot.destroy()
  process.exit(1)
})
