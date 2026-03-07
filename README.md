# C++ 在线编程练习网站

> **本项目为 AI 练习项目，全程由 iFlow AI 助手生成**

这是一个用于练习 C++ 语言的在线编程练习网站，用户可以在网页上编写 C++ 代码并自动测试运行结果。

## 功能特性

- 📝 题目列表展示
- 💻 在线代码编辑器
- ⚡ 自动编译和运行 C++ 代码
- ✅ 自动测试用例验证
- 🎯 实时测试结果显示

## 技术栈

### 前端
- **框架**: React 18.2.0
- **样式**: Bootstrap 5.3.2
- **HTTP 客户端**: Axios 1.6.2
- **构建工具**: Webpack 5.89.0

### 后端
- **运行时**: Node.js + Express 4.18.2
- **C++ 编译器**: GCC (MinGW-w64/MSYS2)

## 项目结构

```
aiprojecct/
├── client/                 # 前端代码
│   ├── src/
│   │   ├── App.js         # 主应用组件
│   │   ├── App.css        # 应用样式
│   │   └── index.js       # 入口文件
│   ├── public/
│   │   └── index.html     # HTML 模板
│   ├── package.json       # 前端依赖配置
│   └── webpack.config.js  # Webpack 配置
├── server/                 # 后端代码
│   ├── app.js             # Express 服务器
│   ├── temp/              # 临时编译文件目录
│   └── package.json       # 后端依赖配置
├── problems/               # 题目数据
│   ├── problem1.json      # Hello World
│   ├── problem2.json      # 两数之和
│   └── problem3.json      # 判断奇偶数
├── tests/                  # 测试目录
├── AGENTS.md              # AI 助手上下文文件
├── .gitignore             # Git 忽略配置
└── package.json           # 根项目配置
```

## 安装和运行

### 前置要求

- Node.js (建议 v16 或更高版本)
- C++ 编译器 (MinGW-w64 或 MSYS2)
- Git (可选，用于版本控制)

### 安装步骤

1. 克隆或下载项目
```bash
git clone <repository-url>
cd aiprojecct
```

2. 安装所有依赖
```bash
npm run install:all
```

或者分别安装：
```bash
npm install              # 安装根目录依赖
cd server && npm install # 安装后端依赖
cd ../client && npm install # 安装前端依赖
```

3. 配置 C++ 编译器路径

编辑 `server/app.js` 文件，修改编译器路径：
```javascript
const GPP_PATH = 'D:\\path\\to\\g++.exe'; // 修改为你的 g++ 路径
```

或确保 g++ 已添加到系统 PATH 环境变量中。

### 运行项目

**方式 1: 同时启动前后端**
```bash
npm run dev
```

**方式 2: 分别启动**
```bash
# 终端 1: 启动后端
cd server
npm start

# 终端 2: 启动前端
cd client
npm start
```

### 访问应用

- 前端地址: http://localhost:3000
- 后端地址: http://localhost:3001

## API 接口

### 获取题目列表
```
GET /api/problems
```

**响应示例:**
```json
[
  {
    "id": "problem1",
    "title": "Hello World",
    "difficulty": "easy",
    "description": "编写一个 C++ 程序，输出 \"Hello, World!\""
  }
]
```

### 获取题目详情
```
GET /api/problems/:id
```

**响应示例:**
```json
{
  "id": "problem1",
  "title": "Hello World",
  "difficulty": "easy",
  "description": "编写一个 C++ 程序，输出 \"Hello, World!\"",
  "testCases": [
    {
      "input": "",
      "output": "Hello, World!"
    }
  ]
}
```

### 提交代码
```
POST /api/submit
Content-Type: application/json

{
  "problemId": "problem1",
  "code": "#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello, World!\" << endl;\n    return 0;\n}"
}
```

**响应示例:**
```json
{
  "success": true,
  "results": [
    {
      "testCase": 1,
      "input": "",
      "expected": "Hello, World!",
      "actual": "Hello, World!",
      "passed": true
    }
  ],
  "message": "所有测试用例通过！"
}
```

## 添加新题目

在 `problems/` 目录下创建新的 JSON 文件，格式如下：

```json
{
  "id": "problem4",
  "title": "题目名称",
  "difficulty": "easy",
  "description": "题目描述",
  "testCases": [
    {
      "input": "输入示例",
      "output": "期望输出"
    }
  ]
}
```

## 开发说明

### 前端开发
- 修改 `client/src/` 下的文件
- 使用 `npm start` 启动开发服务器（支持热重载）
- 使用 `npm run build` 构建生产版本

### 后端开发
- 修改 `server/app.js` 文件
- 使用 `npm start` 启动服务器
- 使用 `npm run dev` 启动并监听文件变化（需要安装 nodemon）

### 编译器配置
项目默认使用 MSYS2 的 GCC 编译器。如需使用其他编译器：
1. 修改 `server/app.js` 中的 `GPP_PATH` 常量
2. 确保编译器路径正确且可执行
3. 测试编译命令是否正常工作

## 安全注意事项

- 代码执行设置了 5 秒超时限制
- 临时文件在编译/运行后自动清理
- 建议在生产环境中添加更多安全措施（如沙箱隔离）

## 常见问题

### 编译错误
- 检查 C++ 编译器是否正确安装
- 确认编译器路径配置正确
- 查看后端日志获取详细错误信息

### 前端无法连接后端
- 确认后端服务器正在运行
- 检查端口 3001 是否被占用
- 查看浏览器控制台的网络请求

### 代码提交无响应
- 检查代码语法是否正确
- 确认编译器可以正常访问
- 查看后端日志获取错误信息

## 贡献指南

欢迎贡献代码、报告问题或提出建议！

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 LICENSE 文件了解详情

## 联系方式

如有问题或建议，请通过以下方式联系：
- 提交 Issue
- 发送邮件

---

**注意**: 本项目仅用于学习和练习目的，不建议用于生产环境。