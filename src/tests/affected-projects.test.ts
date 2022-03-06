import * as core from '@actions/core'
import run from '../main'

jest.mock('@actions/core')

describe('affected project', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should return empty array', async () => {
    jest
      .spyOn(core, 'getInput')
      .mockImplementationOnce(() => '["library", "app"]')

    // Act
    await expect(run()).resolves.not.toThrow()

    // Asserts
    const {setFailed, setOutput} = core as jest.Mocked<typeof core>
    expect(setFailed).toHaveBeenCalledTimes(0)
    expect(setOutput).toHaveBeenCalledTimes(1)
    expect(setOutput.mock.calls[0][0]).toBe('affected_project')
    expect(setOutput.mock.calls[0][1]).toMatchObject([])
  })
})
