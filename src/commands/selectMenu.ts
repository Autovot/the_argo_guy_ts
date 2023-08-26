import { ActionRowBuilder, CommandInteraction, MessageActionRowComponentBuilder, ChannelSelectMenuBuilder, ChannelType, ChannelSelectMenuInteraction } from 'discord.js'
import { Discord, Slash, SelectMenuComponent } from 'discordx'

@Discord()
export class SelectMenu {
  @SelectMenuComponent({ id: "channel_menu" })
  async selectMenu (interaction: ChannelSelectMenuInteraction ): Promise<void> {
    interaction.reply({
      content: `You have selected ${interaction.values}!`,
      ephemeral: true,
    })
  }




  @Slash({ description: 'select' })
  async select (interaction: CommandInteraction): Promise<void> {

    // Create RoleSelectMenu
    const channelMenu = new ChannelSelectMenuBuilder({
      custom_id: 'channel_menu',
      placeholder: 'Select channel',
      min_values: 1,

    }).setChannelTypes(ChannelType.GuildForum)

    // Add options

    const buttonRow =
      new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(
        channelMenu
      )

    await interaction.reply({
      content: 'Select channel',
      components: [buttonRow],
      ephemeral: true,
    })
  }
}
