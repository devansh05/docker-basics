# 1. setting up the base image for our docker file with a lighweight tag version
# FIRST STAGE - base
FROM node:24.16-bookworm-slim as base

# SECOND STAGE - builder
FROM base as builder
# 3. Setting up project files
# a. setting up project directory
WORKDIR /home/app/docker-basics/build

# b. copying project files
COPY package*.json .
COPY tsconfig.json .
# 4. Installing project dependencies
RUN npm install

# copying source code after npm install so it wont run over and over again if code changes
COPY index.ts index.ts
COPY src/ src/

RUN npm run build

# THIRD STAGE - runner
FROM base as runner

WORKDIR /home/app/docker-basics/app

COPY --from=builder /home/app/docker-basics/build/dist /home/app/docker-basics/app/dist
COPY --from=builder /home/app/docker-basics/build/package.json /home/app/docker-basics/app/package.json
COPY --from=builder /home/app/docker-basics/build/package-lock.json /home/app/docker-basics/app/package-lock.json

RUN npm install --omit=dev

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