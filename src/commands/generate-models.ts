import { GluegunToolbox, filesystem } from 'gluegun'

import { InitOptions } from '../types'
import { checkParams } from '../utils/options'
import { generateModels } from '../utils/store'
import { getSchemas } from '../utils/schema'

module.exports = {
  name: 'generate-models',
  alias: ['gm'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      print,
      config,
      template: { generate },
    } = toolbox

    // Check parameters
    const options = (config ?? parameters.options) as InitOptions
    checkParams(options, print.error)

    filesystem.remove('./models')
    filesystem.copy('./src/defaultModels/common.ts', './models/common.ts', {
      overwrite: true,
    })

    try {
      const schemas = await getSchemas(options.parseServerUrl, options.parseAppId, options.parseMasterKey)
      await generateModels(schemas, generate, print.info)
    } catch (error) {
      print.error('Error : ')
      print.error(error)
      return
    }

    print.info(`Generated files at models`)
  },
}
