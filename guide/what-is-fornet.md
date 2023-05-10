# What is ForNet
ForNet used to create virtual local network across the Internet. It's based on [BoringTun](https://github.com/cloudflare/boringtun), WireGuard implementation written by Rust.
It now provider Linux and macOS client, and Windows、Android would come soon.
::: tip
ForNet is now in `BETA` status, we will do our best to fix bugs to make it stable.

Just want to try it out? Skip to the [Quick Start](./quick-start).
:::


## Use Cases
- **Home Lab**
[WIP]Easy try, Device can access each other by P2P or Relay, and you can configure all your device in one web page.
- **Enterprise Secure Network**
ForNet integrated with Keycloak, IT would easily manage the employee permissions to access company private network.


## What about WireGuard?
ForNet is based on [BoringTun](https://github.com/cloudflare/boringtun) which is the Rust implementation of WireGuard. We very appreciate their efforts to create such brilliant project.
In future develop plan, we would support WireGuard original client.