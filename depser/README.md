# Versioning submodule deps system for mam

Run it from some/project directory, not a mam root, project directory must inside mam root
Project must include `app/app.view.tree` entry point module
Use `depser <command>`, where `command`:

```
init - init base git submodules in .ci
add <url> <dir name> - add submodule from git url to .ci/<dir name>
build - build, using only submodules in .ci as deps
pkg - updates package.json in mam root and copies into .ci/package-lock.json
sm [mask] - updates git submodules in .ci, where optional mask used to filter uptable projects
update - updates all submodules and package.json
```
