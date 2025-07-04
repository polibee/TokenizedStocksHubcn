/**
 * 修复图片路径问题
 * 这个脚本会在页面加载后自动修复所有图片路径，添加baseUrl前缀
 */

(function() {
  // 获取baseUrl，从Docusaurus配置中
  const baseUrl = '/TokenizedStocksHubcn/';
  
  // 页面加载完成后执行
  document.addEventListener('DOMContentLoaded', function() {
    fixImagePaths();
  });
  
  // 监听DOM变化，处理动态加载的内容
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes && mutation.addedNodes.length > 0) {
        fixImagePaths();
      }
    });
  });
  
  // 开始监听DOM变化
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  // 修复图片路径函数
  function fixImagePaths() {
    // 获取所有图片元素
    const images = document.querySelectorAll('img');
    
    images.forEach(function(img) {
      const src = img.getAttribute('src');
      
      // 只处理以/img开头但不以baseUrl开头的路径
      if (src && src.startsWith('/img') && !src.startsWith(baseUrl)) {
        // 添加baseUrl前缀
        img.setAttribute('src', baseUrl + src.substring(1));
      }
    });
    
    // 修复CSS中的背景图片
    fixCssBackgroundImages();
  }
  
  // 修复CSS背景图片
  function fixCssBackgroundImages() {
    // 获取所有样式表
    const styleSheets = document.styleSheets;
    
    try {
      for (let i = 0; i < styleSheets.length; i++) {
        const styleSheet = styleSheets[i];
        
        // 跳过跨域样式表
        if (!styleSheet.cssRules) continue;
        
        for (let j = 0; j < styleSheet.cssRules.length; j++) {
          const rule = styleSheet.cssRules[j];
          
          // 处理CSSStyleRule
          if (rule.style && rule.style.backgroundImage) {
            const bgImage = rule.style.backgroundImage;
            
            // 检查是否包含/img路径但不包含baseUrl
            if (bgImage.includes('/img') && !bgImage.includes(baseUrl)) {
              // 替换路径
              const newBgImage = bgImage.replace(/url\(['"]?(\/img[^'"\)]+)['"]?\)/g, 
                                           `url(${baseUrl}$1)`);
              
              if (newBgImage !== bgImage) {
                rule.style.backgroundImage = newBgImage;
              }
            }
          }
        }
      }
    } catch (e) {
      console.warn('修复CSS背景图片时出错:', e);
    }
  }
})();