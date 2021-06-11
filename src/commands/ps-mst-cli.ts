import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'psmst',
  run: async toolbox => {
    const { print } = toolbox

    print.info('Welcome to your pmst')
  },
}

module.exports = command
