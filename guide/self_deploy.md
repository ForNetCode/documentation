# Getting Started

ForNet now provide a sever service for users to easy try. It's in beta status. you can deploy it yourself with this [guide](./self_deploy).

## client installation

you can download client binary app at Github <a :href="`${$sourceUrl}/releases`">release page</a>, it now supports macOS、Linux and Windows 11. **Client needs root/administrator permission to run**, unix is to create tun, Windows is to install driver.


## fornet server
you can register and login at [ForNet Keycloak SSO](https://sso.fornetcode.com). create network and get node invite token.

### Client Join Network 
There's `fornet` and `fornet-cli`, `fornet` is the background service, `fornet-cli` is used to interact with `fornet`.
```shell
# run fornet in background 
sudo fornet &
# you could get the invite cod from the admin web.
sudo fornet-cli join ${invite code}
```
You can also use docker in Linux(this does not support macOS, indows).
```shell
# export config to host, otherwise private.key will miss if image delete
docker run -it --name=fornet \
--cap-add=NET_ADMIN \
--network=host \
--device=/dev/net/tun \
-v ${config_path}:/config \
fornet:latest
# join  network
docker exec -it fornet fornet-cli join ${invite code}
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
sudo fornet-cli launch enable
```

## What's More
If you would like to deploy it self, please refer this [doc](./self_deploy) and  get roadmap [here](../plan).