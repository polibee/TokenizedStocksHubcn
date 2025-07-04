# Google Analytics 和 Google AdSense 配置指南

## Google Analytics 配置

### 1. 获取 Google Analytics 测量ID

1. 访问 [Google Analytics](https://analytics.google.com/)
2. 创建新的属性或使用现有属性
3. 获取测量ID（格式：G-XXXXXXXXXX）

### 2. 配置 Docusaurus

在 `docusaurus.config.ts` 文件中添加以下配置：

```typescript
themeConfig: {
  // 其他配置...
  gtag: {
    trackingID: 'G-XXXXXXXXXX', // 替换为您的测量ID
    anonymizeIP: true,
  },
  // 其他配置...
}
```

### 3. 安装插件（可选）

如果需要更高级的配置，可以安装Google Analytics插件：

```bash
npm install @docusaurus/plugin-google-gtag
```

然后在配置中添加：

```typescript
plugins: [
  [
    '@docusaurus/plugin-google-gtag',
    {
      trackingID: 'G-XXXXXXXXXX',
      anonymizeIP: true,
    },
  ],
]
```

## Google AdSense 配置

### 1. 获取 AdSense 发布商ID

1. 访问 [Google AdSense](https://www.google.com/adsense/)
2. 创建账户并获得批准
3. 获取发布商ID（格式：ca-pub-XXXXXXXXXXXXXXXX）

### 2. 添加 AdSense 脚本

在 `docusaurus.config.ts` 文件中添加：

```typescript
scripts: [
  {
    src: '/TokenizedStocksHubcn/js/fix-image-paths.js',
    async: true,
  },
  // Google AdSense脚本
  {
    src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX',
    async: true,
    crossorigin: 'anonymous',
  },
]
```

### 3. 添加广告单元

在需要显示广告的页面或组件中添加：

```html
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
     data-ad-slot="XXXXXXXXXX"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

## 注意事项

1. **替换占位符**：请将所有的 `XXXXXXXXXX` 替换为您实际的ID
2. **测试环境**：在本地开发时，Analytics和AdSense可能无法正常工作
3. **隐私合规**：确保遵守GDPR、CCPA等隐私法规
4. **性能影响**：过多的广告可能影响网站加载速度

## 验证配置

### Google Analytics
- 部署后访问网站
- 在Google Analytics控制台查看实时数据
- 确认页面浏览量正在记录

### Google AdSense
- 确保网站已获得AdSense批准
- 检查广告是否正确显示
- 监控广告收入报告

## 故障排除

### Analytics 不工作
- 检查测量ID是否正确
- 确认网站已部署到生产环境
- 检查浏览器控制台是否有错误

### AdSense 不显示广告
- 确认发布商ID正确
- 检查网站是否符合AdSense政策
- 等待广告审核通过（可能需要几小时到几天）