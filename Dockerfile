# 1. setting up the base image for our docker file
FROM ubuntu:latest

# 2. installing prerequisites on this docker image

# a. Installing curl
# prevents docker from using outdated cached package list
RUN apt-get update
# installs curl on image 
RUN apt-get install -y curl
# cleans up cache to reduce image size
RUN rm -rf /var/lib/apt/lists/*

# b. installing node js

# downloading nodejs setup
RUN curl -sL https://deb.nodesource.com/setup_22.x -o /tmp/nodesource_setup.sh
RUN bash /tmp/nodesource_setup.sh
# installing node js
RUN apt install -y nodejs

# 3. Setting up project files

# a. setting up project directory
WORKDIR /home/app

# b. copying project files
COPY index.js index.js
COPY package.json package.json
COPY package-lock.json package-lock.json

# 4. Installing project dependencies
RUN npm install

# 5. Running the project finally
# RUN node index.js

# run this command in terminal
# docker build -t my-custom-image .