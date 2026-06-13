# 1. setting up the base image for our docker file with a lighweight tag version
FROM node:24.16-bookworm-slim

# 3. Setting up project files
# a. setting up project directory
WORKDIR /home/app/docker-basics
# b. copying project files
COPY package.json package.json
# 4. Installing project dependencies
RUN npm install
# copying source code after npm install so it wont run over and over again if code changes
COPY index.js index.js

# 5. Running the project finally
CMD ["npm", "start"]