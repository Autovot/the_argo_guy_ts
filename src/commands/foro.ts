import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, CommandInteraction, EmbedBuilder, MessageActionRowComponentBuilder } from 'discord.js'
import { ButtonComponent, Discord, Slash } from 'discordx'

@Discord()
export class setupShop {
  @ButtonComponent({ id: 'thread' })
  handlerHello (interaction: ButtonInteraction): void {
    const userPost = interaction.user
    interaction.message.startThread({
      name: `Test ${userPost.username}`
    })
    console.log()
    interaction.deferUpdate() // <- Esto solo funcioan en botones y menus


  }

  @ButtonComponent({ id: 'forum' })
  handlerForum (interaction: ButtonInteraction): void {
    interaction.reply(':smile:')
    // interaction.guild?.channels.cache.get('1125577871327514654')?.setName('Test')
  }

  @Slash({ description: 'setup' })
  setup (interaction: CommandInteraction): void {
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
    interaction.reply({
      embeds: [setupEmbed],
      components: [buttonRow]
    })
  }
}
