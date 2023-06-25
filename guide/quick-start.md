# Getting Started

## Installation

### Prerequisites
ForNet is a client-server model program, you need to deploy server firstly,
and ForNet now needs relay node to let devices connect each other. You need have a linux server to deploy the relay instance.
We are in hard work to build SASS backend server and implement p2p connection feature. You would only need to install client then.

If you like to build ForNet from the source code, please refer [Develop Guide](./develop) for more information.

### Client
you can download client binary app at Github <a :href="`${$sourceUrl}/releases`">release page</a>, it now supports macOS and Linux.
Windows is blocked for tun driver code signature.

### Server
The manager server is written by Scala, you can deploy the jar or docker image. It uses Postgres to store data. and uses [rmqtt](https://github.com/rmqtt/rmqtt) to interact with client.

There is <a :href="`${$sourceUrl}/command/docker-compose/simple/docker-compose.yml`">docker-compose.yml</a> for quick start, you can ship it with:
```shell
# must be in the directory
# it needs config files of backend and rmqtt
cd /command/docker-compose/simple
docker-compose up
```
If you 
#### Postgres
```shell
# If platform is Mac/Windows, change --network=host to -p 5432:5432
docker run -d  --name postgres --network=host \
-e POSTGRES_PASSWORD=tnet_db_password \
-e POSTGRES_DB=tnet_db \
-e POSTGRES_USER=postgres \
-v ${local_machine/pg/path}:/var/lib/postgresql/data\
postgres:14

```

#### Deploy RMQTT Docker
Here is an example of rmqtt <a :href="$sourceUrl + '/command/docker/mqtt'">config</a>, you can run it after changed backend server url in `config/plugin/rmqtt-auth-http.toml`.

More details about RMQTT can be found [here](https://github.com/rmqtt/rmqtt).
```shell
cd /command/docker/mqtt
# RMQTT will use port:
# 1883(mqtt) 6060(http api) 5363(grpc)
docker run -d --name mqtt --network=host\
 -v $(pwd)/log:/var/log/rmqtt\
 -v $(pwd)/config/rmqtt.toml:/app/rmqtt/rmqtt.toml\
 -v $(pwd)/config/plugin:/app/rmqtt/plugin\
 rmqtt/rmqtt:latest
```

#### Deploy Server Docker
There is two config file: `application.conf` and `logback.xml`, you can get the example <a :href="$sourceUrl + '/command/docker/backend/config'">here</a>.
More details about config can be found [here](config.md).

```shell
# run server with database init
docker run -it -d\
-p 8080:8080 -p 9000:9000\
-v ${local_machine/applcation.conf+logback.xml/path}:/config\
--name=fornet-backend\
fornetcode/fornet-backend:latest

```

## Up and Running

### Create Network
After the backend server up, visit the backend website: http://127.0.0.1:8080, If you use simple auth, just type in `adminToken` to login in.
Then you could create network, and get invite code to let client node join in.

### Client Join Network 
There's `fornet` and `fornet-cli`, `fornet` is the background service, `fornet-cli` is used to interact with `fornet`.
```shell
# run fornet in background 
sudo fornet &
# you could get the invite cod from the admin web.
fornet-cli join xxx
```
You can also use docker in Linux(docker image does not support macOS).
```shell
# export config to host, otherwise private.key will miss if image delete
docker run -it --name=fornet\
--cap-add=NET_ADMIN\
--network=host\
--device=/dev/net/tun\
-v ${config_path}:/config\
fornet:latest
# join  network
docker exec -it fornet fornet-cli join xxx
```

### Auto Launch
#### Linux
ForNet now don't support automatically start after host reboot in Linux, you can get it with Systemd.
```
cp fornet /usr/local/bin/
```
create the Systemd configuration file at `/etc/systemd/system/fornet.service`
```
[Unit]
Description=ForNet client daemon
After=network.target

[Service]
Type=simple
User=root
Restart=always
ExecStart=/usr/local/bin/fornet

[Install]
WantedBy=multi-user.target

```

After that you're supposed to reload systemd:
```
systemctl daemon-reload
```

Launch fornet on system startup with:
```
systemctl enable fornet
```
Launch fornet immediately with:
```
systemctl start fornet
```

#### macOS
```shell
fornet-cli launch enable
```
## What's More
If you are interested with this project, you can go [roadmap](../plan) to get more information.