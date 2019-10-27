# Script to manage docker containers
# call on terminal, this works only in powershell.
# Example call> .\docker-manage.ps1 "docker-start"

param($function)

# Start all containers
if($function -eq "docker-start"){
	foreach ($container in $(docker ps -a -q -f status=exited)) {
		docker start $container
	}
}

# Stop all containers
if($function -eq "docker-stop"){
	foreach ($container in $(docker ps -q)) {
		docker stop $container;
	}
}

# Restart all containers
if($function -eq "docker-restart"){
	foreach ($container in $(docker ps -a -q)) {
		docker restart $container;
	}
}
