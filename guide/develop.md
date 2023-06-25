# Develop Guide
Download source code using Git:
```js-vue
git clone --recursive {{$sourceUrl}}
```

**由于开发时需要解决 前后端开发分离 问题**，需要使用 <a :href="${$sourceUrl}/command/docker/proxy">Nginx 镜像</a> 来做 Backend、Web、Keycloak 流量统一转发。
## Backend
后台使用 Scala3 编写，包含 Servlet Web Server(Jetty) 和 gRPC Server。 
### 环境准备
1. JDK 17
2. [sbt](https://www.scala-sbt.org/download.html)
3. PostgreSQL
### 编译与开发
推荐使用 Idea 开发，在 IDEA 中打开 `backend` 目录导入程序 ，并打开文件： `Server.scala`，`ServerRun` 方法为入口，可点击右侧的绿色运行图标跑起来。或者在`backend`目录下执行命令行：

```shell
# 下载依赖并编译，在 IDEA sbt 配置中，建议禁用源码下载，这样会快不少
sbt compile
```
PostgreSQL 可用 docker 跑。
```shell
# 需要自行设置持久化目录和数据库代码
# Mac/Windows
docker run -d  --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=tnet_db -v ${local_machine/pg/path}:/var/lib/postgresql/data postgres:14
# Linux
docker run -d  --name postgres --network=host -e POSTGRES_PASSWORD=tnet_db -v ${local_machine/pg/path}:/var/lib/postgresql/data postgres:14
# --psql: create database tnet_db 创建 database 
docker exec -it postgres sh
psql -u postgres
create database tnet_db 
# 
```
数据库创建完毕后，创建配置文件：`src/main/resources/private.conf`, 覆盖 application.conf 里面的配置。

### 打包

```shell
# jar 打包命令
sbt universal:packageBin
```
在 `target/universal` 目录下生成 zip 包。

Docker 镜像(包含Web端, 请安装好 Node.js)打包脚本： `command/docker/backend/docker_build.sh`
```shell
cd command/docker/backend
version=$latest
# version 要和 backend/build.sbt 里的版本保持一致。
./docker_build.sh $version

# run server
docker run -it --network=host --name=fornet-backend -v $(pwd)/config:/config fornet-backend:$version
```


## Admin Web
使用 React + Antd 来做，手脚架：create-react-app， `admin-web` 为项目目录。
### 环境准备
1. [Node.js 下载](https://nodejs.org/en/download)，推荐用 [nvm](https://github.com/nvm-sh/nvm) 来安装，方便升级。

### 编译与开发
```sh
# install lib
npm install
# 开发
npm run
```


### 打包
```shell
npm run build:prod
```
## Command Line
### 环境准备
1. [Rust 安装](https://www.rust-lang.org/tools/install), version:1.63.0+
2. [protobuf compiler安装](https://github.com/hyperium/tonic#dependencies), [windows 版本安装](https://zhuanlan.zhihu.com/p/462221148)，开发 Rust 的 gRPC 需要。（PS: Ubuntu 的 protobuf 版本过低（要求版本>=3.16），建议去 protobuf github 下载最新版本二进制）
3. [cmake](https://cmake.org/) Paho MQTT client required
4. [OpenSSL](https://www.openssl.org/) Paho MQTT client required 

### 编译与开发
推荐使用 Clion 开发。
```shell
cd client
cargo build --release
```
## Mobile App
App端使用 [Flutter](https://flutter.dev/) 来做跨平台 UI层面的开发。业务逻辑和通信层用 Rust 来实现，使用 [flutter_rust_bridge](https://github.com/fzyzcjy/flutter_rust_bridge) 衔接两方语言。

### 环境准备
1. [Flutter 安装](https://docs.flutter.dev/get-started/install), version:3.3.0+
2. [Rust 安装](https://www.rust-lang.org/tools/install), version:1.63.0+
3. [flutter_rust_bridge 编译工具链安装](http://cjycode.com/flutter_rust_bridge/template/setup.html)，可先安装一个平台，等编译一个平台OK后，再处理其他平台。 
4. [protobuf compiler安装](https://github.com/hyperium/tonic#dependencies), [windows 版本安装](https://zhuanlan.zhihu.com/p/462221148)，开发 Rust 的 gRPC 需要。（PS: Ubuntu 的 protobuf 版本过低（要求版本>=3.16），建议去 protobuf github 下载最新版本二进制）
### 编译与开发
推荐使用 IDEA 开发 Flutter。在 IDEA 中打开 `app` 目录导入 Flutter 程序。

使用 VSCode 或 Clion 开发 Rust 部分， 在 Clion 中打开 `client` 目录导入 Rust 程序。

```shell
# 针对 flutter_api.rs 生成 Dart 调用代码
cd app

# this is for Windows environment
flutter_rust_bridge_codegen --rust-input ..\client\lib\src\flutter_api.rs --dart-output .\lib\bridge_generated.dart --dart-decl-output .\lib\bridge_definitions.dart -e macos\Runner
# this is for others environment
flutter_rust_bridge_codegen --rust-input ../client/lib/src/flutter_api.rs --dart-output ./lib/bridge_generated.dart --dart-decl-output ./lib/bridge_definitions.dart -e macos/Runner
```


## Release Version Check
## ChangeVersion
- backend(build.sbt)
- client(cargo.toml, cargo-lock.toml)
- admin-web(package.json)
## Distribution
Run Github Action:
- Client binary, docker image
- Backend jar, docker image

## Documentation
- change log
- Github Action(release to GitPage)