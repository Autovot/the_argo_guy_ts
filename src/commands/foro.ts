import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, CommandInteraction, EmbedBuilder, MessageActionRowComponentBuilder, REST } from 'discord.js'
import { ButtonComponent, Discord, Slash } from 'discordx'
import('dotenv/config')

@Discord()
export class setupShop {
  @ButtonComponent({ id: 'thread' })
  async handlerHello (interaction: ButtonInteraction): Promise<void> {
    const userPost = interaction.user
    await interaction.message.startThread({
      name: `Test ${userPost.username}`
    })
    console.log()
    await interaction.deferUpdate() // <- Esto solo funcioan en botones y menus
  }

  @ButtonComponent({ id: 'forum' })
  async handlerForum (interaction: ButtonInteraction): Promise<void> {
    const userPost = interaction.user
    const TOKEN = process.env.BOT_TOKEN
    if (TOKEN === undefined) throw Error('Could not find BOT_TOKEN in your environment')
    const CHANNEL_ID = process.env.FORUM_ID
    if (CHANNEL_ID === undefined) throw Error('Could not find CHANNEL_ID in your environment')

    const rest = new REST({ version: '10' }).setToken(TOKEN)
    try {
      await rest.post(`/channels/${CHANNEL_ID}/threads`, {
        body: {
          name: 'Post mandado por ' + userPost.username,
          auto_archive_duration: 60,
          rate_limit_per_user: 0,
          message: {
            content: `Hello, ${userPost}!`
          }
        }
      })
        .then(console.log)
    } catch (error) {
      console.error(error)
    }
    await interaction.deferUpdate()
  }

  @Slash({ description: 'setup' })
  async setup (interaction: CommandInteraction): Promise<void> {
    const setupEmbed = new EmbedBuilder()
      .setTitle('Example Embed')
      .setDescription('This is an embed message.')
    const btn = new ButtonBuilder()
      .setLabel('Thread')
      .setStyle(ButtonStyle.Primary)
      .setCustomId('thread')
    const btnForum: ButtonBuilder = new ButtonBuilder()
      .setLabel('Forum')
      .setStyle(ButtonStyle.Secondary)
      .setCustomId('forum')
    const buttonRow =
      new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(
        btn, btnForum
      )
    await interaction.reply({
      embeds: [setupEmbed],
      components: [buttonRow],
      ephemeral: true
    })
  }
}
