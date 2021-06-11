import { InitOptions } from '../types'

export function checkParams(options: InitOptions, error: (err: string) => void): void {
  const missingOptions: string[] = []
  if (!options.parseServerUrl) {
    missingOptions.push('parseServerUrl')
  }
  if (!options.parseAppId) {
    missingOptions.push('parseAppId')
  }
  if (!options.parseMasterKey) {
    missingOptions.push('parseMasterKey')
  }
  if (missingOptions.length > 0) {
    error('The following parameters are missing')
    missingOptions.forEach(option => {
      error('• ' + option)
    })
    return
  }
}
