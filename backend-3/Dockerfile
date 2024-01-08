FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
COPY config/ ./dist/config/


FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/dist ./
COPY package*.json ./
RUN npm install --production
COPY ./prisma/schema.prisma ./prisma/
RUN npx prisma generate
CMD ["node", "index.js"]
