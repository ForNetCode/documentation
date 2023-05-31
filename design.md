# 设计思路
## 目标
本项目目标是赋予 WireGuard 动态组网的能力，方便企业用户根据自身需求进行私有化部署或二次开发。 在网络层面属于Layer3.


## 客户端与服务器端通信
**密钥选择**
使用 `Curve25519` 来做密钥协商（x25519）和签名验证 (ed25519)

参考 [ZeroTier](https://docs.rs/zerotier/latest/zerotier/) 的 key 生成方式。

PublicKey ：Concatenation of X25519 public key (first 32 bytes) and Ed25519 public key (last 32 bytes).

SecretKey ：Concatenation of X25519 static secret (first 32 bytes) and Ed25519 secret key (last 32 bytes).


**认证方式**：
使用 ed25519 密钥对：

timestamp + networkId + nonce  =>  plain text

Client: (encrypt(private key, plain text)  => sign) + plain text + public key

Server: validate(public key,  plain text)


客户端与服务器端通信分为两个阶段：
### 客户端认证/登录
1. 通过 gPRC 发送 OAuth2 + 认证方式, 若OAuth2 通过，则正常通信。
2. 通过 gRPC 发送 认证方式，若客户端若不存在，则进入 Waiting 认证状态，若存在，则正常通信。
~~2. 服务器端输出 WireGuard 配置，客户端导入后，可自行连接（支持原生 WireGuard）。~~
#### ForNet Client
1. [客户端]检测当前机器有无配置，无配置则生成公私钥，将公钥传输给服务器端，获取配置，启动 WireGuard 客户端跑命令。
2. [服务器端]根据公钥匹配服务器端节点，有则下发配置，无则成为待连接点。由服务器端通过后，再下发配置到客户端。连接信息放入 ConnectionManager 和 Session Table.
3. [服务器端]通过 gRPC 检测客户端活性。
#### [WIP] WireGuard Client Wrapper
1. [客户端] 检测 WireGuard 状态，若ok，进入 ForNet Client【2】执行流程；若不 ok，则退出或使用 Rust WireGuard 版进行连接。


### 通信中
在通信中，服务器端与客户端建立额外的gRPC连接，服务器端通过连接下发指令：如：更新配置、更新网络拓扑、剔除下线等。

当客户端接收的配置变更版本与服务器端推送的不一致时，客户端可通过gRPC拉取最新配置。

## TCP
TCP 协议和 UDP 协议不同，要区分好 server/client 关系，可按照有无公网IP、IP 大小值 来简单做。

A 有公网IP，B无公网IP： A是Server，B做Client
A、B都无公网IP： A与B做 Client，去连接Relay
A、B都有公网IP： 谁 private IP值大，谁做 Server，另外一个做 Client， 若是不做判定，靠心跳来建立连接，有可能产生相互死锁。
为了后续 Relay 好做些，即使没有公网IP，TCP server 也开着，方面 IP 的随时增减。

## 网络拓扑

网络拓扑的设定方式：

目前暂时支持 中继，后续支持Ingress、Outgress、穿透。

## 客户端创建方式
Web端展示激活码base64、二维码，或 SSO登录 base64、二维码

激活码格式: 1|endpoint|hashId(networkId)|?hashId(NodeId)|?NodeType
NodeType 目前先不支持

SSO格式: 2|endpoint|hashId(networkId)|keycloakUrl|realm|clientId

### Web端创建客户端
Web端创建并生成密钥，生成 激活码\SSO base64、二维码。（节点页面放置）
### 客户端直接加入
客户端通过扫二维码/命令行指令 + 激活码/GUI+粘贴激活码 加入网络。（网络详情页面放置）

## 关键字段梳理
### 节点（Node）
Node: name, ip, type

Client Node: 

Relay Node: cidr


