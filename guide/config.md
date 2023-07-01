# Config
## Backend Server
Backend server would serve static web pages. you can also split it with nginx.
### application.conf
```hocon

server {
  # backend web url
  web {
    port: 8080
    endpoint: "http://dev.localhost"
    # If you serve admin-web static web pages in backend, should set the path, otherwise remove it.    
    staticWeb: "src/main/webapp"
  }
  # interact with client, highly recommand to use https in production.
  grpc {
    port: 9000
    endpoint: "http://dev.localhost:"${server.grpc.port}
    # ssl/tls config, optional
    ssl {
      // crt file path
      certChain: "file_path.crt",
      //pem path
      privateKey: "private_key.pem",
    }
  }
  # hashId to confuse number id
  hashId: "fornet dev salt,you should change it"
  # enable saas mode, default is false
  # saas: false,
}
# postgres config
database {
  dataSourceClassName = org.postgresql.ds.PGSimpleDataSource
  dataSource.user = postgres_user
  dataSource.password = postgres_password
  dataSource.url = "jdbc:postgresql://127.0.0.1:5432/tnet_db"
  connectionTimeout = 30000
}

# rmqtt server config
mqtt {
  # rmqtt http api server
  apiUrl: "http://mqtt-dev.fornetcode.com:6666",
  # mqtt connecion for client
  clientUrl: "mqtt://mqtt-dev.fornetcode.com:1883"
}

# auth config for backend
auth {
   # ref from keycloak config, you can download it from keycloak/realm/client
  #keycloak {
  #  realm: "fornet",
  #  authServerUrl: "http://keycloak-dev.fornetcode.com",
  #  frontClientId : "fornet",
  #  # the user who has admin role can login in admin web, if undefined, anyone in the keycloak of realm can login
  #  # when server.saas enabled, this is useless
  #  adminRole: "admin",
  #  # the user who has client role can login in client, if undefined, anyone in the keycloak of realm can login
  #  # when server.saas enabled, this is useless
  #  clientRole: "client",
  #}
}

```


### logback.xml
This is an example log config, you can customize with your own need, If you use docker, please remember export log file path to host volume.
```xml

<configuration>
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>[%level] %logger - %message%n%xException{10}</pattern>
        </encoder>
    </appender>

    <appender name="ASYNCSTDOUT" class="ch.qos.logback.classic.AsyncAppender">
        <appender-ref ref="STDOUT" />
    </appender>
    <appender name="SAFE_FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>${application.home:-.}/logs/safe-application.log</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <!-- Daily rollover with compression -->
            <fileNamePattern>${application.home:-.}/logs/safe-application-log-%d{yyyy-MM-dd}.gz</fileNamePattern>
            <!-- keep 30 days worth of history -->
            <maxHistory>186</maxHistory>
        </rollingPolicy>
        <encoder>
            <pattern>%date{yyyy-MM-dd HH:mm:ss} [%level] %logger{15} - %message%n%xException{10}</pattern>
        </encoder>
    </appender>
    <appender name="ASYNC_SAFE_FILE" class="ch.qos.logback.classic.AsyncAppender">
        <appender-ref ref="SAFE_FILE" />
    </appender>
    <logger name="org.eclipse.jetty" level="INFO"/>
    <logger name="org.scalatra.servlet" level="INFO"/>
    <logger name="io.netty" level="INFO"/>
    <logger name="com.zaxxer.hikari" level="INFO"/>
    <logger name="io.grpc.netty" level="INFO" />
    <logger name="safe" level="INFO" additivity="false">
        <appender-ref ref="SAFE_FILE"/>
    </logger>

    <root level="INFO">
        <appender-ref ref="AYNCSTDOUT" />
    </root>

    <shutdownHook class="ch.qos.logback.core.hook.DefaultShutdownHook"/>

</configuration>

```

## RMQTT
There's more details about RMQTT at its [git repo](https://github.com/rmqtt/rmqtt).
There's 4 plugin config files should be set. You can get an example config of RMQTT <a :href="$sourceUrl + '/command/docker/mqtt/config/plugin'"></a>
1. rmqtt-auth-http.yml
2. rmqtt-http-api.yml
3. rmqtt-web-hook.yml
4. rmqtt-acl.yml

The interaction between ForNet server with RQMTT is:

RMQTT will call backend server http api:
1. /mqtt/auth, auth callback(check client if validate)
2. /mqtt/acl, client acl(ensure only server can publish message)
3. /mqtt/webhook, rmqtt webhook(when client subscribe client/$ success, publish config message)

Backend server will call RMQTT http restful api.

## Client

Client would store config files at different directory for differnet OS. The default path is:
|OS|PATH|
|:---:|:---------------:|
|macOS| ~/.fornet|
|Linux|/etc/fornet|

You can replace the default path by setting environment variable `FORNET_CONFIG` or run with `fornet --config=$CUSTOMISE_PATH`.

There are there files in the config directory.

`id_curve25519.key` the private key generated on host for encrypted communication.

`id_curve25519.pub` the public key of `id_curve25519.key` which is the device ID.

`config.json` contains the network information which the device joined, for example:

```json
{
  "server": "http://dev.fornetcode.com:9000",
  "device_id": "xxx",
  "info": [
    {
      "network_id": "L9wJy",
      "mqtt_url": "mqtt://mqtt-dev.fornetcode.com:1883",      
    }
  ]
}
```

> `server` is the grpc server which to provide auth API.
>
> `info.network_id` the network ID which the device has joined.
>
> `info.mqtt_url` the mqtt server which receive device config and peer nodes change message.
>
> `info.device_id` the device ID which is a short ID of public key.

The config files is managed by fornet client, You should not change it.