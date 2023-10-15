import { Discord, Slash } from "discordx";

@Discord()
export class Translate {
  @Slash({ description: 'reportar' })
  async reportar(interaction: any): Promise<void> {
    // Responder con un embed y cuatro botones con url
    const embed = {
      color: 0x0099ff,
      title: 'REPORTE DE BUGS',
      url: 'https://github.com/Autovot/SC_Spanish_SOK/issues',
      description: 'Para reportar bugs o incluso sugerir meras, por favor, acudir a github y abrir un ISSUE.\n\nQueremos recalcar que cualquier tontería, es mejor reportarla que no hacerlo, dado que nosotros también nos basamos en el feedback para traducir lo antes y mejor posible.\n\nA continuación se mostrarán una serie de botones que te llevarán a github'
    }
    const buttonIssue = {
      type: 2,
      style: 5,
      label: 'ISSUE',
      url: 'https://github.com/Autovot/SC_Spanish_SOK/issues'
    }
    const buttonRepo = {
      type: 2,
      style: 5,
      label: 'Proyecto en GITHUB',
      url: 'https://github.com/Autovot/SC_Spanish_SOK'
    }
    const buttonPull = {
      type: 2,
      style: 5,
      label: 'PULL REQUEST',
      url: 'https://github.com/Autovot/SC_Spanish_SOK/pulls'
    }
    const buttonRelease = {
      type: 2,
      style: 5,
      label: 'RELEASE',
      url: 'https://github.com/Autovot/SC_Spanish_SOK/releases'
    }

    const row = {
      type: 1,
      components: [
        buttonIssue,
        buttonRepo,
        buttonPull,
        buttonRelease
      ]
    }

    await interaction.reply({
      embeds: [embed],
      components: [row],
      ephemeral: false
    })
  }
}