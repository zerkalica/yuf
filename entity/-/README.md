# GD = Git Data

## Develop

* [Рабочее окружение](https://mol.hyoo.ru/#!section=docs/=yr3qrg_z2908a)
* [Экосистема](https://raw.githubusercontent.com/hyoo-ru/hyoo.ru/master/hyoo.svg)

### Install

``` sh
git clone git@gitlab.ocas.ai:d/mam.git
cd mam
.scripts/install.sh
```

### Dev server

```sh
npm start
open http://localhost:9080/gd/app/-/test.html
```

#### For avatar development

Before npm start, from gd: `npm run build gd/avatar`

In separate console:

`cd ./gd/avatar.legacy && npm run watch`

### Work

```sh
cd gd
git checkout dev-or-feature-brahch
# In cycle, prefer short commits, use vscode source control or sublime merge
git commit -m '<class name, ex. $gd_lk_form_page> [refactor|fix] <message>'
git pull --rebase # if shared work on feature branch
git pull origin master --rebase # pull from shared dev branch
git push
```

### Merge to upstream

In feature branch:

```sh
cd gd/<app>
git pull --rebase
# Increase version in `.env`
git add .env
git commit --amend
git push -f
```

#### Gitlab web interface merge to master

1. Check "Edit commit message"
2. Example for gd_lk. Edit first line `$gd_lk ver 0.1.XX`, where `0.1.XX` - version from `gd/lk/.env`
3. Press merge button

#### Manual merge to master (without gitlab mr)

```sh
git checkout master
git pull --ff-only
git merge feature-NN --no-ff
# commit message $gd_lk ver 0.1.XX
git push
```

Check `https://gitlab.ocas.ai/d/gd/-/pipelines`

Check `https://gd.ocas.ai/<app>/`, where `<app>` - directory names in `gd/*`

### Update mol from upstream

``` sh
cd mol
git pull upstream-ro master
git push origin master
cd ..
git add mol
.scripts/mam-update.sh mol_ver
```

## Update mol fork and commit to mol upstream

```sh
cd mol
git checkout -b some-branch
# change code
git push upstream some-branch
git push
cd ..
git add mol
.scripts/mam-update.sh mol_ver
# Check https://gitlab.ocas.ai/d/gd/-/pipelines
```

## build and start app example with browser-sync

``` sh
npm i -g browser-sync

npm start gd/app
cd gd/app/-
browser-sync start -s --https
```

## docker support

``` sh
cd gd/app
make build start
open http://localhost:3000
```

## example add new app to ci

``` sh
cd gd/.ci/app
cp app.ci.yml new.ci.yml
sed 's/app/new/g' new.ci.yml

# edit gd/.gitlab-ci.yml
#  copy .rules/changes_app_env -> ..changes_new_env
#  copy app-build  -> new-build
#  copy app-deploy -> new-deploy

# edit gd/gd-ci/src/dev.yml
#  copy
        app:
          <<: *mol
          store:
            route: /app/(.*)
            repo: *repo_mol
#  to
        new:
          <<: *mol
          store:
            route: /new/(.*)
            repo: *repo_mol
# commit and up submodule
```

## traefik proxy

* <https://doc.traefik.io/traefik/getting-started/configuration-overview/#configuration-file>
* <https://doc.traefik.io/traefik/reference/static-configuration/file/>

``` sh
brew install traefik
traefik
open http://ingress-controller.infra:9081
# open http://0.0.0.0:9081
```

## nginx config

``` sh
docker run nginx:1.25.2-alpine3.18
docker ps -a
docker cp 30a352ff4e6c:/etc/nginx/conf.d/default.conf .
```
