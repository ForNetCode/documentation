## Changelog
### V0.1.1
This is a fixed bug version, we have tested it in production environment of SAAS, and every thing is ok.
- [x] fix: multifarious bugs
- [x] feat: aarch64 client support with Github Actions, make the distribution zip file more clean
- [x] feat: add SAAS production config and scripts

### V0.1.0
**This is not compatible with V0.0.4.**

This version is ready to prepare SAAS.
- [x] windows support TCP
- [x] windows command support
- [x] refact: refactor client code to prepare to support join multiple network and Android Platform
- [x] feat/cicd: move mqtt client to mqrstt
- [x] chore: [admin-web] update dependencies

### V0.0.4
prepare for users to try
- [x] feat: SASS backend develop and deploy（For Easy Try）
- [x] feat: docker compose for quick start (For Easy Try)
- [x] feat: TCP protocol support
- [x] fix: MQTT relative bugs
- [x] fix: make client more stable(handle tcp connection state, destory resource when forbid)
- [x] chore: [backend] move common code to web-sugar
- [x] chore: [client tun] move to windows-simple-tun
- [x] cicd: add amd64 Linux client docker artifact
  
### V0.0.3(drop for error usage of MQTT)
Bug Fix version，prepare to release
- [x] Docs
- [x] License

### V0.0.2
MVP
- [x] [server][admin-web] keycloak adapter
- [x] [client][mac][linux] keycloak SSO


### V0.0.1
此版本为初始版本，主要解决的问题是`WireGuard 配置同步` 和 验证产品可行性。
- [x] [admin-web] 网络创、节点 创建+管理, 基础组网（Relay + Client）方式
- [x] [client][mac][linux] commandline
- [x] [server][client] Docker 镜像构建，发版
