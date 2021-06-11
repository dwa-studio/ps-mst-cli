import { getImports, getMSTFields } from './schema'

import { GluegunTemplateGenerateOptions } from 'gluegun/build/types/toolbox/template-types'
import { Schema } from '../types'
import { strings } from 'gluegun'

export async function generateModels(
  schemas: Schema[],
  generate: (options: GluegunTemplateGenerateOptions) => void,
  info: (msg: string) => void
): Promise<void> {
  schemas.forEach(async schema => {
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

export async function generateStores(
  schemas: Schema[],
  generate: (options: GluegunTemplateGenerateOptions) => void,
  info: (msg: string) => void
): Promise<void> {
  const stores = []
  schemas.forEach(async schema => {
    const store = {
      name: schema.className,
      camelCasedName: strings.camelCase(schema.className),
    }
    stores.push(store)
    await generate({
      template: 'store.ts.ejs',
      target: `models/${schema.className}Store/${schema.className}Store.ts`,
      props: store,
    })
    info(`${schema.className}Store store generated !`)
  })

  await generate({
    template: 'root-store.ts.ejs',
    target: `models/RootStore/RootStore.ts`,
    props: { stores },
  })
  info(`RootStore store generated !`)
}

export async function generateCommons(
  generate: (options: GluegunTemplateGenerateOptions) => void,
  info: (msg: string) => void
): Promise<void> {
  await generate({
    template: 'common.ts.ejs',
    target: `models/common.ts`,
  })
  info(`common files store generated !`)
}
