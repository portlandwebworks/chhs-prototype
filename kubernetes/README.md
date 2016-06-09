# cchs-kubernetes-demo 

Kubernetes is an open-source system for automating deployment, scaling, and management of containerized applications. This contains a fully functional provisioning code that can be used to deploy the published Docker images to a high-availability cluster in the Google Compute Engine platform.

## Notes
- High Availability
- Auto Scaling
- Docker based containers 
- Platform Independent 
- Open Source
- Utilizing a High Availability Google Cloud SQL Database [https://cloud.google.com/sql/](https://cloud.google.com/sql/)

### Quickstart
```
gcloud config set project GCE_PROJECT_ID
gcloud config set compute/zone us-central1-c
gcloud container clusters create GCE_PROJECT_ID

kubectl create secret generic chhs --from-literal=spring.datasource.username=USERNAME --from-literal=spring.datasource.password=PASSWORD --from-literal=spring.datasource.url=jdbc:mysql://DB_HOSTNAME:3306/DB_NAME

kubectl create -f frontend-controller.yml
kubectl create -f backend-controller.yml
kubectl create -f frontend-service.yml
kubectl create -f backend-service.yml
```

### Docker Infrastructure
The Kubernetes platform leverages [Docker] (https://www.docker.com/what-docker) containers for all of it's deployments.

To demonstrate the power of Docker, there is a quick demo of the environment that can be setup locally using Docker Compose. If you have Docker installed, you launch a local environment using the publically accessible Docker Images used to power the Prototype. From the current directory, just run the following and visit [http://localhost:8080/](http://localhost:8080/).

```
docker-compose up
```

Please see the `docker-compose.yml` in the current directory to see how this works.