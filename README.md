<p align="center">
  <a href="https://github.com/actions/typescript-action/actions"><img alt="typescript-action status" src="https://github.com/actions/typescript-action/workflows/build-test/badge.svg"></a>
</p>

# Github action to get affected workspaces in a monorepo by git
This action is a wrapper of [affected-workspaces npm module](https://github.com/AlekseyLeshko/affected-workspaces).
If you are new, there's also a simpler introduction.  See the [Hello World JavaScript Action](https://github.com/actions/hello-world-javascript-action)

## Usage
You should use directories that are part of the workspaces in package.json.
The workspaces input is an array of directories.
```bash
  - name: Get affected workspaces in monorepo
    uses: alekseyleshko/affected-workspaces-github-action@main
    id: affected-workspaces
    with:
      workspaces: '["packages/*"]'
```

You can use many patterns
```bash
  - name: Get affected workspaces in monorepo
    uses: alekseyleshko/affected-workspaces-github-action@main
    id: affected-workspaces
    with:
      workspaces: '["app/*", "library/*"]'
```

If you want to get affected workspaces when no one project is touched then you should use the `default_workspaces` input. In this case, you will get all projects from these workspaces.
```bash
  - name: Get affected projects in monorepo
    uses: alekseyleshko/affected-projects-github-action@feature/test
    id: affected-workspaces
    with:
      workspaces: '["app/*", "library/*"]'
      default_workspaces: '["app", "library"]'
```

If you want to filter output workspaces then you might use the `filter_pattern`.
```bash
  - name: Get affected projects in monorepo
    uses: alekseyleshko/affected-projects-github-action@feature/test
    id: affected-library-workspaces
    with:
      workspaces: '["app/*", "library/*"]'
      default_workspaces: '["app", "library"]'
      filter_pattern: 'library/*'
```
