import * as core from '@actions/core'
import {getAffectedWorkspaces} from 'affected-workspaces'

import {getDefaultWorkspaces} from './get-data-from-input'

async function run(): Promise<void> {
  try {
    const workspaces = JSON.parse(core.getInput('workspaces') || '[]')
    const defaultWorkspaces = getDefaultWorkspaces()
    const filterPattern = core.getInput('filter_pattern')
    core.debug(JSON.stringify({workspaces, defaultWorkspaces, filterPattern}))

    const affectedWorkspaces = getAffectedWorkspaces(
      workspaces,
      defaultWorkspaces,
      filterPattern
    )

    core.setOutput('affected_workspaces', JSON.stringify(affectedWorkspaces))
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

export default run

// Don't auto-execute in the test environment
// istanbul ignore next
if (process.env['NODE_ENV'] !== 'test') {
  run()
}
