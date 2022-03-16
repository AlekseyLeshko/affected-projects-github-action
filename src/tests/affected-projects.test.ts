import * as core from '@actions/core'
import * as affectedWorkspacesModule from 'affected-workspaces'

import run from '../main'

jest.mock('@actions/core')
jest.mock('affected-workspaces')

type TestRecord = {
  inputs: Record<string, string>
  affectedWorkspacesApiContract: {
    input: any[]
    output: any[]
  }
}
describe('github actions:affected workspaces', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it.each([
    [
      'not throw an error when inputes are empty',
      {
        inputs: {
          workspaces: undefined as unknown as string,
          defaultWorkspaces: undefined as unknown as string,
          filterPattern: undefined as unknown as string
        },
        affectedWorkspacesApiContract: {
          input: [[], [], undefined],
          output: [] as any[]
        }
      }
    ],
    [
      'set workspaces to the affectedWorkspaces module',
      {
        inputs: {
          workspaces: '["library/*", "app/*"]'
        },
        affectedWorkspacesApiContract: {
          input: [['library/*', 'app/*'], [], undefined],
          output: []
        }
      }
    ],
    [
      'set default workspaces to the affectedWorkspaces module',
      {
        inputs: {
          workspaces: '["library/*", "app/*"]',
          defaultWorkspaces: '["app/"]'
        },
        affectedWorkspacesApiContract: {
          input: [['library/*', 'app/*'], ['app/'], undefined],
          output: []
        }
      }
    ],
    [
      'convert the affectedWorkspaces module output from obj to string ',
      {
        inputs: {
          workspaces: '["library/*", "app/*"]'
        },
        affectedWorkspacesApiContract: {
          input: [['library/*', 'app/*'], [], undefined],
          output: [
            {name: '@org/app-x', projects: ['@org/app-x']},
            {
              name: 'Project pack: 0',
              projects: [
                '@org/library-a',
                '@org/library-b',
                '@org/library-c',
                '@org/library-z'
              ]
            }
          ]
        }
      }
    ]
  ])(
    'should %s',
    async (_, {inputs, affectedWorkspacesApiContract}: TestRecord) => {
      const getAffectedWorkspacesSpy = jest
        .spyOn(affectedWorkspacesModule, 'getAffectedWorkspaces')
        .mockReturnValueOnce(affectedWorkspacesApiContract.output)
      jest.spyOn(core, 'getInput').mockImplementation((inputName: string) => {
        if (inputName === 'workspaces') return inputs.workspaces
        if (inputName === 'default_workspaces') return inputs.defaultWorkspaces
        if (inputName === 'filter_pattern') return inputs.filterPattern

        return undefined as unknown as string
      })

      // Act
      await expect(run()).resolves.not.toThrow()

      // Asserts
      expect(core.getInput).toHaveBeenCalledTimes(3)

      expect(getAffectedWorkspacesSpy).toHaveBeenCalledTimes(1)
      expect(getAffectedWorkspacesSpy.mock.calls[0]).toEqual(
        affectedWorkspacesApiContract.input
      )

      const {setFailed, setOutput} = core as jest.Mocked<typeof core>

      expect(setFailed).toHaveBeenCalledTimes(0)

      expect(setOutput).toHaveBeenCalledTimes(1)
      expect(setOutput.mock.calls[0][0]).toBe('affected_workspaces')
      expect(setOutput.mock.calls[0][1]).toEqual(
        JSON.stringify(affectedWorkspacesApiContract.output)
      )
    }
  )

  it.each([
    [
      'throw an error when the default workspaces is not array',
      {
        inputs: {
          defaultWorkspaces: '{"app": "app/"}'
        }
      }
    ]
  ])(
    'should %s',
    async (_, {inputs}: Omit<TestRecord, 'affectedWorkspacesApiContract'>) => {
      const getAffectedWorkspacesSpy = jest.spyOn(
        affectedWorkspacesModule,
        'getAffectedWorkspaces'
      )
      jest
        .spyOn(core, 'getInput')
        .mockReturnValueOnce(inputs.workspaces)
        .mockReturnValueOnce(inputs.defaultWorkspaces)
        .mockReturnValueOnce(inputs.filterPattern)

      // Act
      await expect(run()).resolves.not.toThrow()

      // Asserts
      expect(core.getInput).toHaveBeenCalledTimes(2)

      expect(getAffectedWorkspacesSpy).toHaveBeenCalledTimes(0)

      const {setFailed, setOutput} = core as jest.Mocked<typeof core>

      expect(setFailed).toHaveBeenCalledTimes(1)
      expect(setFailed.mock.calls[0]).toEqual([
        'default_workspaces input should be an array'
      ])

      expect(setOutput).toHaveBeenCalledTimes(0)
    }
  )
})
