FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build


FROM node:18-alpine AS runtime

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/next.config.js ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY .env.production ./.env.production

RUN chown node:node -R ./
USER node


EXPOSE 4200
CMD ["npm", "start"]