#!/bin/bash


echo "Token based auth enabled."

if [ ! -f /etc/nginx/certs/nginx.crt ] || [ ! -f /etc/nginx/certs/nginx.key ]
then
    echo "Generating certificates..."
    rm -rf /etc/nginx/certs
    mkdir -p /etc/nginx/certs
    openssl req \
        -x509 \
        -nodes \
        -newkey rsa:4096 \
        -subj "/CN=$(hostname -i)" \
        -keyout /etc/nginx/certs/nginx.key \
        -out /etc/nginx/certs/nginx.crt \
        -days 65535
    echo "Done."
fi

if [ ! -f /etc/nginx/conf.d/default.conf ]
then
    echo "Initializing configuration..."
    envsubst '${SLAVE_SUFFIX}' < /etc/nginx/default.conf.template > \
        /etc/nginx/conf.d/default.conf
    echo "Done."
fi

exec "$@"
