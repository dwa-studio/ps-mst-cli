import { GluegunToolbox, filesystem, strings } from 'gluegun'
import { generateCommons, generateModels, generateStores } from '../utils/store'

import { InitOptions } from '../types'
import { checkParams } from '../utils/options'
import { generateServices } from '../utils/services'
import { getSchemas } from '../utils/schema'

module.exports = {
  name: 'bootstrap-app',
  alias: ['b'],
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

    try {
      const schemas = await getSchemas(options.parseServerUrl, options.parseAppId, options.parseMasterKey)
      await generateModels(schemas, generate, print.info)
      await generateStores(schemas, generate, print.info, strings)
      await generateCommons(generate, print.info)
      await generateServices(generate, print.info)
    } catch (error) {
      print.error('Error : ')
      print.error(error)
      return
    }

    print.success(`App bootstraped enjoy 🥳`)
  },
}