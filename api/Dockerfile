FROM node:10-alpine
RUN mkdir -p /home/app/node_modules
RUN chown -R node:node /home/app
WORKDIR /home/app
COPY package.json yarn.lock ./
USER node
RUN yarn install --production=true --frozen-lockfile
