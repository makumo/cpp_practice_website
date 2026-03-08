const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

const app = express();
const PORT = 3001;

// C++ 编译器路径 - 支持环境变量配置或直接调用 g++
const GPP_PATH = process.env.GPP_PATH || 'g++';

// 中间件
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 题目目录
const PROBLEMS_DIR = path.join(__dirname, '../problems');

// 获取所有题目列表
app.get('/api/problems', (req, res) => {
    try {
        console.log('PROBLEMS_DIR:', PROBLEMS_DIR);
        console.log('Reading directory...');
        const files = fs.readdirSync(PROBLEMS_DIR).filter(file => file.endsWith('.json'));
        console.log('Found files:', files);
        const problems = files.map(file => {
            const filePath = path.join(PROBLEMS_DIR, file);
            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            return {
                id: data.id,
                title: data.title,
                difficulty: data.difficulty,
                description: data.description
            };
        });
        console.log('Sending problems:', problems);
        res.json(problems);
    } catch (error) {
        console.error('Error in /api/problems:', error);
        res.status(500).json({ error: '读取题目列表失败', details: error.message });
    }
});

// 获取单个题目详情
app.get('/api/problems/:id', (req, res) => {
    try {
        const filePath = path.join(PROBLEMS_DIR, `${req.params.id}.json`);
        if (fs.existsSync(filePath)) {
            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            res.json(data);
        } else {
            res.status(404).json({ error: '题目不存在' });
        }
    } catch (error) {
        res.status(500).json({ error: '读取题目失败' });
    }
});

// 提交代码
app.post('/api/submit', (req, res) => {
    console.log('收到提交请求:', req.body);
    const { problemId, code } = req.body;

    try {
        console.log('题目ID:', problemId);
        console.log('代码长度:', code ? code.length : 0);
        
        // 读取题目测试用例
        const problemPath = path.join(PROBLEMS_DIR, `${problemId}.json`);
        console.log('题目路径:', problemPath);
        
        if (!fs.existsSync(problemPath)) {
            console.log('题目文件不存在');
            return res.status(404).json({ error: '题目不存在' });
        }

        const problem = JSON.parse(fs.readFileSync(problemPath, 'utf8'));
        const testCases = problem.testCases;

        // 创建临时文件
        const tempDir = path.join(__dirname, 'temp');
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir);
        }

        const timestamp = Date.now();
        const sourceFile = path.join(tempDir, `solution_${timestamp}.cpp`);
        const executableFile = path.join(tempDir, `solution_${timestamp}.exe`);

        // 写入源代码文件
        fs.writeFileSync(sourceFile, code);

        // 编译
        console.log('开始编译:', `${GPP_PATH} "${sourceFile}" -o "${executableFile}"`);
        exec(`${GPP_PATH} "${sourceFile}" -o "${executableFile}"`, (compileError, compileStdout, compileStderr) => {
            console.log('编译结果:', { error: compileError, stdout: compileStdout, stderr: compileStderr });
            if (compileError) {
                // 清理临时文件
                fs.unlinkSync(sourceFile);
                return res.json({
                    success: false,
                    error: '编译错误',
                    details: compileStderr || compileStdout || String(compileError)
                });
            }

            // 运行测试用例
            let results = [];
            let allPassed = true;

            const runTests = async () => {
                console.log('开始运行测试用例，数量:', testCases.length);
                for (let i = 0; i < testCases.length; i++) {
                    const testCase = testCases[i];
                    console.log(`测试用例 ${i + 1}:`, testCase);
                    
                    try {
                        const output = await new Promise((resolve, reject) => {
                            // 创建临时输入文件
                            const inputFile = path.join(path.dirname(executableFile), `input_${Date.now()}.txt`);
                            fs.writeFileSync(inputFile, testCase.input);
                            
                            // 使用 PowerShell 运行程序，从文件读取输入
                            exec(`powershell -Command "Get-Content '${inputFile}' | & '${executableFile}'"`, { timeout: 5000 }, (error, stdout, stderr) => {
                                // 删除临时输入文件
                                try {
                                    fs.unlinkSync(inputFile);
                                } catch (e) {
                                    // 忽略删除错误
                                }
                                
                                if (error) {
                                    console.log('运行错误:', error);
                                    console.log('错误代码:', error.code);
                                    console.log('错误信号:', error.signal);
                                    console.log('stderr:', stderr);
                                    console.log('stdout:', stdout);
                                    reject(error);
                                } else {
                                    console.log('运行输出:', stdout.trim());
                                    resolve(stdout.trim());
                                }
                            });
                        });

                        const expected = testCase.output.trim();
                        const passed = output === expected;
                        console.log(`测试用例 ${i + 1}: 期望="${expected}", 实际="${output}", 通过=${passed}`);

                        results.push({
                            testCase: i + 1,
                            input: testCase.input,
                            expected: expected,
                            actual: output,
                            passed: passed
                        });

                        if (!passed) {
                            allPassed = false;
                        }
                    } catch (error) {
                        results.push({
                            testCase: i + 1,
                            input: testCase.input,
                            expected: testCase.output,
                            actual: '运行时错误',
                            passed: false
                        });
                        allPassed = false;
                    }
                }

                // 清理临时文件
                try {
                    fs.unlinkSync(sourceFile);
                    fs.unlinkSync(executableFile);
                } catch (e) {
                    // 忽略清理错误
                }

                res.json({
                    success: allPassed,
                    results: results,
                    message: allPassed ? '所有测试用例通过！' : '部分测试用例未通过'
                });
            };

            runTests();
        });

    } catch (error) {
        res.status(500).json({ error: '提交代码失败' });
    }
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
});