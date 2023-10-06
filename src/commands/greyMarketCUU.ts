import { ActionRowBuilder, ChannelSelectMenuBuilder, ChannelSelectMenuInteraction, ChannelType, CommandInteraction, EmbedBuilder, MessageActionRowComponentBuilder, ButtonBuilder, ButtonStyle } from 'discord.js'
import { Discord, SelectMenuComponent, Slash, SlashGroup } from 'discordx'
import { Test } from './exportTest.ts'
import { title } from 'process'

@Discord()
@SlashGroup({ description: 'Setup', name: 'setup' })
export class GreyMarketCUU {
  @SelectMenuComponent(({ id: 'channel_menu_ccu' }))
  async selectMenuCC(interaction: ChannelSelectMenuInteraction): Promise<void> {
    await Test()
    await interaction.reply({
      content: `Channel Selected ${interaction.values[0]}`,
      ephemeral: true
    })
  }

  @Slash({ description: 'Setup for CCU' })
  @SlashGroup('setup')
  async ccu(interaction: CommandInteraction): Promise<void> {
    const selectChannelCCU: ChannelSelectMenuBuilder = new ChannelSelectMenuBuilder({
      custom_id: 'channel_menu_ccu',
      placeholder: 'Select channel',
      min_values: 1,
      max_values: 1
    }).setChannelTypes(ChannelType.GuildText)

    const textEmbed: string = `The channel selected in the drop-down\nis where the message will be create to\ninteract and create ccu requests`

    const setupEmbedCUU: EmbedBuilder = new EmbedBuilder()
    .setTitle('TheArgoGuy Grey Market CCU Setup')
    .setDescription("```ansi\n\u001b[0;33m" + textEmbed + "\n```")

    const buttonRow: ActionRowBuilder<MessageActionRowComponentBuilder> = new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(selectChannelCCU)

    await interaction.reply({

      embeds: [setupEmbedCUU],
      components: [buttonRow],
      ephemeral: true
    })
  }
}
