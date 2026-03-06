# API 文档

## 概述

本文档描述了 C++ 在线编程练习网站的后端 API 接口。

**基础 URL**: `http://localhost:3001`

**Content-Type**: `application/json`

---

## 接口列表

### 1. 获取题目列表

获取所有可用的编程题目列表。

**请求**
```
GET /api/problems
```

**参数**
无

**响应**
```json
{
  "code": 200,
  "data": [
    {
      "id": "problem1",
      "title": "Hello World",
      "difficulty": "easy",
      "description": "编写一个 C++ 程序，输出 \"Hello, World!\""
    },
    {
      "id": "problem2",
      "title": "两数之和",
      "difficulty": "easy",
      "description": "输入两个整数，输出它们的和"
    },
    {
      "id": "problem3",
      "title": "判断奇偶数",
      "difficulty": "easy",
      "description": "输入一个整数，判断它是奇数还是偶数。如果是偶数输出\"Even\"，如果是奇数输出\"Odd\""
    }
  ]
}
```

**字段说明**
- `id`: 题目唯一标识符
- `title`: 题目标题
- `difficulty`: 难度级别 (easy/medium/hard)
- `description`: 题目描述

---

### 2. 获取题目详情

获取指定题目的详细信息，包括测试用例。

**请求**
```
GET /api/problems/:id
```

**参数**
- `id` (路径参数): 题目 ID

**响应**
```json
{
  "code": 200,
  "data": {
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
}
```

**字段说明**
- `testCases`: 测试用例数组
  - `input`: 输入数据
  - `output`: 期望输出

**错误响应**
```json
{
  "code": 404,
  "error": "题目不存在"
}
```

---

### 3. 提交代码

提交用户编写的 C++ 代码进行编译和测试。

**请求**
```
POST /api/submit
Content-Type: application/json
```

**请求体**
```json
{
  "problemId": "problem1",
  "code": "#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello, World!\" << endl;\n    return 0;\n}"
}
```

**参数**
- `problemId`: 题目 ID
- `code`: C++ 源代码

**成功响应**
```json
{
  "code": 200,
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

**编译错误响应**
```json
{
  "code": 200,
  "success": false,
  "error": "编译错误",
  "details": "error: 'iostream' file not found\n#include <iostream>\n         ^~~~~~~~\ncompilation terminated."
}
```

**测试失败响应**
```json
{
  "code": 200,
  "success": false,
  "results": [
    {
      "testCase": 1,
      "input": "3 5",
      "expected": "8",
      "actual": "7",
      "passed": false
    }
  ],
  "message": "部分测试用例未通过"
}
```

**运行时错误响应**
```json
{
  "code": 200,
  "success": false,
  "results": [
    {
      "testCase": 1,
      "input": "abc",
      "expected": "123",
      "actual": "运行时错误",
      "passed": false
    }
  ],
  "message": "部分测试用例未通过"
}
```

**字段说明**
- `success`: 是否所有测试用例都通过
- `results`: 测试结果数组
  - `testCase`: 测试用例编号
  - `input`: 输入数据
  - `expected`: 期望输出
  - `actual`: 实际输出
  - `passed`: 是否通过
- `message`: 结果消息
- `error`: 错误类型（编译错误等）
- `details`: 详细错误信息

**错误响应**
```json
{
  "code": 404,
  "error": "题目不存在"
}
```

---

## 错误码说明

| 错误码 | 说明 |
|--------|------|
| 200 | 请求成功 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |

---

## 限制和安全

### 执行限制
- **超时时间**: 5 秒
- **内存限制**: 系统默认
- **并发限制**: 无（生产环境建议添加）

### 安全措施
- 代码在独立进程中执行
- 临时文件自动清理
- 输入输出格式验证

### 建议
- 生产环境应使用沙箱隔离
- 添加请求频率限制
- 实现用户认证和授权
- 记录提交历史用于审计

---

## 示例代码

### JavaScript (Axios)

```javascript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

// 获取题目列表
async function getProblems() {
  const response = await axios.get(`${API_BASE_URL}/api/problems`);
  return response.data;
}

// 获取题目详情
async function getProblemDetail(problemId) {
  const response = await axios.get(`${API_BASE_URL}/api/problems/${problemId}`);
  return response.data;
}

// 提交代码
async function submitCode(problemId, code) {
  const response = await axios.post(`${API_BASE_URL}/api/submit`, {
    problemId,
    code
  });
  return response.data;
}

// 使用示例
(async () => {
  try {
    const problems = await getProblems();
    console.log('题目列表:', problems);
    
    const problem = await getProblemDetail('problem1');
    console.log('题目详情:', problem);
    
    const result = await submitCode('problem1', `
      #include <iostream>
      using namespace std;
      
      int main() {
          cout << "Hello, World!" << endl;
          return 0;
      }
    `);
    console.log('提交结果:', result);
  } catch (error) {
    console.error('错误:', error);
  }
})();
```

### cURL

```bash
# 获取题目列表
curl http://localhost:3001/api/problems

# 获取题目详情
curl http://localhost:3001/api/problems/problem1

# 提交代码
curl -X POST http://localhost:3001/api/submit \
  -H "Content-Type: application/json" \
  -d '{
    "problemId": "problem1",
    "code": "#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello, World!\" << endl;\n    return 0;\n}"
  }'
```

---

## 更新日志

### v1.0.0 (2026-03-06)
- 初始版本发布
- 实现基本的题目列表、详情和代码提交功能
- 支持 C++ 代码编译和自动测试

---

## 技术支持

如有 API 使用问题，请：
1. 查看本文档
2. 检查服务器日志
3. 提交 Issue 或联系开发团队