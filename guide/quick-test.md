# Quick Test
This is for quick test.
## linux
### Backend
```shell
# cd $fornet_project_path
docker start mqtt nginx postgres
# docker rmi ghcr.io/fornetcode/fornet-backend:latest

docker run --rm  -v $PWD/backend/src/main/resources:/config --network=host ghcr.io/fornetcode/fornet-backend:latest
```

### Client
```shell
wget https://github.com/ForNetCode/fornet/releases/download/v0.1.0/fornet-linux-x86_64.tar.gz

#docker run
```

## Windows
### Client
```pwsh
wget https://github.com/ForNetCode/fornet/releases/download/v0.1.0/fornet-win11-x86_64.zip

```

## 