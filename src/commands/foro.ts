import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, CommandInteraction, EmbedBuilder, MessageActionRowComponentBuilder, GuildForumThreadManager } from 'discord.js'
import { ButtonComponent, Discord, Slash } from 'discordx'

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
    // const userPost = interaction.user
    const CHANNEL_ID = process.env.BOT_TOKEN
    if (!CHANNEL_ID) throw Error('Could not find CHANNEL_ID in your environment')
    // const forumGet = interaction.client.channels.cache.get(forumID)


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
      components: [buttonRow]
    })
  }
}
