import { GluegunTemplateGenerateOptions } from 'gluegun/build/types/toolbox/template-types'

export async function generateServices(
  generate: (options: GluegunTemplateGenerateOptions) => void,
  info: (msg: string) => void
): Promise<void> {
  await generate({
    template: 'service-api-client.ts.ejs',
    target: `services/api-client.ts`,
  })

  await generate({
    template: 'service-parse-object.ts.ejs',
    target: `services/parse-object.ts`,
  })

  await generate({
    template: 'service-user.ts.ejs',
    target: `services/user.ts`,
  })

  info(`services files generated !`)
}
