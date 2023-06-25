# Keycloak Integration
::: tip
Before `backend` up, make sure keycloak is up and config properly, `backend` now will fall down when connect keycloak fail. We will fix it in the future version.
:::

There is a test keycloak docker image <a :href="`${$sourceUrl}/command/docker/keycloak/dev.Dockerfile`">Dockerfile</a> and <a :href="`${$sourceUrl}/command/docker/keycloak/run.sh`">run.sh</a>, you can try it in develop environment.

ForNet keycloak auth config now is simple. every user who are in the realm you let them joined can join their devices to the network, after the admin user enabled their device at admin web, the device can connect to each other.

## Keycloak Config
ForNet use device code auth with Keycloak. Below is an example settings of keycloak.
We assume that you have bring keycloak up, and prepare to config fornet-bakcend `application.conf` as below:
```hocon
auth.keycloak {  
    realm: "fornet",
    authServerUrl: "http://keycloak-dev.fornet.com",
    frontClientId : "fornet",
    // users who has the role `admin` can access to admin backend web
    role: "admin",
}
```

The keycloak client config would be:

![fornet_client](/img/keycloak_client_id_config.png)

::: tip
Enable Device Authorization Grant for the command line client.
:::

ForNet admin web also support register device with unique code, This is for the situation where client does not have browser to login in keycloak.
