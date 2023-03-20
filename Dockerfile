FROM node:alpine

ENV ENVIRONMENT=development \
    PORT=3000 \
    REDIS_HOST=redis \
    REDIS_PORT=6379 \
    REDIS_PASSWORD=123 \
    REDIS_USER=antonio \
    SECRET_EMAIL=bis.teste.tecnico@gmail.com \
    SECRET_PASSWORD=fnbexhappstnrkce \
    PRIVATE_KEY=private-antonio-key \
    REFRESH_PRIVATE_KEY=refresh-antonio-key \
    CHANGE_PASSWORD_KEY=bis-change-password-secret\
    MONGO_HOST=db

WORKDIR /app

COPY package.json ./

RUN yarn

COPY dist ./

EXPOSE $PORT

CMD ["yarn", "start"]