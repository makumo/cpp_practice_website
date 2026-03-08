import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';

function App() {
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [code, setCode] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showReference, setShowReference] = useState(false);
  
  // 新增状态
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [problemsPerPage] = useState(10);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // 格式化题目 ID 为 4 位数字
  const formatProblemId = (id) => {
    const num = parseInt(id.replace('problem', ''));
    return 'problem' + String(num).padStart(4, '0');
  };

  useEffect(() => {
    loadProblems();
  }, []);

  // 筛选题目
  const filteredProblems = problems.filter(problem => {
    const matchesSearch = searchTerm === '' || 
      problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      problem.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'all' || 
      problem.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  // 分页
  const totalPages = Math.ceil(filteredProblems.length / problemsPerPage);
  const startIndex = (currentPage - 1) * problemsPerPage;
  const endIndex = startIndex + problemsPerPage;
  const displayedProblems = filteredProblems.slice(startIndex, endIndex);

  // 切换页码
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const loadProblems = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/problems');
      // 按题目编号排序
      const sortedProblems = response.data.sort((a, b) => {
        const numA = parseInt(a.id.replace('problem', ''));
        const numB = parseInt(b.id.replace('problem', ''));
        return numA - numB;
      });
      setProblems(sortedProblems);
      if (sortedProblems.length > 0) {
        loadProblemDetail(sortedProblems[0].id);
      }
    } catch (error) {
      console.error('加载题目失败:', error);
    }
  };

  const loadProblemDetail = async (problemId) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/problems/${problemId}`);
      setSelectedProblem(response.data);
      setCode('');
      setResults(null);
    } catch (error) {
      console.error('加载题目详情失败:', error);
    }
  };

  const handleSubmit = async () => {
    if (!selectedProblem) return;

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/api/submit', {
        problemId: selectedProblem.id,
        code: code
      });
      setResults(response.data);
    } catch (error) {
      console.error('提交代码失败:', error);
      alert('提交失败，请检查服务器连接');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-dark bg-primary mb-4">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">C++ 在线编程练习</span>
        </div>
      </nav>

      <div className="row">
        <div className={`col-md-${sidebarCollapsed ? '1' : '3'}`}>
          <div className="card">
            <div className="card-header bg-light d-flex justify-content-between align-items-center">
              <h5 className="mb-0">{sidebarCollapsed ? '题目' : '题目列表'}</h5>
              <button 
                className="btn btn-sm btn-outline-secondary" 
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              >
                {sidebarCollapsed ? '→' : '←'}
              </button>
            </div>
            <div className="card-body">
              {!sidebarCollapsed && (
                <>
                  {/* 搜索框 */}
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="搜索题目..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                      }}
                    />
                  </div>
                  
                  {/* 难度筛选 */}
                  <div className="mb-3">
                    <div className="btn-group w-100" role="group">
                      <button
                        className={`btn btn-sm ${selectedDifficulty === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => {
                          setSelectedDifficulty('all');
                          setCurrentPage(1);
                        }}
                      >
                        全部
                      </button>
                      <button
                        className={`btn btn-sm ${selectedDifficulty === 'easy' ? 'btn-success' : 'btn-outline-success'}`}
                        onClick={() => {
                          setSelectedDifficulty('easy');
                          setCurrentPage(1);
                        }}
                      >
                        Easy
                      </button>
                      <button
                        className={`btn btn-sm ${selectedDifficulty === 'medium' ? 'btn-warning' : 'btn-outline-warning'}`}
                        onClick={() => {
                          setSelectedDifficulty('medium');
                          setCurrentPage(1);
                        }}
                      >
                        Medium
                      </button>
                      <button
                        className={`btn btn-sm ${selectedDifficulty === 'hard' ? 'btn-danger' : 'btn-outline-danger'}`}
                        onClick={() => {
                          setSelectedDifficulty('hard');
                          setCurrentPage(1);
                        }}
                      >
                        Hard
                      </button>
                    </div>
                  </div>
                </>
              )}
              
              {/* 题目列表 */}
              <div className="list-group list-group-flush" style={{ maxHeight: sidebarCollapsed ? '70vh' : '60vh', overflowY: 'auto' }}>
                {displayedProblems.map(problem => (
                  <button
                    key={problem.id}
                    className={`list-group-item list-group-item-action ${selectedProblem?.id === problem.id ? 'active' : ''}`}
                    onClick={() => loadProblemDetail(problem.id)}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <span>{sidebarCollapsed ? formatProblemId(problem.id).replace('problem', '') : formatProblemId(problem.id) + '. ' + problem.title}</span>
                      <span className={`badge bg-${problem.difficulty === 'easy' ? 'success' : problem.difficulty === 'medium' ? 'warning' : 'danger'}`}>
                        {problem.difficulty}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
              
              {/* 分页 */}
              {!sidebarCollapsed && totalPages > 1 && (
                <div className="mt-3">
                  <div className="btn-group w-100" role="group">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      上一页
                    </button>
                    <span className="btn btn-sm btn-outline-secondary disabled">
                      {currentPage} / {totalPages}
                    </span>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      下一页
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={`col-md-${sidebarCollapsed ? '11' : '9'}`}>
          {selectedProblem && (
            <div className="row">
              <div className="col-md-6">
                <div className="card mb-3">
                  <div className="card-header bg-light">
                    <h5 className="mb-0">题目描述</h5>
                  </div>
                  <div className="card-body">
                    <h4>{selectedProblem.title}</h4>
                    <p>{selectedProblem.description}</p>
                    <h6>输入示例：</h6>
                    <pre className="bg-light p-2"><code>{selectedProblem.testCases[0]?.input || '暂无'}</code></pre>
                    <h6>输出示例：</h6>
                    <pre className="bg-light p-2"><code>{selectedProblem.testCases[0]?.output || '暂无'}</code></pre>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card mb-3">
                  <div className="card-header bg-light d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">代码编辑器</h5>
                    {selectedProblem?.referenceSolution && (
                      <button
                        className="btn btn-sm btn-info"
                        onClick={() => setShowReference(!showReference)}
                      >
                        {showReference ? '隐藏参考答案' : '查看参考答案'}
                      </button>
                    )}
                  </div>
                  <div className="card-body">
                    <textarea
                      className="form-control font-monospace"
                      rows="20"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="// 在此输入你的 C++ 代码"
                      style={{ fontFamily: 'monospace', fontSize: '14px' }}
                    />
                    <button
                      className="btn btn-primary mt-3 w-100"
                      onClick={handleSubmit}
                      disabled={loading || !code.trim()}
                    >
                      {loading ? '提交中...' : '提交代码'}
                    </button>
                  </div>
                </div>

                {showReference && selectedProblem?.referenceSolution && (
                  <div className="card mb-3">
                    <div className="card-header bg-info text-white">
                      <h5 className="mb-0">参考答案</h5>
                    </div>
                    <div className="card-body">
                      <pre className="mb-0" style={{ fontFamily: 'monospace', fontSize: '14px' }}>
                        <code>{selectedProblem.referenceSolution}</code>
                      </pre>
                      <button
                        className="btn btn-sm btn-secondary mt-2"
                        onClick={() => setCode(selectedProblem.referenceSolution)}
                      >
                        使用参考答案
                      </button>
                    </div>
                  </div>
                )}

                {results && (
                  <div className="card">
                    <div className="card-header bg-light">
                      <h5 className="mb-0">测试结果</h5>
                    </div>
                    <div className="card-body">
                      <div className={`alert ${results.success ? 'alert-success' : 'alert-danger'}`}>
                        {results.message}
                      </div>
                      {results.results && results.results.map((result, index) => (
                        <div key={index} className="mb-2">
                          <div className="d-flex justify-content-between">
                            <strong>测试用例 {result.testCase}</strong>
                            <span className={result.passed ? 'text-success' : 'text-danger'}>
                              {result.passed ? '✓ 通过' : '✗ 失败'}
                            </span>
                          </div>
                          <div className="small text-muted">
                            输入: {result.input}
                          </div>
                          {!result.passed && (
                            <div className="small text-muted">
                              期望: {result.expected}<br/>
                              实际: {result.actual}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;