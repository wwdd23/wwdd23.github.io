---
layout: post
category : 技术
title: "spider两周技术点总结"
description: "周总结，记录学习工作内容"
tagline: "技术就是生产力"
tags : [技术,总结,nodjs,json,casperjs ]

---

##2 周总

- webkit 爬取
- rakuten 普通 爬取

###技术点：

####casperjs

- 框架流程
- 常用 API 点击 滚动 翻页



######框架流程
```
var casper = require('casper').create({
  pageSettings: {
        loadImages: false, // do not load images
        loadPlugins: false // do not load NPAPI plugins (Flash, Silverlight, ...)
    }
});

//命令行参数
var usr = casper.cli.get(0);
var passwd = casper.cli.get(1);
var cookie_file = casper.cli.get(2);

//casper 监听消息队列
casper.on('remote.message', function(msg) {
  //this.echo('remote message caught: ' + msg);
});

//监听 requested 消息
casper.on('resource.requested', function(requestData, request){

  if (requestData.url.match(/google|gstatic|doubleclick/)){
    request.abort();
    return;
  }

  if (requestData.url.match(/query\?seqs/)){
    //模拟点击翻页
    setTimeout(function(){
      var out = casper.evaluate(function(page){
        var page_max = $('.item.next').prev().text();
        if ( page > page_max  ) {
          var empty ={'status':200,'result':{}};
          return  empty;
        } else {

          $('.num.icon-tag').attr("data-page",page);
          $('.num.icon-tag span').click();
        }
      },context);
      if (out.length !=0 ) {
        casper.echo(JSON.stringify(out));
        casper.exit();
      };
    }, 1000 * 5);

    setTimeout(function(){
      casper.scrollToBottom();
    }, 1000 * 7);
  }
});



casper.start(url);

casper.wait();

casper.on();

casper.run();


(casper.exit())

```

#####常用API
- casper.each()
- setTimeout()
- scrollToButtom()
- clickLable() // this.clickLabel('My link is beautiful', 'a');


####nodejs

- 模块使用
- 语法规则
- 注意判断事项
- cheerio

#####cheerio 配置用法
重启docker后 运行nodejs 会出现cheerio模块异常错误

source /etc/profile




####json

- 正则截取字段
- 提取信息 
- 结果生成格式

####js爬虫调试要点

- 字段选择
- console.log
- 数组循环
- js/jQuery 事件模拟

###接下来内容：

mongodb 数据库语法

ruby

ruby on rails

ruby task init方法
