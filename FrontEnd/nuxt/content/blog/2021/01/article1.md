## 2022.10.28

#### private

- [x] Easy English Expression
- [x] 《涛动周期论》
- [ ] 计算机网络——课程作业-->RTP问题解决-->可靠数据传输-->暂时hold，等待个人网站开发完成
- [ ] Windows系统开发学习指南/C#
- [ ] Jedi2
  - ~~vite SSR~~-->保持灵活，暂时不做，如果需要SEO就做反向代理-->node ssr-->暂时先不做-->全面转型Nuxt
  - 样式表内联
  - ~~markdown展示~~-->markdown渲染
  - 了解vuex store
  - vue test
- [ ] JavaScript学习
  - 廖雪峰-->学习DOM
  - HTML+CSS基础教程
- [ ] 36Kr + 知乎
  - iphone拍短视频-->大疆云台
- [ ] 天道
- [ ] Azure账户激活（$150到手）-->购买主机

#### 待做

- [ ] Jiayu请教英文学习
- [ ] OKR + Trello
- [ ] Copilot学生身份认证
- [ ] 精进博客
- [ ] Pro Git
- [ ] Github Action

##### 整理

- [ ] 整理印象笔记

#### public

- [x] 查看邮件
  - morgan邮件
    - [https://microsoft-my.sharepoint.com/:b:/g/personal/nayapat_microsoft_com1/EUXEL-B35-VMsPnM2GwcXjkB5Kwf9NcMFUaA89XN0X1YEA?e=bip0cp](https://nam06.safelinks.protection.outlook.com/ap/b-59584e83/?url=https%3A%2F%2Fmicrosoft-my.sharepoint.com%2F%3Ab%3A%2Fg%2Fpersonal%2Fnayapat_microsoft_com1%2FEUXEL-B35-VMsPnM2GwcXjkB5Kwf9NcMFUaA89XN0X1YEA%3Fe%3Dbip0cp&data=05|01|pengyuanwang%40microsoft.com|8bd915646c59463ba00308da91cbf50b|72f988bf86f141af91ab2d7cd011db47|1|0|637982602468364589|Unknown|TWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D|3000|||&sdata=WJuViWimkc9YNegaJtgYYv57UYheHYsGAGZ28pBe3Pg%3D&reserved=0)
    - [https://github.com/morganstanley/ComposeUI/](https://nam06.safelinks.protection.outlook.com/?url=https%3A%2F%2Fgithub.com%2Fmorganstanley%2FComposeUI%2F&data=05|01|pengyuanwang%40microsoft.com|8bd915646c59463ba00308da91cbf50b|72f988bf86f141af91ab2d7cd011db47|1|0|637982602468364589|Unknown|TWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D|3000|||&sdata=wHhOjMDjZz5RtQRELUuTF75bKrNewu7UCgjNoZqdxCU%3D&reserved=0)
  - morgan有新的问题（https://github.com/MicrosoftEdge/WebView2Feedback/issues/2750）
  - 参加AI课程
- [ ] core开发-->disable goback/forward-->查看文档，整理排期-->了解工作流程-->开始，参照lichen work-->本地可以work
- [ ] morgan问题看zhao liang沟通邮件
- [ ] 设计文档下载-->阅读
- [ ] winform UI refactor-->提交PR-->修改-->compliance assessment
- [ ] host object bug-fix咨询zhaoliang-->comments-->email thread
- [ ] GitHub bug-fixdd
- [ ] 查看Chrome文档-->了解Chromium规范-->Chrome University
  - Learn CDP(https://chromedevtools.github.io/devtools-protocol/)
  - Navigation process
  - webview2文档（https://docs.microsoft.com/en-us/microsoft-edge/webview2/concepts/browser-features）
  - Chrome DevTools工具了解
- [ ] 整理example文档
  - PR合入-->处理conflicts
  - 整理WinForm文档-->整理完毕-->找yan讨论
```js{1,3-5}[server.js]
const http = require('http')
const bodyParser = require('body-parser')

http.createServer((req, res) => {
  bodyParser.parse(req, (error, body) => {
    res.end(body)
  })
}).listen(3000)
```