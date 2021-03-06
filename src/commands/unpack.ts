import {Command, flags} from '@oclif/command'
import {Answers, prompt} from 'inquirer'

import {downloadPack} from '../utils/index'

export default class Unpack extends Command {
    static description = 'Start a new project with a pre-built dApp'

    static examples = [
        '$ titan unpack',
        '$ titan unpack <name>',
    ]

    static flags = {
        help: flags.help({char: 'h'}),
    }

    static args = [{name: 'pack'}]

    async run() {
        const {args} = this.parse(Unpack)

        if (args.pack) {
            await downloadPack(args.pack, `titan-${args.pack}`)
        } else {
            let promptQuestions = [{
                type: 'list',
                name: 'selected_pack',
                message: 'Choose a pack to download',
                choices: ['react', 'react-native', 'default'],
            }]

            const answer: Answers = await prompt(promptQuestions)
            await downloadPack(answer.selected_pack, `titan-${answer.selected_pack}`)
        }

    }
}
