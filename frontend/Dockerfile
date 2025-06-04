FROM node:latest

COPY . /frontend
WORKDIR /frontend

RUN rm -rf node_modules package-lock.json && npm install
RUN npm install

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]