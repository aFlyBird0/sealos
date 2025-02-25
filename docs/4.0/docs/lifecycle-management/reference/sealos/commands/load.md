---
sidebar_position: 6
---

# load 加载镜像

`sealos load` 是一个用来从存档文件中加载镜像的命令。这对于需要从已有的存档文件中导入镜像非常有用，尤其是在没有网络连接的环境中。

## 用法:

`sealos load [flags] [options]`

## 参数:

以下是 `sealos load` 命令的参数：

- `-i, --input=''`: 从 tar 存档文件中加载镜像。

- `--platform=[linux/arm64/v8]`: 选择镜像时，优先使用指定的 OS/ARCH，而不是当前操作系统和架构。

- `-t, --transport='oci-archive'`: 从 tar 存档文件中加载镜像传输。可用选项有 oci-archive，docker-archive。

- `--variant=''`: 覆盖指定镜像的 `variant`。

## 示例:

- 从一个存档文件中加载镜像：`sealos load -i myimage.tar`

注意，在使用 `sealos load` 命令时，你需要确保指定的存档文件存在，并且格式正确。如果你在导入镜像时遇到问题，你可能需要检查你的存档文件，以确保它们没有被损坏或格式化错误。

以上就是 `sealos load` 命令的使用指南，希望对你有所帮助。如果你在使用过程中遇到任何问题，欢迎向我们提问。
