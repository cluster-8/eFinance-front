# FROM node:lts-alpine

# # install simple http server for serving static content
# RUN npm install -g http-server

# # make the 'app' folder the current working directory
# WORKDIR /app

# # copy both 'package.json' and 'package-lock.json' (if available)
# COPY package*.json ./

# # install project dependencies
# RUN npm install

# # copy project files and folders to the current working directory (i.e. 'app' folder)
# COPY . .

# # build app for production with minification
# RUN npm run build

# # Copy the CORS configuration file to the container
# COPY cors-config.json .

# # Expose port 8080
# EXPOSE 8080

# # Start the server with CORS configuration
# CMD [ "http-server", "dist", "-c", "cors-config.json" ]



# estágio de compilação
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# estágio de produção
FROM nginx:stable-alpine as production-stage
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]