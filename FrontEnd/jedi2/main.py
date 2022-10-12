import requests
import json

str = '''
## 2022.09.16

#### private

- [x] Easy English Expression
- [x] 《邓小平时代》-->《看天下》
- [ ] end-to-end;bitcoin文章打印
- [x] 计算机网络——实验
- [ ] VuePress-->摸清基本套路
  - tailwind ui-->前端搭建差不多，开始构建交互API（APIpost）
  - 《ES6教程》（https://wangdoc.com/es6/intro.html）
- [ ] 36Kr + 知乎
  - 程序员发展规划-->编程研习所-->花丑/车小胖
  - 我向往的工作
- [ ] 柔美的细胞小将
- [ ] Notion更新
- [ ] Gin开发-->GoByExample-->Go traceroute
- [ ] 极客时间 打印论文
- [ ] Azure账户激活（$150到手）-->购买主机

#### 待做

- [ ] 精进博客
- [ ] Pro Git
- [ ] Github Action

##### 整理

- [ ] 整理印象笔记

#### public

- [x] 午饭预定(https://forms.office.com/pages/responsepage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAYAAA_sTpZUOUxSMEZLMFo2T0FQOVFJWDZBSFhFNlNSUy4u&wdLOR=c5F2FFB5A-9D9C-4D96-8F70-4D4747ADFD08)
- [x] 查看邮件
  - morgan邮件
    - [https://microsoft-my.sharepoint.com/:b:/g/personal/nayapat_microsoft_com1/EUXEL-B35-VMsPnM2GwcXjkB5Kwf9NcMFUaA89XN0X1YEA?e=bip0cp](https://nam06.safelinks.protection.outlook.com/ap/b-59584e83/?url=https%3A%2F%2Fmicrosoft-my.sharepoint.com%2F%3Ab%3A%2Fg%2Fpersonal%2Fnayapat_microsoft_com1%2FEUXEL-B35-VMsPnM2GwcXjkB5Kwf9NcMFUaA89XN0X1YEA%3Fe%3Dbip0cp&data=05|01|pengyuanwang%40microsoft.com|8bd915646c59463ba00308da91cbf50b|72f988bf86f141af91ab2d7cd011db47|1|0|637982602468364589|Unknown|TWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D|3000|||&sdata=WJuViWimkc9YNegaJtgYYv57UYheHYsGAGZ28pBe3Pg%3D&reserved=0)
    - [https://github.com/morganstanley/ComposeUI/](https://nam06.safelinks.protection.outlook.com/?url=https%3A%2F%2Fgithub.com%2Fmorganstanley%2FComposeUI%2F&data=05|01|pengyuanwang%40microsoft.com|8bd915646c59463ba00308da91cbf50b|72f988bf86f141af91ab2d7cd011db47|1|0|637982602468364589|Unknown|TWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D|3000|||&sdata=wHhOjMDjZz5RtQRELUuTF75bKrNewu7UCgjNoZqdxCU%3D&reserved=0)
  - 注册Ignite
- [x] morgan stanley bug修复-->拉会讨论-->发送邮件（重要！！！）-->答复邮件
- [ ] Copilot学生身份认证
- [ ] github bug修复
- [ ] zhaoyi vscode调试环境
- [x] zhaoyi bug修复-->环境没有办法复现
- [ ] 设计文档下载——>阅读
- [x] 查看Chrome文档-->了解Chromium规范-->Chrome University
  - Learn CDP(https://chromedevtools.github.io/devtools-protocol/)
  - Navigation process
  - webview2文档（https://docs.microsoft.com/en-us/microsoft-edge/webview2/concepts/browser-features）
- [x] 整理example文档-->开会-->继续整理文档-->整理UI
  - 提交PR-->merge-->开始搞-->协同流程-->认领work item
  - 整理文档&bug修复-->增加staging-->研究Github推送机制
    - https://microsoft.visualstudio.com/Edge/_git/chromium.src/pullrequest/7810364
    - https://microsoft.sharepoint.com/teams/HybridApplications/SiteAssets/Hybrid%20Applications%20Notebook/Releases.one#Publish%20Sample%20App%20project&section-id=%7B29DC2598-A040-42CC-990A-83391A0E8183%7D&page-id=%7B6858734C-436A-40DD-BC77-1C279B9EB1C1%7D&end
- [ ] 微软开源
- [ ] 微软价值观等文档
- [ ] 学习PowerBI（WV2视图）
- [ ] Viva Learning

##### Chrome学习计划

###### step1

**Read the most important dev docs**

[multi-process-architecture](https://www.chromium.org/developers/design-documents/multi-process-architecture)

[displaying-a-web-page-in-chrome](https://www.chromium.org/developers/design-documents/displaying-a-web-page-in-chrome)

[inter-process-communication](https://www.chromium.org/developers/design-documents/inter-process-communication)

[threading](https://www.chromium.org/developers/design-documents/threading)

**See if your group has any startup docs**

There may be some docs that people working on the same code will care about while others don’t need to know as much detail.

**Learn some of the code idioms:**

[important-abstractions-and-data-structures](https://www.chromium.org/developers/coding-style/important-abstractions-and-data-structures)

[smart-pointer-guidelines](https://www.chromium.org/developers/smart-pointer-guidelines)

[chromium-string-usage](https://www.chromium.org/developers/chromium-string-usage)

###### step2

youtube.com/watch?v=kNzoswFIU9M&list=PLNYkxOF6rcICgS7eFJrGDhMBwWtdTgzpx&index=4



.\third_party\perl\perl_wrap.bat .\third_party\edge_webview2\win\Publish-APISample.pl --wpf C:\repos\samples\WebView2Samples\SampleApps\WebView2WpfBrowser
'''

url = 'https://api.github.com/markdown'
headers = {
    'Authorization': 'Bearer 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'
}
body = {
    'text': str
}
r = requests.post(url, headers=headers, data=json.dumps(body))
print(r.text)