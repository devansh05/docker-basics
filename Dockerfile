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

# exposes port 3000 for auto-mapping and developer documentation
EXPOSE 3000

# 5. Running the project finally
CMD ["npm", "start"]


# building docker images
# docker build -t my-app .


# PORT MAPPING - docker run -it -p 8000:3000 my-app
# anything running on port 3000 in this app on port 3000 can be exposed through 
# port 8000 in my local machine


# '-itd' - 'd' is for running this container in detached mode, it frees up the terminal
# and gives an container id to interact with that container as in prod we have only 1 server

# -P is for auto mapping these exposed ports

# --rm is for removing this container when we stop or kill the image
# the container is automatically killed

# docker run -itd -P --rm my-app
# 050b2caca62881ffcf1a82139cb5d0ecc340607f70194820d65efb6ff0fbff39