import { ParseError, Schema } from '../types'

import { http } from 'gluegun'

export async function getSchemas(serverUrl, appId, masterKey): Promise<Schema[]> {
  const httpClient = http.create({
    baseURL: serverUrl,
    headers: {
      'X-Parse-Application-Id': appId,
      'X-Parse-Master-Key': masterKey,
    },
  })
  const response = await httpClient.get<Schema[], ParseError>('/schemas')
  if (response.problem) {
    throw response.data as ParseError
  }
  return response.data as Schema[]
}
