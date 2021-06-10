import { getImports, getMSTFields } from './schema'

import { GluegunTemplateGenerateOptions } from 'gluegun/build/types/toolbox/template-types'
import { Schema } from '../types'

export async function generateModels(
  schemas: Schema[],
  generate: (options: GluegunTemplateGenerateOptions) => void,
  info: (msg: string) => void
): Promise<void> {
  schemas.map(async schema => {
    const fields = getMSTFields(schema.fields)
    const imports = getImports(fields)
    await generate({
      template: 'model.ts.ejs',
      target: `models/${schema.className}/${schema.className}.ts`,
      props: { name: schema.className, fields, imports },
    })
    info(`${schema.className} model generated !`)
  })
}
