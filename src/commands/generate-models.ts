import { GluegunToolbox } from 'gluegun'
import { InitOptions } from '../types'
import { checkParams } from '../utils/options'

module.exports = {
  name: 'generate-models',
  alias: ['gm'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      print: { info, error },
      config,
    } = toolbox

    // Check parameters
    const options = (config ?? parameters.options) as InitOptions
    checkParams(options, error)
    info(`Generated files at models`)
  },
}
