# Creating package default

yarn init -y

# Creating a docker with Postgres
docker run --name gymdb -e POSTGRES_PASSWORD=docker -p 5433:5432 -d postgres:11

docker ps

docker stop database

docker ps -a

docker start database

docker logs database
