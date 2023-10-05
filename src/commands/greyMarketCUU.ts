import { ActionRowBuilder, ChannelSelectMenuBuilder, ChannelSelectMenuInteraction, ChannelType, CommandInteraction, MessageActionRowComponentBuilder } from 'discord.js'
import { Discord, SelectMenuComponent, Slash, SlashGroup } from 'discordx'
import { Test } from './exportTest.ts'

@Discord()
@SlashGroup({ description: 'Setup', name: 'setup' })
export class GreyMarketCUU {
  @SelectMenuComponent(({ id: 'channel_menu_ccu' }))
  async selectMenuCC (interaction: ChannelSelectMenuInteraction): Promise<void> {
    await Test()
    await interaction.reply({
      content: `Channel Selected ${interaction.values[0]}`,
      ephemeral: true
    })
  }

  @Slash({ description: 'Setup for CCU' })
  @SlashGroup('setup')
  async ccu (interaction: CommandInteraction): Promise<void> {
    const selectChannelCCU: ChannelSelectMenuBuilder = new ChannelSelectMenuBuilder({
      custom_id: 'channel_menu_ccu',
      placeholder: 'Select channel',
      min_values: 1,
      max_values: 1
    }).setChannelTypes(ChannelType.GuildText)

    const buttonRow: ActionRowBuilder<MessageActionRowComponentBuilder> = new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(selectChannelCCU)

    await interaction.reply({
      content: 'Select channel for ccu builder',
      components: [buttonRow],
      ephemeral: true
    })
  }
}
