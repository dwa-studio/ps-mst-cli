import { GluegunToolbox } from 'gluegun'
import { InitOptions } from '../types'
import { checkParams } from '../utils/options'
import { getSchemas } from '../utils/schema'

module.exports = {
  name: 'generate-models',
  alias: ['gm'],
  run: async (toolbox: GluegunToolbox) => {
    const { parameters, print, config } = toolbox

    // Check parameters
    const options = (config ?? parameters.options) as InitOptions
    checkParams(options, print.error)
    try {
      await getSchemas(options.parseServerUrl, options.parseAppId, options.parseMasterKey)
    } catch (error) {
      print.error('Error : ')
      print.error(error)
      return
    }

    print.info(`Generated files at models`)
  },
}
