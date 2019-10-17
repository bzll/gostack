# Creating package default

yarn init -y

# Creating a docker with Postgres
docker run --name gymdb -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres:11

# Create the database on postbird
docker ps

docker stop database

docker ps -a

docker start database

docker logs database

docker rm -f gymdb

# creation migration
# table Users
yarn sequelize migration:create --name=create-users
yarn sequelize db:migrate
yarn sequelize migration:create --name=create-students
yarn sequelize db:migrate

# if you want undo the migration, you can use the commands below
yarn sequelize db:migrate:undo      # for the last migration
yarn sequelize db:migrate:undo:all  # for all

# creation seed
# this functionallity allow us to create records on 
# database in an automatic way.
yarn sequelize seed:generate --name admin-user

yarn sequelize db:seed:all