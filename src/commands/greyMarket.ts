import { triggerAsyncId } from "async_hooks";
import { ActionRowBuilder, ApplicationCommandOptionType, ButtonBuilder, ButtonInteraction, ButtonStyle, Channel, CommandInteraction, EmbedBuilder, MessageActionRowComponentBuilder, Role, PermissionFlagsBits } from "discord.js";
import { ButtonComponent, Discord, Slash, SlashOption } from "discordx";


@Discord()
export class GreyMarket {
  roleToAdd: Role | undefined
  chanelToSend: string = ''


  // Catch button click
  @ButtonComponent({ id: 'grey_terms' })
  async handlerGreyTerms (interaction: ButtonInteraction): Promise<void> {
    // Message and add role (role passed in @SlashOption on @Slash(grey_market)) to user
    const userPost = interaction.user
    // get member
    const member = interaction.guild?.members.cache.find(member => member.id === userPost.id)
    // set message
    const responseMessage = `¡Gracias por aceptar las condiciones, ${userPost}! Ahora puedes ver el canal de \n${this.chanelToSend}`
    // add role
    await member?.roles.add(this.roleToAdd as unknown as string)
    await interaction.reply({ content: responseMessage, ephemeral: true })
  }


  // Genarar
  @Slash({ name: 'grey_market', description: 'Grey market setup'  , defaultMemberPermissions: PermissionFlagsBits.Administrator, })
  async grey_market(
    @SlashOption({
      description: 'Add ID Role',
      name: 'role',
      required: true,
      type: ApplicationCommandOptionType.Role
    })
    role: Role,
    @SlashOption({
      description: 'Add ID Channel to send on response',
      name: 'channel_to_send',
      required: true,
      type: ApplicationCommandOptionType.Channel
    })
    channel_to_send: Channel,
    interaction: CommandInteraction
    ): Promise<void> {
    // Button
    const buttonGreyTerms: ButtonBuilder = new ButtonBuilder()
      .setCustomId('grey_terms')
      .setLabel('He leído y acepto las condiciones para ver el canal de Mercado Gris')
      .setEmoji('👍')
      .setStyle(ButtonStyle.Primary)

    // ActionRow
    const buttonRow: ActionRowBuilder<MessageActionRowComponentBuilder> =
      new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(
        buttonGreyTerms
      )

    // Embed
    const linea1: string = '¡Saludos, hijo de Kareah!'
    const linea2: string = 'Es importante que tengas en cuenta que el canal de Mercado Gris en nuestro servidor de Discord está destinado exclusivamente para que los jugadores se comuniquen y realicen transacciones privadas. Sons of Kareah no asume ninguna responsabilidad con respecto a estas transacciones. Por lo tanto, te recomendamos encarecidamente que tomes precauciones adicionales al realizar acuerdos y verifiques la legitimidad de las transacciones.'
    const linea3: string = 'Nuestro equipo de moderadores y administradores siempre está dispuesto a brindar asistencia si la necesitas, así que no dudes en contactarlos en caso de dudas o inquietudes.'
    const linea4: string = 'Recuerda que Sons of Kareah es un lugar para disfrutar de la experiencia de Star Citizen y compartir nuestra pasión por el juego. Esperamos que este canal de Mercado Gris sea de utilidad para todos los miembros, manteniendo un ambiente respetuoso y colaborativo.'
    const linea5: string = '¡Que disfrutes del juego y que todas tus transacciones sean seguras!'
    const linea6: string = 'Atentamente, El equipo de Sons of Kareah'
    const footer: string = '¡Gracias por ser parte de Sons of Kareah!'
    const embedGreyTerms: EmbedBuilder = new EmbedBuilder()
      .setAuthor({ name: 'Sons of Kareah', url: 'https://sonsofkareah.com/', iconURL: 'https://cdn.discordapp.com/attachments/814156938676797481/1167260091276349440/LOGO200.png' })
      .setTitle('Aviso sobre el canal de Mercado Gris')
      .setDescription(`${linea1}\n\n${linea2}\n\n${linea3}\n\n${linea4}\n\n${linea5}\n\n${linea6}`)
      .setFooter({ text: footer })


    //interaction
    // Cuando se genera el comando, se guarda el rol y el canal para usarlo en el click del boton en una base de datos
    this.roleToAdd = role
    this.chanelToSend = channel_to_send.url as string

    // database is connected in main.ts


    await interaction.reply({
      embeds: [embedGreyTerms],
      components: [buttonRow],
    })
  }
}