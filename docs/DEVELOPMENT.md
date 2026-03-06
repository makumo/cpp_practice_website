# 开发指南

本文档提供 C++ 在线编程练习网站的开发指南，包括开发环境配置、代码规范和常见开发任务。

## 开发环境配置

### 必需工具

- **Node.js**: v16 或更高版本
- **C++ 编译器**: MinGW-w64 或 MSYS2 GCC
- **代码编辑器**: VS Code（推荐）或其他编辑器
- **Git**: 用于版本控制

### 推荐工具

- **Postman**: API 测试工具
- **浏览器开发者工具**: 前端调试
- **nodemon**: 后端热重载（开发依赖）

### 环境变量

项目当前使用硬编码配置，未来可迁移到环境变量：

```env
# 服务器配置
PORT=3001
NODE_ENV=development

# 编译器配置
GPP_PATH=D:\path\to\g++.exe

# 数据库配置（未来）
DB_HOST=localhost
DB_PORT=3306
DB_NAME=cpp_practice
```

## 项目结构详解

```
aiprojecct/
├── client/                    # 前端应用
│   ├── src/
│   │   ├── App.js            # 主应用组件
│   │   ├── App.css           # 全局样式
│   │   └── index.js          # React 入口
│   ├── public/
│   │   └── index.html        # HTML 模板
│   ├── package.json          # 前端依赖
│   └── webpack.config.js     # Webpack 配置
├── server/                    # 后端应用
│   ├── app.js                # Express 主文件
│   ├── temp/                 # 临时文件目录
│   ├── routes/               # 路由（待创建）
│   ├── controllers/          # 控制器（待创建）
│   └── package.json          # 后端依赖
├── problems/                  # 题目数据
│   ├── problem1.json
│   ├── problem2.json
│   └── problem3.json
├── tests/                     # 测试文件
├── docs/                      # 文档
│   ├── API.md               # API 文档
│   └── DEVELOPMENT.md       # 开发指南（本文件）
├── AGENTS.md                  # AI 上下文文件
├── .gitignore                 # Git 忽略配置
└── package.json               # 根项目配置
```

## 代码规范

### JavaScript/React 规范

**命名约定**
- 组件：PascalCase（如 `App.js`、`ProblemList.js`）
- 函数：camelCase（如 `loadProblems`、`handleSubmit`）
- 常量：UPPER_SNAKE_CASE（如 `GPP_PATH`、`PORT`）
- 文件：PascalCase（组件）或 camelCase（工具函数）

**代码风格**
- 使用 2 空格缩进
- 使用单引号
- 每行最大长度 80 字符
- 组件使用函数式组件 + Hooks

**示例**
```javascript
// ✅ 好的实践
function App() {
  const [problems, setProblems] = useState([]);
  
  useEffect(() => {
    loadProblems();
  }, []);
  
  const handleSubmit = async () => {
    try {
      const result = await submitCode(problemId, code);
      setResults(result);
    } catch (error) {
      console.error('提交失败:', error);
    }
  };
  
  return <div>...</div>;
}

// ❌ 不好的实践
function APP(){
  const Problems = useState([]);
  useEffect(()=>{loadProblems()},[]);
  return <div>...</div>
}
```

### Node.js/Express 规范

**路由设计**
- 使用 RESTful 风格
- 统一错误处理
- 输入验证

**示例**
```javascript
// ✅ 好的实践
app.get('/api/problems', async (req, res) => {
  try {
    const problems = await getProblems();
    res.json(problems);
  } catch (error) {
    console.error('获取题目失败:', error);
    res.status(500).json({ error: '服务器错误' });
  }
});

// ❌ 不好的实践
app.get('/getProblems', (req, res) => {
  getProblems((err, data) => {
    res.send(data);
  });
});
```

### C++ 代码规范

**命名约定**
- 函数：camelCase
- 变量：camelCase
- 常量：UPPER_SNAKE_CASE
- 类：PascalCase

**代码风格**
- 使用 4 空格缩进
- 使用 `using namespace std;`（练习项目）
- 添加适当注释

**示例**
```cpp
#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    cout << a + b << endl;
    return 0;
}
```

## 常见开发任务

### 1. 添加新的 API 接口

在 `server/app.js` 中添加新路由：

```javascript
app.get('/api/stats', (req, res) => {
  try {
    // 实现逻辑
    const stats = {
      totalProblems: 10,
      totalSubmissions: 100,
      successRate: 0.75
    };
    res.json(stats);
  } catch (error) {
    console.error('获取统计失败:', error);
    res.status(500).json({ error: '获取统计失败' });
  }
});
```

### 2. 添加新的前端组件

在 `client/src/` 中创建新组件：

```javascript
// client/src/ProblemCard.js
import React from 'react';

function ProblemCard({ problem, onClick }) {
  return (
    <div className="card mb-3" onClick={() => onClick(problem.id)}>
      <div className="card-body">
        <h5 className="card-title">{problem.title}</h5>
        <p className="card-text">{problem.description}</p>
        <span className={`badge bg-${problem.difficulty === 'easy' ? 'success' : 'warning'}`}>
          {problem.difficulty}
        </span>
      </div>
    </div>
  );
}

export default ProblemCard;
```

在 `App.js` 中使用：

```javascript
import ProblemCard from './ProblemCard';

// 在渲染部分
{problems.map(problem => (
  <ProblemCard 
    key={problem.id} 
    problem={problem} 
    onClick={loadProblemDetail} 
  />
))}
```

### 3. 添加新的题目

在 `problems/` 目录创建 JSON 文件：

```json
{
  "id": "problem4",
  "title": "阶乘计算",
  "difficulty": "medium",
  "description": "输入一个整数 n，计算并输出 n 的阶乘",
  "testCases": [
    {
      "input": "5",
      "output": "120"
    },
    {
      "input": "0",
      "output": "1"
    }
  ]
}
```

### 4. 修改编译器配置

编辑 `server/app.js`：

```javascript
// 修改编译器路径
const GPP_PATH = 'D:\\new\\path\\to\\g++.exe';

// 修改编译选项
exec(`${GPP_PATH} "${sourceFile}" -o "${executableFile}" -O2 -Wall`, callback);
```

### 5. 添加错误处理

**前端错误边界**

```javascript
// client/src/ErrorBoundary.js
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>出错了，请刷新页面</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
```

**后端全局错误处理**

```javascript
app.use((err, req, res, next) => {
  console.error('服务器错误:', err);
  res.status(500).json({ 
    error: '服务器内部错误',
    message: err.message 
  });
});
```

## 调试技巧

### 前端调试

1. **浏览器控制台**
   - 打开开发者工具 (F12)
   - 查看 Console 标签
   - 使用 `console.log()` 输出调试信息

2. **React DevTools**
   - 安装 React DevTools 浏览器扩展
   - 查看组件状态和 props
   - 追踪组件渲染

3. **Network 标签**
   - 查看 API 请求
   - 检查请求/响应内容
   - 分析加载时间

### 后端调试

1. **控制台日志**
   ```javascript
   console.log('调试信息');
   console.error('错误信息');
   console.warn('警告信息');
   ```

2. **断点调试**
   - 使用 VS Code 调试器
   - 在 `server/app.js` 中设置断点
   - 启动调试配置

3. **Postman 测试**
   - 手动测试 API 接口
   - 验证请求和响应
   - 测试错误情况

## 测试

### 单元测试（待实现）

```javascript
// 示例测试代码
describe('API Tests', () => {
  test('GET /api/problems should return list', async () => {
    const response = await request(app).get('/api/problems');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
```

### 集成测试（待实现）

```javascript
describe('Code Submission Tests', () => {
  test('should compile and run correct code', async () => {
    const response = await request(app)
      .post('/api/submit')
      .send({
        problemId: 'problem1',
        code: `
          #include <iostream>
          using namespace std;
          int main() {
            cout << "Hello, World!" << endl;
            return 0;
          }
        `
      });
    expect(response.body.success).toBe(true);
  });
});
```

## 性能优化

### 前端优化

1. **代码分割**
   - 使用 React.lazy()
   - 按需加载组件

2. **缓存策略**
   - 使用 HTTP 缓存
   - 实现客户端缓存

3. **资源优化**
   - 压缩图片
   - 优化 CSS/JS 大小

### 后端优化

1. **编译缓存**
   - 缓存编译结果
   - 减少重复编译

2. **请求限流**
   - 添加速率限制
   - 防止滥用

3. **数据库优化**（未来）
   - 添加索引
   - 优化查询

## 安全建议

1. **输入验证**
   - 验证所有用户输入
   - 防止注入攻击

2. **代码沙箱**
   - 限制代码执行权限
   - 使用容器隔离

3. **日志记录**
   - 记录所有操作
   - 监控异常行为

4. **HTTPS**
   - 生产环境使用 HTTPS
   - 保护数据传输

## 部署指南

### 开发环境

```bash
npm run dev
```

### 生产环境

1. **构建前端**
```bash
cd client
npm run build
```

2. **启动后端**
```bash
cd server
NODE_ENV=production npm start
```

3. **使用 PM2**（推荐）
```bash
pm2 start server/app.js --name cpp-practice
pm2 startup
pm2 save
```

## 故障排除

### 常见问题

**Q: 前端无法连接后端**
- 检查后端是否运行
- 验证端口配置
- 查看网络请求

**Q: 编译失败**
- 确认编译器路径
- 检查代码语法
- 查看编译错误日志

**Q: 页面显示空白**
- 检查浏览器控制台
- 验证 React 是否正确渲染
- 检查网络请求

### 日志位置

- 前端：浏览器控制台
- 后端：终端输出或日志文件
- 编译日志：临时文件目录

## 贡献流程

1. Fork 项目
2. 创建特性分支
3. 提交更改
4. 确保通过测试
5. 推送分支
6. 创建 Pull Request

## 资源链接

- [React 文档](https://react.dev/)
- [Express 文档](https://expressjs.com/)
- [Node.js 文档](https://nodejs.org/docs/)
- [Webpack 文档](https://webpack.js.org/)
- [Bootstrap 文档](https://getbootstrap.com/)

## 更新日志

- v1.0.0 (2026-03-06): 初始版本

---

如有问题或建议，请提交 Issue 或联系开发团队。