# C++ 在线编程练习网站 - 项目开发对话记录

**日期**: 2026年3月6日  
**项目**: C++ 在线编程练习网站  
**参与者**: 用户 & iFlow CLI

---

## 项目开始

**用户**: 分析当前目录并生成 AGENTS.md 文件。

**AI**: 开始分析项目结构...

---

## 项目需求确认

**用户**: 这是一个网站项目，网站用途是练习C++语言，网站会显示一些题目，用户需要在指定区域用C++编写需要的程序，提交后，网站会根据输入输出结果判断用户编写程序是否正确。

**AI**: 明确了这是一个C++在线编程练习网站，包含题目展示、代码编辑器、提交和自动测试功能。

---

## 技术选型讨论

**用户**: 你建议网站采用哪种语言编写？

**AI**: 建议采用 **Node.js 全栈方案**，理由：
1. 技术一致性（前后端都使用 JavaScript/TypeScript）
2. 丰富的生态系统
3. 适合 Windows 环境
4. 社区支持良好

**技术栈建议**:
- 前端: React 18 + CodeMirror 5 + Bootstrap 5
- 后端: Node.js + Express.js
- C++编译: 使用 child_process 调用 g++

**用户**: 需要，先搭建基础结构。

---

## 项目搭建过程

### 1. 初始化项目结构
创建目录：client, server, problems, tests

### 2. 配置文件
- 根目录 package.json
- 客户端 package.json（React + Webpack）
- 服务端 package.json（Express）

### 3. 创建基础文件
- server/app.js - Express 服务器
- client/src/App.js - React 主组件
- client/public/index.html - HTML 模板
- 题目文件: problem1.json, problem2.json, problem3.json

### 4. 解决依赖安装问题
使用 npm install 安装所有依赖包。

---

## 问题排查和修复

### 问题 1: 前端空白页面
**原因**: HTML 文件缺少引入 bundle.js 的 script 标签
**解决**: 在 index.html 中添加 `<script src="/bundle.js"></script>`

### 问题 2: 后端 API 500 错误
**原因**: problem3.json 文件中使用了中文引号
**解决**: 将中文引号改为英文引号

### 问题 3: 编译器不可用
**尝试的解决方案**:
1. 使用完整路径: `D:\Work\work-dll\msys64\ucrt64\bin\g++.exe`
2. 使用系统 PATH 中的 g++
3. 添加静态编译选项: `-static -static-libgcc -static-libstdc++`

**当前状态**: 编译器配置已完成，但需要重启电脑让 PATH 设置完全生效。

---

## 项目功能实现

### 前端功能
- 题目列表展示
- 题目详情显示
- 代码编辑器（textarea）
- 提交按钮
- 测试结果显示

### 后端功能
- GET /api/problems - 获取题目列表
- GET /api/problems/:id - 获取题目详情
- POST /api/submit - 提交代码并测试
- 自动编译和运行 C++ 代码
- 测试用例验证

### 题目数据
1. Hello World - 输出 "Hello, World!"
2. 两数之和 - 计算两个整数的和
3. 判断奇偶数 - 判断整数是奇数还是偶数

---

## 技术问题讨论

### 关于前端错误
用户遇到浏览器扩展导致的 JavaScript 错误，确认这些错误不影响网站功能。

### 关于编译器配置
确认需要安装 GCC 编译器，用户选择安装 MSYS2，路径为: `D:\Work\work-dll\msys64\ucrt64\bin\g++.exe`

---

## 文档生成

**用户**: 请添加文档生成技能。

**AI**: 尝试添加文档生成技能但不可用，转而手动生成文档。

### 生成的文档
1. **README.md** - 项目主文档
   - 项目概述和功能特性
   - 技术栈说明
   - 安装和运行指南
   - API 接口概述
   - 添加新题目的方法
   - 常见问题解答

2. **docs/API.md** - API 详细文档
   - 完整的 API 接口说明
   - 请求/响应示例
   - 错误码说明
   - 安全限制和建议
   - JavaScript 和 cURL 示例代码

3. **docs/DEVELOPMENT.md** - 开发指南
   - 开发环境配置
   - 代码规范
   - 常见开发任务指南
   - 调试技巧
   - 性能优化建议
   - 部署指南
   - 故障排除

---

## Git 版本控制

**用户**: 项目目录创建git控制。

**AI**: 执行以下操作：
1. `git init` - 初始化 Git 仓库
2. `git add .` - 添加所有文件
3. `git commit -m "Initial commit: C++在线编程练习网站基础框架"` - 创建初始提交

**结果**: 成功创建 Git 仓库，20 个文件，9652 行代码。

---

## 界面工具说明

### Smart Mode
智能模式，会自动使用专门的代理处理复杂任务。

### thinking: off
关闭了思考过程的显示，只直接给出最终答案。

### 55% context left
表示还有 55% 的上下文容量可以使用。

---

## 服务管理

### 启动服务
```bash
npm run dev  # 同时启动前后端
```

### 单独启动
```bash
# 后端
cd server && npm start

# 前端
cd client && npm start
```

### 关闭服务
使用 `taskkill` 命令停止占用端口的进程。

---

## 当前项目状态

### 已完成
✅ 项目基础结构搭建
✅ 前端 React 应用
✅ 后端 Express 服务器
✅ API 接口实现
✅ 题目数据创建
✅ 文档生成
✅ Git 版本控制

### 待解决
❌ C++ 代码编译功能（需要重启电脑后测试）

### 访问地址
- 前端: http://localhost:3000
- 后端: http://localhost:3001

---

## 技术栈总结

### 前端
- React 18.2.0
- Bootstrap 5.3.2
- Axios 1.6.2
- Webpack 5.89.0

### 后端
- Node.js + Express 4.18.2
- CORS 2.8.5
- Body-parser 1.20.2

### 编译器
- GCC (MinGW-w64/MSYS2)
- 路径: `D:\Work\work-dll\msys64\ucrt64\bin\g++.exe`

---

## 项目文件结构

```
aiprojecct/
├── client/                 # 前端代码
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── webpack.config.js
├── server/                 # 后端代码
│   ├── app.js
│   ├── temp/
│   └── package.json
├── problems/               # 题目数据
│   ├── problem1.json
│   ├── problem2.json
│   └── problem3.json
├── docs/                   # 文档
│   ├── API.md
│   └── DEVELOPMENT.md
├── tests/                  # 测试目录
├── AGENTS.md              # AI 上下文文件
├── README.md              # 项目主文档
├── .gitignore             # Git 忽略配置
└── package.json           # 根项目配置
```

---

## 后续计划

1. **重启电脑** - 让 GCC 编译器 PATH 设置完全生效
2. **测试编译功能** - 验证代码提交和编译是否正常工作
3. **添加更多题目** - 扩展题目库
4. **功能增强** - 考虑添加用户系统、提交历史等功能
5. **测试** - 添加单元测试和集成测试

---

## 关键决策记录

1. **技术选型**: 选择 Node.js 全栈而不是 Python + React
2. **编译器**: 选择 MSYS2 GCC 而不是 Visual Studio
3. **构建工具**: 选择 Webpack 而不是其他打包工具
4. **UI 框架**: 选择 Bootstrap 而不是其他 CSS 框架

---

## 遇到的主要挑战

1. **前端空白页面** - 缺少 script 标签
2. **JSON 格式错误** - 中文引号问题
3. **编译器配置** - 路径和依赖问题
4. **服务端口冲突** - 需要手动停止进程

---

## 项目亮点

1. **完整的前后端分离架构**
2. **自动化的 C++ 代码编译和测试**
3. **清晰的 API 设计**
4. **完善的文档系统**
5. **Git 版本控制**
6. **易于扩展的题目系统**

---

## 技术债务

1. 需要添加用户认证系统
2. 需要实现代码沙箱隔离
3. 需要添加速率限制
4. 需要实现日志记录
5. 需要添加单元测试

---

## 资源链接

- [React 文档](https://react.dev/)
- [Express 文档](https://expressjs.com/)
- [Node.js 文档](https://nodejs.org/docs/)
- [MSYS2 官网](https://www.msys2.org/)

---

## 项目统计

- 总文件数: 20+
- 代码行数: 9652+
- 题目数量: 3
- API 接口: 3
- 文档页面: 3

---

*本对话记录记录了从项目初始化到基础框架完成的整个过程。*
*最后更新时间: 2026年3月6日*