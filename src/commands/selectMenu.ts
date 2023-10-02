import { ActionRowBuilder, CommandInteraction, MessageActionRowComponentBuilder, ChannelSelectMenuBuilder, ChannelType, ChannelSelectMenuInteraction, CacheType, REST } from 'discord.js'
import { Discord, Slash, SelectMenuComponent } from 'discordx'

@Discord()
export class SelectMenu {
  async handlerForum(interaction: ChannelSelectMenuInteraction<CacheType>) {
    const userPost = interaction.user
    const TOKEN = process.env.BOT_TOKEN
    if (TOKEN === undefined) throw Error('Could not find BOT_TOKEN in your environment')

    const rest = new REST({ version: '10' }).setToken(TOKEN)
    try {
      await rest.post(`/channels/${interaction.values[0]}/threads`, {
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
  }

  @SelectMenuComponent({ id: "channel_menu" })
  async selectMenu (interaction: ChannelSelectMenuInteraction ): Promise<void> {
    // Need call handlerForum in foro.ts for create post with ForumID
    this.handlerForum(interaction)
    await interaction.reply({ content: 'Forum ID set', ephemeral: true })
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
