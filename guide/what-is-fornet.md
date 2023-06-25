# What is ForNet
ForNet used to create virtual local network across the Internet. It's based on [BoringTun](https://github.com/cloudflare/boringtun), WireGuard implementation written by Rust.
It now provides Linux and macOS client, and Windows、Android would come soon.
::: tip
ForNet is now in `BETA` status, we will do our best to fix bugs to make it stable.

Just want to try it out? Skip to the [Quick Start](./quick-start).
:::


## Use Cases
- **Home Lab**
Easy try, Device can access each other by P2P[WIP] or Relay, and you can configure all your device in one web page.
- **Enterprise Secure Network**
ForNet integrated with Keycloak, IT would easily manage the employee permissions to access company private network.
- **SAAS Secure Network**
ForNet provide simple saas secure network platform with keycloak, It now used for easy try of ForNet.

## What about WireGuard?
ForNet is based on [BoringTun](https://github.com/cloudflare/boringtun) which is the Rust implementation of WireGuard. We very appreciate their efforts to create such brilliant project.
In future develop plan, we would support WireGuard original client.
## What about backend?
Backend server web framework is used with [Scalatra](https://scalatra.org/), written in Scala 3, It provides Http Restful API with admin web, and handle mqtt callback requests.
MQTT is used with the Rust implementation: [RMQTT](https://github.com/rmqtt/rmqtt),it support MQTT v3.1 and V5.0, we use it to sync config and changes to client.