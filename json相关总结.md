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

判断response.statusCode状态 是否为200



接口内容

js api 内容整理



js 去除字符传中空格


####整理接口信息流程

读入数据，

检查数据类型

数据强制转换字符串

正则截取json内容

转换json格式

提取json内容 




