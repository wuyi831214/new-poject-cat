---
name: install-claude-code
overview: 使用npm方式在Windows系统上全局安装Claude Code工具，并进行验证和初始配置
todos:
  - id: install-claude-code
    content: 使用npm全局安装Claude Code工具
    status: completed
  - id: verify-installation
    content: 验证Claude Code安装并检查版本
    status: completed
    dependencies:
      - install-claude-code
  - id: initial-config
    content: 运行Claude Code初始配置向导
    status: completed
    dependencies:
      - verify-installation
---

## 产品概述

在Windows系统上使用npm全局安装Claude Code命令行工具，并完成安装验证和初始配置。

## 核心功能

- 通过npm执行全局安装命令
- 验证安装是否成功及版本信息
- 运行初始配置向导