---
layout: post
category : 技术
title: "Casperjs使用相关的坑"
description: "Casperjs使用方法"
tagline: "技术就是生产力"
tags : [技术,casperjs,Blog,javascript ]

---
##关于Casper爬取qunar的坑

- 页面滚动
- Log/Debug调试
- 提取信息
- 函数等待
- Casper执行流程




####页面滚动实现：

`方法一`

`$("body").animate({scrollTop: $(document).height()}, 0);` console中执行可见效果

`方法二`

casper.scrollToBottom();

this.scrollToBottom();


##Log/Debug调试

```
var casper = require('casper').create({
  //waitTimeout: 1000 * 3,
  //stepTimeout: 10000,
  verbose: true,
  ogLevel: 'debug',     ~~添加debug参数~~
  userAgent: 'Mozilla/5.0  poi poi poi (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.22 (KHTML, like Gecko) Chrome/25.0.1364.172Safari/537.22',

  pageSettings: {
    "loadImages": false,
  },

  /*
  onWaitTimeout: function(){
    this.echo("test");
  }

  onTimeout: function(){
    this.echo("test");
  }
  */
});
```


#####提取信息

getHTML() : 提取HTML信息

getTitle() : 提取页面Title信息

getCurrentUrl() : 提取Url 信息

[相关casper API 说明地址  'http://casperjs.readthedocs.org/en/latest/modules/casper.html'](http://casperjs.readthedocs.org/en/latest/modules/casper.html)



#####casper 等待 wait函数

```
casper.then(function(){

    this.echo("2before");
    this.wait(3*1000,function(){
        casper.echo(this.fetchText('a.e_title.js_list_name'));
        casper.exit();
    } );
    this.echo(this.getTitle());
 });
```

casper wait 

可能会出现等待时长较长，而无法退出的状况，需要对等待时间调试.


####Casper执行流程


实例代码：

######创建casper代码实例
```
var casper = require('casper').create({
  //waitTimeout: 1000 * 3,
  //stepTimeout: 10000,
  verbose: true,
    logLevel: 'debug',
    userAgent: 'Mozilla/5.0  poi poi poi (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.22 (KHTML, like Gecko) Chrome/25.0.1364.172Safari/537.22',

  pageSettings: {
    "loadImages": false,
  },

  /*
  onWaitTimeout: function(){
    this.echo("test");
  }

  onTimeout: function(){
    this.echo("test");
  }
  */
});


```

######设置启动选项

```
casper.start('http://hotel.qunar.com/city/taipei/', function() {

     this.echo("strat -2before");
     this.scrollToBottom();
}); 
```

######运行

```
casper.run();
```
