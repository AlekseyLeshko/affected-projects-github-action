import * as core from '@actions/core'

async function run(): Promise<void> {
  try {
    const workspaces: string = core.getInput('workspaces')
    const defaultProjects: string = core.getInput('default_projects')
    const filterPattern: string = core.getInput('filter_pattern')

    // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true
    core.debug(new Date().toTimeString())
    core.debug(JSON.stringify({workspaces, defaultProjects, filterPattern}))
    const affectedWorkspacesOutput: string[] = []
    core.debug(new Date().toTimeString())

    core.setOutput('affected_workspaces', affectedWorkspacesOutput)
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
