#!/bin/sh

cdir="$(dirname $0)"

cloc --read-lang-def="${cdir}/tree.cloc.txt" \
    --exclude-ext=js,mjs,yml,yaml,html,md,docker,json,sh,svg \
    --exclude-dir=-,-css,-view.tree,.npm,node_modules,.build,.ci,.git,.scripts \
    $1 $2 $3 $4

