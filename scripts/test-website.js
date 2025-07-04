const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

// 测试配置
const config = {
  baseUrl: 'http://localhost:8080',
  timeout: 10000,
  outputDir: './test-results'
};

// 要测试的页面路径
const testPages = [
  '/',
  '/blog',
  '/tutorials',
  '/platforms-compare',
  '/products-overview',
  '/compliance',
  '/docs/faq',
  '/blog/basics/tutorial-basics',
  '/blog/trading/tutorial-cex',
  '/blog/trading/tutorial-dex',
  '/blog/advanced/tutorial-advanced'
];

// 测试结果
const testResults = {
  passed: [],
  failed: [],
  warnings: [],
  summary: {
    total: 0,
    passed: 0,
    failed: 0,
    warnings: 0
  }
};

// 创建输出目录
if (!fs.existsSync(config.outputDir)) {
  fs.mkdirSync(config.outputDir, { recursive: true });
}

// 日志函数
function log(message, type = 'info') {
  const timestamp = new Date().toISOString();
  const colors = {
    info: '\x1b[36m',
    success: '\x1b[32m',
    warning: '\x1b[33m',
    error: '\x1b[31m',
    reset: '\x1b[0m'
  };
  console.log(`${colors[type]}[${timestamp}] ${message}${colors.reset}`);
}

// HTTP请求函数
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const client = urlObj.protocol === 'https:' ? https : http;
    
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: 'GET',
      timeout: config.timeout,
      headers: {
        'User-Agent': 'Website-Test-Bot/1.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    };

    const req = client.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          statusMessage: res.statusMessage,
          headers: res.headers,
          body: data,
          responseTime: Date.now() - startTime
        });
      });
    });

    const startTime = Date.now();
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    
    req.end();
  });
}

// 分析HTML内容
function analyzeHtml(html, url) {
  const issues = [];
  const warnings = [];
  
  // 检查是否包含错误信息
  const errorPatterns = [
    /error/i,
    /exception/i,
    /cannot read properties/i,
    /undefined/i,
    /null/i,
    /failed to compile/i,
    /syntax error/i,
    /module not found/i
  ];
  
  errorPatterns.forEach(pattern => {
    if (pattern.test(html)) {
      issues.push({
        type: 'content_error',
        message: `Page content contains error pattern: ${pattern.source}`,
        pattern: pattern.source
      });
    }
  });
  
  // 检查页面标题
  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';
  
  if (!title) {
    warnings.push({
      type: 'missing_title',
      message: 'Page has no title'
    });
  } else if (title.toLowerCase().includes('error') || title.toLowerCase().includes('404')) {
    issues.push({
      type: 'error_title',
      message: `Page title indicates error: ${title}`,
      title
    });
  }
  
  // 检查是否有React错误边界
  if (html.includes('error-boundary') || html.includes('Something went wrong')) {
    issues.push({
      type: 'react_error',
      message: 'Page contains React error boundary'
    });
  }
  
  // 检查页面内容长度
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  const bodyContent = bodyMatch ? bodyMatch[1] : html;
  const textContent = bodyContent.replace(/<[^>]*>/g, '').trim();
  
  if (textContent.length < 100) {
    warnings.push({
      type: 'short_content',
      message: 'Page has very little text content',
      contentLength: textContent.length
    });
  }
  
  // 检查关键元素
  const criticalElements = {
    navigation: /<nav[^>]*>|class=["'].*nav/i,
    main: /<main[^>]*>|role=["']main["']|class=["'].*main/i,
    footer: /<footer[^>]*>/i
  };
  
  Object.entries(criticalElements).forEach(([name, pattern]) => {
    if (!pattern.test(html)) {
      warnings.push({
        type: 'missing_element',
        message: `Missing ${name} element`,
        element: name
      });
    }
  });
  
  return { issues, warnings, title, contentLength: textContent.length };
}

// 测试单个页面
async function testPage(pagePath) {
  const url = `${config.baseUrl}${pagePath}`;
  const result = {
    url,
    path: pagePath,
    status: 'unknown',
    errors: [],
    warnings: [],
    performance: {},
    analysis: {}
  };

  try {
    log(`Testing page: ${url}`);
    
    const response = await makeRequest(url);
    
    result.performance = {
      responseTime: response.responseTime,
      statusCode: response.statusCode,
      statusMessage: response.statusMessage
    };

    // 检查HTTP状态
    if (response.statusCode >= 400) {
      result.errors.push({
        type: 'http_error',
        statusCode: response.statusCode,
        statusMessage: response.statusMessage
      });
    } else if (response.statusCode >= 300) {
      result.warnings.push({
        type: 'redirect',
        statusCode: response.statusCode,
        location: response.headers.location
      });
    }

    // 分析HTML内容
    if (response.body) {
      const analysis = analyzeHtml(response.body, url);
      result.analysis = analysis;
      result.errors.push(...analysis.issues);
      result.warnings.push(...analysis.warnings);
    }

    // 确定测试状态
    if (result.errors.length === 0) {
      result.status = result.warnings.length > 0 ? 'warning' : 'passed';
    } else {
      result.status = 'failed';
    }

    log(`Page ${url} - Status: ${result.status} (${result.errors.length} errors, ${result.warnings.length} warnings) - ${response.responseTime}ms`, 
        result.status === 'failed' ? 'error' : result.status === 'warning' ? 'warning' : 'success');

  } catch (error) {
    result.status = 'failed';
    result.errors.push({
      type: 'request_error',
      message: error.message,
      code: error.code
    });
    log(`Failed to test page ${url}: ${error.message}`, 'error');
  }

  return result;
}

// 主测试函数
async function runTests() {
  log('Starting website automated testing...', 'info');
  
  try {
    // 测试所有页面
    for (const pagePath of testPages) {
      const result = await testPage(pagePath);
      
      if (result.status === 'passed') {
        testResults.passed.push(result);
      } else if (result.status === 'warning') {
        testResults.warnings.push(result);
      } else {
        testResults.failed.push(result);
      }
      
      // 添加延迟避免过快请求
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // 生成测试报告
    testResults.summary = {
      total: testPages.length,
      passed: testResults.passed.length,
      failed: testResults.failed.length,
      warnings: testResults.warnings.length
    };

    // 保存详细报告
    const reportPath = path.join(config.outputDir, 'test-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(testResults, null, 2));

    // 生成HTML报告
    generateHtmlReport();

    // 输出摘要
    log('\n=== TEST SUMMARY ===', 'info');
    log(`Total pages tested: ${testResults.summary.total}`, 'info');
    log(`Passed: ${testResults.summary.passed}`, 'success');
    log(`Warnings: ${testResults.summary.warnings}`, 'warning');
    log(`Failed: ${testResults.summary.failed}`, testResults.summary.failed > 0 ? 'error' : 'info');
    
    if (testResults.failed.length > 0) {
      log('\n=== FAILED PAGES ===', 'error');
      testResults.failed.forEach(result => {
        log(`${result.url}:`, 'error');
        result.errors.forEach(error => {
          log(`  - ${error.type}: ${error.message}`, 'error');
        });
      });
    }

    if (testResults.warnings.length > 0) {
      log('\n=== PAGES WITH WARNINGS ===', 'warning');
      testResults.warnings.forEach(result => {
        log(`${result.url}:`, 'warning');
        result.warnings.forEach(warning => {
          log(`  - ${warning.type}: ${warning.message || JSON.stringify(warning)}`, 'warning');
        });
      });
    }

    log(`\nDetailed report saved to: ${reportPath}`, 'info');
    log(`HTML report saved to: ${path.join(config.outputDir, 'test-report.html')}`, 'info');

  } catch (error) {
    log(`Test execution failed: ${error.message}`, 'error');
    throw error;
  }

  // 退出码
  return testResults.failed.length === 0;
}

// 生成HTML报告
function generateHtmlReport() {
  const htmlContent = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Website Test Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .summary-card { padding: 20px; border-radius: 8px; text-align: center; }
        .passed { background: #d4edda; color: #155724; }
        .warning { background: #fff3cd; color: #856404; }
        .failed { background: #f8d7da; color: #721c24; }
        .total { background: #d1ecf1; color: #0c5460; }
        .test-result { margin-bottom: 20px; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; }
        .test-header { padding: 15px; font-weight: bold; cursor: pointer; }
        .test-header.passed { background: #d4edda; }
        .test-header.warning { background: #fff3cd; }
        .test-header.failed { background: #f8d7da; }
        .test-details { padding: 15px; display: none; background: #f8f9fa; }
        .test-details.show { display: block; }
        .error, .warning-item { margin: 10px 0; padding: 10px; border-radius: 4px; }
        .error { background: #f8d7da; border-left: 4px solid #dc3545; }
        .warning-item { background: #fff3cd; border-left: 4px solid #ffc107; }
        .performance { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; margin: 10px 0; }
        .perf-metric { padding: 10px; background: #e9ecef; border-radius: 4px; text-align: center; }
        pre { background: #f8f9fa; padding: 10px; border-radius: 4px; overflow-x: auto; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Website Automated Test Report</h1>
        <p>Generated on: ${new Date().toLocaleString()}</p>
        
        <div class="summary">
            <div class="summary-card total">
                <h3>${testResults.summary.total}</h3>
                <p>Total Pages</p>
            </div>
            <div class="summary-card passed">
                <h3>${testResults.summary.passed}</h3>
                <p>Passed</p>
            </div>
            <div class="summary-card warning">
                <h3>${testResults.summary.warnings}</h3>
                <p>Warnings</p>
            </div>
            <div class="summary-card failed">
                <h3>${testResults.summary.failed}</h3>
                <p>Failed</p>
            </div>
        </div>

        <h2>Test Results</h2>
        ${[...testResults.passed, ...testResults.warnings, ...testResults.failed].map((result, index) => `
            <div class="test-result">
                <div class="test-header ${result.status}" onclick="toggleDetails('result_${index}')">
                    ${result.status.toUpperCase()}: ${result.url}
                    <span style="float: right;">${result.errors.length} errors, ${result.warnings.length} warnings - ${result.performance.responseTime || 0}ms</span>
                </div>
                <div class="test-details" id="details_result_${index}">
                    <div class="performance">
                        <div class="perf-metric">
                            <strong>Response Time</strong><br>
                            ${result.performance.responseTime || 0}ms
                        </div>
                        <div class="perf-metric">
                            <strong>HTTP Status</strong><br>
                            ${result.performance.statusCode || 'N/A'}
                        </div>
                        <div class="perf-metric">
                            <strong>Content Length</strong><br>
                            ${result.analysis?.contentLength || 0} chars
                        </div>
                        <div class="perf-metric">
                            <strong>Title</strong><br>
                            ${result.analysis?.title || 'N/A'}
                        </div>
                    </div>
                    
                    ${result.errors.length > 0 ? `
                        <h4>Errors:</h4>
                        ${result.errors.map(error => `
                            <div class="error">
                                <strong>${error.type}:</strong> ${error.message}
                                ${error.statusCode ? `<br><strong>Status:</strong> ${error.statusCode} ${error.statusMessage || ''}` : ''}
                                ${error.code ? `<br><strong>Code:</strong> ${error.code}` : ''}
                            </div>
                        `).join('')}
                    ` : ''}
                    
                    ${result.warnings.length > 0 ? `
                        <h4>Warnings:</h4>
                        ${result.warnings.map(warning => `
                            <div class="warning-item">
                                <strong>${warning.type}:</strong> ${warning.message || JSON.stringify(warning)}
                            </div>
                        `).join('')}
                    ` : ''}
                </div>
            </div>
        `).join('')}
    </div>
    
    <script>
        function toggleDetails(id) {
            const details = document.getElementById('details_' + id);
            details.classList.toggle('show');
        }
    </script>
</body>
</html>
  `;

  const htmlPath = path.join(config.outputDir, 'test-report.html');
  fs.writeFileSync(htmlPath, htmlContent);
}

// 检查服务器是否运行
async function checkServer() {
  try {
    await makeRequest(config.baseUrl);
    return true;
  } catch (error) {
    return false;
  }
}

// 主函数
async function main() {
  log('Checking if development server is running...', 'info');
  
  const serverRunning = await checkServer();
  if (!serverRunning) {
    log(`Development server is not running at ${config.baseUrl}`, 'error');
    log('Please start the development server first with: npm start', 'error');
    process.exit(1);
  }
  
  log('Development server is running, starting tests...', 'success');
  const success = await runTests();
  
  process.exit(success ? 0 : 1);
}

// 运行测试
if (require.main === module) {
  main().catch(error => {
    log(`Test runner failed: ${error.message}`, 'error');
    process.exit(1);
  });
}

module.exports = { runTests, testPage, config };