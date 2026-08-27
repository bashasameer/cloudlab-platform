# 02 - Containerizing CloudLab with Docker

## Goal

Phase 1 ran CloudLab directly on the developer laptop:

```text
Windows -> Node.js -> Express -> CloudLab API
```

Phase 2 packages the runtime, dependencies, and application into a reproducible container image:

```text
Windows -> Docker -> Container -> Node.js -> Express -> CloudLab API
```

## Image versus container

A Docker image is an immutable application package/blueprint. A container is a running instance of that image.

```text
Dockerfile -> docker build -> Image -> docker run -> Container
```

The same image can create many containers. Kubernetes will later use this same concept when it starts application containers inside Pods.

## Build

Run from `application/`:

```bash
docker build -t cloudlab-api:v1 .
```

The final `.` is the build context. Docker sends files from the current application directory to the builder, excluding entries in `.dockerignore`.

## Run

```bash
docker run --name cloudlab-api -p 3000:3000 cloudlab-api:v1
```

Port mapping means:

```text
Laptop port 3000 -> Container port 3000
```

Test from another terminal:

```bash
curl http://localhost:3000/health
curl http://localhost:3000/api/v1/labs
```

## Inspect

```bash
docker ps
docker images
docker logs cloudlab-api
docker exec -it cloudlab-api sh
```

These commands answer four different questions: what is running, what images exist locally, what the application logged, and what exists inside the running container.

## Stop and remove

```bash
docker stop cloudlab-api
docker rm cloudlab-api
```

Removing the container does not remove the image. A new container can be created from the same image.

## Dockerfile execution

```text
FROM node:24-alpine       -> start from a Node.js Linux image
WORKDIR /app              -> use /app inside the image
COPY package*.json ./     -> copy dependency manifests
RUN npm install           -> install production dependencies into image
COPY src ./src            -> copy CloudLab source code
ENV ...                   -> set runtime defaults
EXPOSE 3000               -> document application port
USER node                 -> avoid running application as root
CMD ["npm", "start"]      -> command executed when container starts
```

## Why copy package files first?

Docker builds images in cached layers. Dependencies change less frequently than application source. Keeping dependency installation before `COPY src` allows Docker to reuse the dependency layer when only source code changes.

## Relationship to EKS

Today:

```text
docker run -> CloudLab container
```

Later:

```text
Kubernetes Deployment -> Pod -> CloudLab container
```

EKS will not replace the image. It will orchestrate containers created from the image.

## Phase 2 completion criteria

Phase 2 is complete when:

1. `docker build` succeeds.
2. `docker run` starts CloudLab without using the laptop's Node.js installation.
3. `/health` returns HTTP 200 through the mapped port.
4. The container can be stopped, deleted, and recreated from the same image.
5. You can explain Dockerfile -> image -> container -> port mapping.
