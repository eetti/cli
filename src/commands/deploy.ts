import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'
import * as fs from 'fs'
import {Answers, prompt} from 'inquirer'
import * as mkdirp from 'mkdirp'
import * as notifier from 'node-notifier'
import * as path from 'path'

import {compile, deploy, readContract, readUtf8} from '../utils/index'

export default class Deploy extends Command {
    static description = 'Deploys a Solidity smart contract to an AION node'

    static examples = [
        '$ titan deploy <path/to/Example.sol>',
        '$ titan deploy -n SpecificContract <path/to/ManyContracts.sol>',
        '$ titan deploy -p 5 <path/to/ContractWithParams.sol>',
    ]

    static flags = {
        help: flags.help({char: 'h'}),
        name: flags.string({char: 'n', description: 'specify which smart contract to deploy within the file'}),
        params: flags.string({char: 'p', description: 'pass parameters to the smart contract'}),
    }

    static args = [{name: 'file'}]

    questions: Array<any> = [{
        type: 'list',
        name: 'selected_contract',
        message: 'Choose a contract to deploy',
        choices: [],
    }]

    generateChoices(arr: string[]) {
        for (let i of arr) {
            this.questions[0].choices.push(i)
        }
    }

    async handleDeploy(_name: string, _compiledContract: any, _params?: any) {
        cli.action.start('deploying')
        const _abi = _compiledContract[`${_name}`].info.abiDefinition
        const _code = _compiledContract[`${_name}`].code

        const deployedContract: any = _params ?
            await deploy(_abi, _code, _params) :
            await deploy(_abi, _code)
        const timeStamp: Date = new Date()
        const deployedAt: number = timeStamp.getTime()

        this.log('Successfully deployed!')
        this.log('Deployment Details:')
        this.log('contract:', _name)
        this.log('address:', deployedContract.contractAddress)
        this.log('transaction hash:', deployedContract.transactionHash)
        this.log('NRG used:', deployedContract.nrgUsed)
        this.log('block number:', deployedContract.blockNumber)
        this.log('from:', deployedContract.from)
        this.log('to:', deployedContract.to)
        this.log('logs:', deployedContract.logs)

        const boltsPath = path.join(process.cwd(), 'build', 'bolts', `${_name}.json`)

        const exists = fs.existsSync(boltsPath)
        let migrations: any[] = []
        const newMigration = {
            [deployedAt]: {
                address: deployedContract.contractAddress,
                transaction_hash: deployedContract.transactionHash,
                block_number: deployedContract.blockNumber
            }
        }

        if (exists) {
            const _bolt: any = readUtf8(boltsPath)
            migrations = JSON.parse(_bolt).migrations
            migrations.push(newMigration)

        } else {
            migrations.push(newMigration)
        }

        mkdirp('build/bolts', err => {
            if (err) { throw err } else {
                const bolt = {
                    contract: _name,
                    abi: _abi,
                    migrations,
                    updated: timeStamp.toString()
                }

                fs.writeFile(boltsPath, JSON.stringify(bolt, null, 4), err => {
                    if (err) throw err
                })
            }
        })

        cli.action.stop()

        notifier.notify({
            title: 'Titan',
            message: `🚀 Successfully deployed: ${_name}!`
        })
    }

    async run() {
        const {args, flags} = this.parse(Deploy)

        const sol = readContract(args.file)
        const compiledContract: any = await compile(sol)

        let contractName

        if (flags.name) {
            contractName = flags.name
            await this.handleDeploy(contractName, compiledContract, flags.params)
        } else if (Object.keys(compiledContract).length === 1) {
            contractName = Object.keys(compiledContract)[0]
            await this.handleDeploy(contractName, compiledContract, flags.params)
        } else {
            this.generateChoices(Object.keys(compiledContract))

            const answer: Answers = await prompt(this.questions)
            contractName = answer.selected_contract
            await this.handleDeploy(contractName, compiledContract, flags.params)
        }
    }
}
