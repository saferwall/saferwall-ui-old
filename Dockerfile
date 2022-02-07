################################
# STEP 1 build executable binary
################################

FROM node:14-alpine as build-stage

# Install git + SSL ca certificates.
# Git is required for fetching the dependencies.
# Ca-certificates is required to call HTTPS endpoints.
RUN apk update \
    && apk add --no-cache git ca-certificates tzdata \
    && update-ca-certificates 2>/dev/null || true

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json yarn*.lock ./

# install project dependencies
RUN yarn install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# build the app
RUN yarn build

############################
# STEP 2 build a small image
############################

FROM nginx:stable-alpine
LABEL maintainer="https://github.com/saferwall"
LABEL version="1.0.0"
LABEL description="Saferwall UI Dashboard"

# copy the artifacts from the build stage.
COPY --from=build-stage /app/dist /usr/share/nginx/html

# copy out nginx conf.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# the entrypoint script will replace environment variables in JS files and
# will kick in nginx
COPY entrypoint.sh /
RUN chmod +x entrypoint.sh
CMD ["/entrypoint.sh"]