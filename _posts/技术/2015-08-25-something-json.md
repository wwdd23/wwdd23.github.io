---
layout: post
category : 技术
title: "json相关总结(乱序未整理)"
description: "抓取过程中对json的操作"
tagline: "技术就是生产力"
tags : [技术,Linux,爬虫,javascript ]

---

###json内容提取  js python 
 
######js 读取 json方式

```
url = [web api 接口地址]

request(url, function(error, response, body) {

1. 查看body 数据内容 ：console.log(body); 

2. 检查body 数据类型 : console.log(typeof(body));

3. 去除多余字符：试例


jQuery501824([
  {
    "content": "両親の古希記念に家族旅行で利用させていただきました。\r\n温泉の充実度はさすがの一言です。温泉好きな家族全員で満喫しました。\r\n電車・バスで伺いましたが、バスの到着にあわせてかご車で荷物のピックアップに...",
    "hotelNo": 10828,
    "nextNo": 0,
    "planNo": 3123732,
    "postDate": 1411716217000,
    "prevNo": 0,
    "reply": "このたびは、ご両親様の大切な古希記念にご宿泊くださいまして、誠にありが\r\nとうございます。また、口コミのご投稿をしていただきましたこと、重ねて御\r\n礼申し上げます。\r\nご滞在にご満足いただけましたご様...",
    "replyDate": 1411786713000,
    "reviewNo": 12117197,
    "score": 5
  }
])
 


字段解析  

jQuery501824([
 {


 }
])

}

```

`request调用注意点`

*json判断response.statusCode状态 是否为200*


#####js api 内容整理

需要去除上文中jQuery501824\(\[ \]\)内容

由于现实内容直接现实格式中包含了换行符，所以需要先将数据中空格去除。

> js 去除字符传中空格

方法：

```
var ss = body.replace(/\s+/g,"")
```

整理后的字符串内容就可以开始转化为JSON格式进行解析.

####整理接口信息流程

读入数据，


检查数据类型

console.log(typeof(body));

数据强制转换字符串

toString(str); //强制转换字符串

正则截取json内容

var info = body.match(/\{.*\}/)[0];

转换json格式

var obj = JSON.parse(info);


提取json内容 


提取 score字段

"score" : obj.score



