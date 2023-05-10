# 开发问题集锦

## Client [Rust]
问题：Tun 使用了 rust_tun crate 的 `AsyncDevice`, 由于存在多线程读写，所以使用 `Arc<Mutex<AsyncDevice>>` 数据结构，但读写会相互抢占锁，导致写操作几乎没有，进而阻塞整个程序。
解决：通过 `tokio::io::split`, 来拆分读写。

## Client [Rust]
问题： ScalaPB 发出的WRConfig， Rust Tonic 无法解析。 
解决： Scala 项目必须重跑 `sbt compile` 指令才会更新 proto 文件变动。

## Backend
问题： 服务器端IP 生成存在效率+重复的问题
解决： TODO
