# 项目上下文文件

## 项目概述

这是一个用于练习C++语言的在线编程练习网站。网站提供编程题目，用户在指定区域编写C++程序，提交后系统会根据输入输出结果判断程序是否正确。

### 核心功能
- 显示C++编程练习题目
- 提供代码编辑器供用户编写C++程序
- 提交代码后自动编译和运行
- 根据预设的输入输出测试用例验证程序正确性
- 显示测试结果（通过/失败）

## 项目类型

**Web 应用项目（规划中）**

这是一个全栈Web应用，需要：
- **前端**: 用户界面（题目展示、代码编辑器、提交按钮、结果显示）
- **后端**: 代码接收、编译、执行、测试结果返回
- **C++编译环境**: 需要安装GCC或Clang编译器
- **安全机制**: 代码沙箱执行环境（防止恶意代码）

## 环境信息

- **工作目录**: `D:\Work\work-zone\vm-workbench\Node_project\aiprojecct`
- **操作系统**: Windows 10 (win32)
- **Git 版本**: 2.49.0.windows.1
- **Python 版本**: 3.8.0
- **Node.js**: 未检测到（需要安装）
- **C++编译器**: 未检测到（需要安装 GCC/MinGW 或 Visual Studio）

## 建议技术栈

### 前端
- **框架**: React 或 Vue.js
- **代码编辑器**: CodeMirror 或 Monaco Editor
- **样式**: Bootstrap CSS 或 Tailwind CSS

### 后端
- **运行时**: Node.js (Express.js) 或 Python (FastAPI/Flask)
- **代码执行**: 需要集成C++编译器

### 推荐架构

**方案一: Node.js 全栈**
- 前端: React + CodeMirror
- 后端: Node.js + Express.js
- C++编译: 使用 child_process 调用 g++

**方案二: Python 后端 + React 前端**
- 前端: React + CodeMirror
- 后端: Python + FastAPI
- C++编译: 使用 subprocess 调用 g++

## 建议项目结构

```
aiprojecct/
├── client/              # 前端代码
│   ├── src/
│   │   ├── components/  # React组件
│   │   ├── pages/       # 页面
│   │   └── App.js
│   └── package.json
├── server/              # 后端代码
│   ├── routes/          # API路由
│   ├── compilers/       # 编译器接口
│   └── app.js
├── problems/            # 题目数据
│   ├── problem1.json
│   └── problem2.json
├── tests/               # 测试用例
└── package.json         # 根项目配置
```

## 建议后续步骤

1. **安装必要工具**:
   ```powershell
   # 安装 Node.js (从官网下载安装)
   # 安装 MinGW-w64 (GCC for Windows) 或 Visual Studio
   ```

2. **初始化 Node.js 项目**:
   ```powershell
   npm init -y
   ```

3. **创建项目结构**:
   - 创建 `client/` 和 `server/` 目录
   - 创建 `problems/` 目录存放题目
   - 创建 `.gitignore` 文件

4. **安装前端依赖**:
   ```powershell
   cd client
   npm init -y
   npm install react react-dom
   npm install codemirror
   npm install bootstrap
   ```

5. **安装后端依赖**:
   ```powershell
   cd server
   npm init -y
   npm install express cors body-parser
   ```

6. **初始化 Git 仓库**:
   ```powershell
   git init
   ```

## 核心功能实现要点

### 代码提交流程
1. 前端发送代码到后端
2. 后端保存为 `.cpp` 文件
3. 调用 C++ 编译器编译
4. 如果编译成功，运行生成的可执行文件
5. 使用预设的测试用例验证输出
6. 返回结果给前端

### 安全注意事项
- 限制执行时间（防止无限循环）
- 限制内存使用
- 禁止文件系统访问
- 禁止网络访问
- 在独立进程中运行代码

## 注意事项

- 此文件应根据项目发展定期更新
- 需要确保开发环境已安装 C++ 编译器
- 代码执行需要实现安全沙箱机制
- 建议添加具体的构建、测试和运行命令到本文档

---

*此文件由 iFlow CLI 自动生成，用于为 AI 助手提供项目上下文。*
*最后更新时间: 2026-03-06*