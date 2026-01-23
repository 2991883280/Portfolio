FROM registry.cn-hangzhou.aliyuncs.com/box_base/node:22.17.1-bookworm AS builder

USER root

ENV NODE_OPTIONS="--max-old-space-size=8192"

WORKDIR /usr/src/app

COPY package*.json ./

COPY .npmrc ./

RUN npm ci

COPY . ./

RUN npm run build

RUN groupadd -g 1001 box && useradd -r -u 1001 -g box -m -d /usr/src/app -s /bin/bash -c "box user" box

RUN chown -R box:box /usr/src/app

EXPOSE 9966

USER box

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "9966"]
