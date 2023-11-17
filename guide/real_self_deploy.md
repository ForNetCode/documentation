
## 本地
```bash
cd $fornet_git_project_path/command/docker

scp -r backend/config/* $RemoteHost:~/data/config/backend/
scp -r mqtt/config/ $RemoteHost:~/data/config/backend/


```

```shell
# change config
# firewall: 443， 4883(mqtts tcp)
# http ssl certificater
cd ~ 
mkdir -p data/pg
cd data/pg

docker run -d  --name postgres --network=host \
-e POSTGRES_PASSWORD=timzaak \
-e POSTGRES_DB=tnet \
-e POSTGRES_USER=postgres \
-v $(pwd):/var/lib/postgresql/data \
postgres:15

cd ~/data/config/backend
docker run -it -d \
--network=host \
-v $(pwd):/config \
--name=fornet-backend \
fornetcode/fornet-backend:latest

#cd ~/data && mkdir -p config/backend && cd config/backend
# copy config here


````

