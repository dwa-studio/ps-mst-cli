import { MST_TYPES, PARSE_TYPES } from '../enums'
import { MstField, ParseError, Schema, SchemaField, SchemaFields, SchemaResponse } from '../types'

import { http } from 'gluegun'

/**
 * Get the parse schemas
 * @param serverUrl par server url
 * @param appId application id
 * @param masterKey master key
 * @returns parse schemas
 */
export async function getSchemas(serverUrl, appId, masterKey): Promise<Schema[]> {
  const httpClient = http.create({
    baseURL: serverUrl,
    headers: {
      'X-Parse-Application-Id': appId,
      'X-Parse-Master-Key': masterKey,
    },
  })
  const response = await httpClient.get<SchemaResponse, ParseError>('/schemas')
  if (response.problem) {
    throw response.data as ParseError
  }
  return (response.data as SchemaResponse).results
}

/**
 * Return the mobx state tree corresponding to parse schema field
 * @param field schema field type
 * @returns mobx state tree field type
 */
export function getMSTTypeFromSchemaField(field: SchemaField): string {
  switch (field.type) {
    case PARSE_TYPES.STRING:
      return MST_TYPES.STRING
    case PARSE_TYPES.DATE:
      return MST_TYPES.DATE
    case PARSE_TYPES.OBJECT:
      return MST_TYPES.OBJECT
    case PARSE_TYPES.FILE:
      return MST_TYPES.FILE
    case PARSE_TYPES.BOOLEAN:
      return MST_TYPES.BOOLEAN
    case PARSE_TYPES.POINTER:
      return MST_TYPES.POINTER.replace('__MODEL__', `${field.targetClass}Model`)
    case PARSE_TYPES.RELATION:
      return MST_TYPES.RELATION.replace('__MODEL__', `${field.targetClass}Model`)
    case PARSE_TYPES.NUMBER:
      return MST_TYPES.NUMBER
    case PARSE_TYPES.GEOPOINT:
      return MST_TYPES.GEOPOINT
    case PARSE_TYPES.BYTES:
      return MST_TYPES.BYTES
    case PARSE_TYPES.POLYGON:
      return MST_TYPES.POLYGON
    case PARSE_TYPES.ARRAY:
      return MST_TYPES.ARRAY
  }
}

/**
 * Define if field type is present in all fields
 * @param fieldType type of field to search
 * @param fieldArray array of fields
 * @returns true or false
 */
export const hasFieldOfType = (fieldType: string, fieldArray: MstField[]) =>
  fieldArray.findIndex(({ type }) => type === fieldType) !== -1

/**
 * Return all the needed imports raw base on fields (ie: polygon, File ...)
 * @param fields all fields
 * @returns import rows
 */
export const getImports = (fields: MstField[]): string[] => {
  const imports = []
  const relationOrPointerField: MstField[] = []
  const basicFields: MstField[] = []

  fields.forEach(field => {
    if (field.referenceModel) {
      relationOrPointerField.push(field)
    } else {
      basicFields.push(field)
    }
  })

  if (hasFieldOfType(MST_TYPES.POLYGON, basicFields)) {
    imports.push("import { Polygon } from '../common'")
  }
  if (hasFieldOfType(MST_TYPES.GEOPOINT, basicFields)) {
    imports.push("import { GeoPoint } from '../common'")
  }
  if (hasFieldOfType(MST_TYPES.FILE, basicFields)) {
    imports.push("import { FileModel } from '../common'")
  }

  relationOrPointerField.forEach(field => {
    const importString = `import { ${field.referenceModel}Model } from '../${field.referenceModel}/${field.referenceModel}'`
    if (imports.indexOf(importString) === -1) {
      imports.push(importString)
    }
  })

  return imports
}

/**
 * Return all fields of the mobx state tree model from the schema fields
 * @param schemaFields fields the schema
 * @returns mobx state tree model fields
 */
export function getMSTFields(schemaFields: SchemaFields): MstField[] {
  return Object.keys(schemaFields)
    .filter(key => key !== 'ACL')
    .map((key: string) => ({
      name: key,
      type: getMSTTypeFromSchemaField(schemaFields[key]),
      referenceModel: schemaFields[key].targetClass,
    }))
}
