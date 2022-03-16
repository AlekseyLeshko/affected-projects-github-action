import * as core from '@actions/core'

export const getDefaultWorkspaces = () => {
  const inputName = 'default_workspaces'
  const defaultProjectsFromInput = core.getInput(inputName) || ''
  if (!defaultProjectsFromInput.length) {
    return []
  }

  const result = JSON.parse(defaultProjectsFromInput)
  if (!Array.isArray(result)) {
    throw Error(`${inputName} input should be an array`)
  }

  return result
}
