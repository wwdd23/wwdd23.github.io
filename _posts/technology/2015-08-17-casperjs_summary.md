---
layout: post
category : 技术
title: "Casperjs webkit使用小结"
description: "如何使用casperjs爬取qunar页面信息"
tagline: "技术就是生产力"
tags : [技术,javascript,casperjs ]

---


## casperjs  webkit使用小结


###### casperjs 滚动界面 api  


casper.scrollToBottom(); 

[文档简介 http://casperjs.readthedocs.org/en/latest/modules/casper.html#scrolltobottom](http://casperjs.readthedocs.org/en/latest/modules/casper.html#scrolltobottom)


调用此函数后，直接会将界面滚动到地方。

解决类型：去哪儿 http://hotel.qunar.com/city/pingdong_xian/

此类界面，需要混动后才可以加载页面信息的问题
___

##### casperjs 内置点击翻页的方法

解决类型：

去哪儿 http://hotel.qunar.com/city/pingdong_xian/

casper.clickLabel(5,' a');  

点击标签<a\> 中包含有5的标签。

也就是点击第五页

___

##### js点击事件使用方法 

`$('.more-agentinfo a').click();` //点击去哪儿网显示更多内容按钮

参考地址： http://hotel.qunar.com/city/taipei/dt-2619/

____

##### js setTimeout 使用

setTimeout(function(){

},timeout);

ps.


使用函数无需传参时：
 
```
setTimeout(expand, 1000 * 7);
```

需要传参时：

```
setTimeout(function(){
            click(context);
        },5000);
```

##### casperjs wait使用

casper.wait(timeout,function(){

});

ps.

```
casper.wait(3000, function() {
      	
      	this.echo("I've waited for a second.");

});
```
___

#### 相关函数使用注意点

##### casperjs step流程

```
(create casper)

var casper = require('casper').create({

	 //waitTimeout: 1000 * 3,
    //stepTimeout: 10000,
    verbose: true,      //开启打印信息
    logLevel: 'debug', //打印debug信息
    //   userAgent: 'Mozilla/5.0  poi poi poi (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.22 (KHTML, like Gecko) Chrome/25.0.1364.172Safari/537.22',

    pageSettings: {
        loadImages: false,  //不加载图片
        loadPlugins: false  //不加载插件
    },	
    
      clientScripts:  [			//调用js脚本
        'includes/jquery.js',      // These two scripts will be injected in remote
        'includes/underscore.js'   // DOM on every request
    ],
});

casper.start(url);  //casper.start(url,function(){});


casper.then();

casper.wait();

...

casper.run();

```



casperjs 官方文档地址：
[http://casperjs.readthedocs.org/en/latest/modules/casper.html](http://casperjs.readthedocs.org/en/latest/modules/casper.html)

相关内容为：

- API
- Casper.options
- FAQ

