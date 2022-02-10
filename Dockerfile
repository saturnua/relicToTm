FROM node:14-alpine3.12
EXPOSE 3000

RUN mkdir -p /home/app
WORKDIR /home/app

COPY package.json /home/app/
COPY package-lock.json /home/app/

RUN npm ci

COPY . ./home/app

#RUN npm run build

RUN ["chmod", "+x", "./home/app/scripts/start.sh"]

CMD npm run dev