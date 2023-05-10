# WireGuard
## 原生组网

### Interface
```ini
[Interface]
# Name =
Address = $import
ListenPort =
PrivateKey = 
DNS =
PreUp/PostUp/PreDown/PostDown =
```
Address:
> 为本机设置vpn私有地址(段)，不同peer节点，可以设置不同段
> 定义本地节点应该对哪个地址范围进行路由。
> 如果是常规的客户端，则将其设置为节点本身的单个 IP（使用 CIDR 指定，例如 192.0.2.3/32）；
> 如果是中继服务器，则将其设置为可路由的子网范围， 可以指定多个子网或 IPv6 子网，用英文逗号隔开
### Peer

```ini
[Peer]
# Name =
Endpoint =
PublicKey =
AllowedIPs =
PersistentKeepalive =
```
AllowedIps:
> 允许该对等节点（peer）发送过来的 VPN 流量中的源地址范围。
> 同时这个字段也会作为本机路由表中 wg0 绑定的 IP 地址范围。
> 如果对等节点（peer）是常规的客户端，则将其设置为节点本身的单个 IP；如果对等节点（peer）是中继服务器，则将其设置为可路由的子网范围。
> 可以使用`,`来指定多个 IP 或子网范围。该字段也可以指定多次。

> 对等节点（peer）是中继服务器，用来将流量转发到其他对等节点（peer）: 192.0.2.1/24
> 对等节点（peer）是中继服务器，可以路由其自身和其他对等节点（peer）的流量: 192.0.2.3/32,192.0.2.4/32
> 对等节点（peer）是中继服务器，可以路由其自身的流量和它所在的内网的流量: 192.0.2.3/32,192.168.1.1/24
> 对等节点（peer）是中继服务器，可以转发所有的流量，包括外网流量和 VPN 流量: 0.0.0.0/0,::/0
> 对等节点（peer）是路由可达的客户端，只为自己路由流量: 192.0.2.2/32


Endpoint:
> 指定远端对等节点（peer）的公网地址。
> 如果对等节点（peer）位于 NAT 后面或者没有稳定的公网访问地址，就忽略这个字段。
> 通常只需要指定中继服务器的 Endpoint，当然有稳定公网 IP 的节点也可以指定。

###  Example
[简单的多网连接 Peer](https://icloudnative.io/posts/wireguard-docs-practice/#peer)
[HomeLab 组网配置在线生成](https://www.wireguardconfig.com/)

## WireGuard 拓展
1. [wireguard udp punching hole](https://git.zx2c4.com/wireguard-tools/tree/contrib/nat-hole-punching)
2. wg-dynamic, dynamic ip, like DHCP, 不过还在开发中

### 参考：
[上古神器WireGuard异地高效率组网](https://blog.csdn.net/qq_45860349/article/details/122436799)
[Routing & Network Namespace Integration](https://www.wireguard.com/netns/)
[WireGuard 的使用与配置详解](https://blog.csdn.net/wq1205750492/article/details/124816246)
[WireGuard 教程：WireGuard 的搭建使用与配置详解](https://icloudnative.io/posts/wireguard-docs-practice/)
[WG-GEN-WEB web端](https://github.com/vx3r/wg-gen-web)

## WireGuard QRCode
将配置文件转换为QRCode




# iptables
[iptables详解](https://zhuanlan.zhihu.com/p/493612033)


# Android
## Android VPN
[Android VPN](https://developer.android.com/guide/topics/connectivity/vpn)
# Rust And App
[flutter_rust_bridge](https://cjycode.com/flutter_rust_bridge/)



# 开发用的 WireGuard 配置
目前该配置直接写死，方便开发应用
## 服务器端

```ini
[Interface]
# Name = ubuntu_server
# PublicKey = lpgpJqleWa1zqrk/O/jRThnqK1dGDzogKKicoefQrFs=
PrivateKey = 6LI166lIZJmAxMWzTf/r/KyIjKJXXFsry3Z0XDIRbHo=
Address = 10.0.0.1/24
# 运行 WireGuard 时要执行的 iptables 防火墙规则，用于打开NAT转发之类的。
# 如果你的服务器主网卡名称不是 eth0 ，那么请修改下面防火墙规则中最后的 eth0 为你的主网卡名称。
PostUp = iptables -A FORWARD -i wg0 -j ACCEPT; iptables -A FORWARD -o wg0 -j ACCEPT; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
# 停止 WireGuard 时要执行的 iptables 防火墙规则，用于关闭NAT转发之类的。
# 如果你的服务器主网卡名称不是 eth0 ，那么请修改下面防火墙规则中最后的 eth0 为你的主网卡名称。
PostDown = iptables -D FORWARD -i wg0 -j ACCEPT; iptables -D FORWARD -o wg0 -j ACCEPT; iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE
# 服务端监听端口，可以自行修改
ListenPort = 51820
# 服务端请求域名解析 DNS
DNS = 8.8.8.8
# 保持默认
MTU = 1420

[Peer]

PublicKey = GjRhJIjhkMBaWyQ59Pu/vHyNCmCcFwKjef5xy06BIT0=
AllowedIps = 10.0.0.2/32
PersistentKeepalive = 25
```

Mock Identity:
pk: lpgpJqleWa1zqrk/O/jRThnqK1dGDzogKKicoefQrFv2PkzMj6DTE/dPLgzcaof3+0CaLroYph0bPuLq9Kwu3A==
sk: 6LI166lIZJmAxMWzTf/r/KyIjKJXXFsry3Z0XDIRbHqQbomC+Ld2h8TTs2cUp4uWdo42NYoy/4OzOv3dyhYHNw==

## 客户端
Mac 需要安装 `brew install wireguard-tool`, 然后将配置文件写入 `/usr/local/etc/wireguard/utun8.conf`

```ini
[Interface]
# Name = mac_client
PrivateKey = UF+goMKDx62MyAHsnYPGuFgCg5/b1EkBAUvWkT3eBnk=
Address = 10.0.0.2/32
MTU = 1420
[Peer]
PublicKey = lpgpJqleWa1zqrk/O/jRThnqK1dGDzogKKicoefQrFs=
Endpoint = 124.71.208.98:51820
AllowedIPs = 10.0.0.1/24
PersistentKeepalive = 25
```

运行 `sudo wg-quick up utun8`
Identity(x_sk:UF+goMKDx62MyAHsnYPGuFgCg5/b1EkBAUvWkT3eBnk=, x_pk:GjRhJIjhkMBaWyQ59Pu/vHyNCmCcFwKjef5xy06BIT0=, ed_sk:J+1zMT5tPZgWpJ+AKE0yxywDKE9KJC4V4e03KWGhKKDlGQx+dYw9GDLCxWEshed/pARu4YnzFrDS+k73D1vkfw==, ed_pk:5RkMfnWMPRgywsVhLIXnf6QEbuGJ8xaw0vpO9w9b5H8=)

id_curve25519.key: UF+goMKDx62MyAHsnYPGuFgCg5/b1EkBAUvWkT3eBnkn7XMxPm09mBakn4AoTTLHLAMoT0okLhXh7TcpYaEooA==
id_curve25519.pub: GjRhJIjhkMBaWyQ59Pu/vHyNCmCcFwKjef5xy06BIT3lGQx+dYw9GDLCxWEshed/pARu4YnzFrDS+k73D1vkfw==
