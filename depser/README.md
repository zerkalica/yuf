# Dependencies fixer for mam

Add submodules, manually update versions, reproduce source tree in builds.

## Init

See [depser-demo](https://github.com/zerkalica/depser-demo)

`acme/depser` - example project

For new project need to create and setup git as regular project.

* `mkdir -p acme/depser && cd acme/depser`
* Setup git repo, add .gitignore, etc

Convert existing project:

* `mkdir -p .ci && git submodule add --depth 100 https://github.com/zerkalica/yuf.git .ci/yuf`
* `.ci/yuf/depser/depser init`
* `mkdir -p app && echo '$acme_depser_app $mol_page' > app/app.view.tree`
* `git add .ci app && git commit -m 'updated deps`

## Add extra deps

From acme/depser directory:

* `.ci/yuf/depser/depser add "https://github.com/hyoo-ru/mam_hyoo.git" "hyoo"`
* `.ci/yuf/depser/depser add "https://github.com/hyoo-ru/about.hyoo.ru.git" "hyoo-about"`
* `git add .ci && git commit -m 'updated deps`

hyoo-about will be linked to hyoo/about in depser build.

## Build

From zero:

* `git clone https://github.com/zerkalica/depser-demo`
* `cd depser-demo`
* `git submodule update --init --depth=100`
* `.ci/yuf/depser/depser build`

Build in `./app/-`


## Update and fix deps

From acme/depser directory:

* `.ci/yuf/depser/depser update`
* `git add .ci && git commit -m "updated deps"`

