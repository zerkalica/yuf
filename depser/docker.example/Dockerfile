ARG CI_IMAGE_BASE="<CI_IMAGE_URL>"

FROM node:24.11 AS builder
COPY [ ".", "/tmp/mam/" ]
WORKDIR /tmp/mam
RUN ".ci/yuf/depser/depser" "build"

#RUN /bin/sh -l -c "ls -l ./app/-/; sleep 3"

FROM ${CI_IMAGE_BASE}/nginx:1.24 AS server
LABEL org.opencontainers.image.authors="Acme"
ENV DEBIAN_FRONTEND=noninteractive

COPY --from=builder /tmp/mam/app/-/ /var/www/static

COPY ["./.ci/yuf/depser/docker/default.conf.template", \
      "/etc/nginx/"]

RUN rm -f /etc/nginx/sites-enabled/* \
        /etc/nginx/sites-available/* \
        /etc/nginx/conf.d/* \
    && sed -i 's/www-data/root/g' /etc/nginx/nginx.conf \
    && sed -i "s/0.0.0-0/$VERSION/g" /etc/nginx/default.conf.template

COPY ["./.ci/yuf/depser/docker/docker-entrypoint.sh", \
      "/usr/local/bin/"]

RUN ln -s /usr/local/bin/docker-entrypoint.sh \
          /docker-entrypoint.d/docker-entrypoint.sh

COPY ["./.ci/yuf/depser/docker/start.sh", \
      "/start.sh"]

ENTRYPOINT ["docker-entrypoint.sh"]

CMD ["sh", "/start.sh"]
