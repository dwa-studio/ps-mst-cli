export type InitOptions = {
  parseServerUrl?: string
  parseAppId?: string
  parseMasterKey?: string
}

export type SchemaField = {
  type: string
  targetClass?: string
  required?: boolean
  defaultValue?: any
}

export type SchemaFields = Record<string, SchemaField>

export type Schema = {
  className: string
  fields: SchemaFields
}

export type SchemaResponse = {
  results: Schema[]
}

export type MstField = {
  name: string
  type: string
  referenceModel?: string
}
