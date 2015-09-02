---
layout: post
category : 技术
title: "spider上线手册汇总"
description: "学习记录"
tagline: "技术就是生产力"
tags : [技术,spider,rails ]

---
- 数据抓取最终结果进行关键字段为空判断，保证数据最终输出的正确
- 添加调试函数：

试例

```

function log(msg) {
  --debug  传入--debug参数后输出结果
  console.log(msg);
}
```


- w2服务器  s3服务器
- rails 查询常用命令
- rails  mongodb常用语句
- 线上rails使用  production
- s3 docker使用问题

##常用判断考虑 超时判断/status判断

```
equest.get( { method: 'GET', url: url, gzip: true, timeout: 5 * 1000 } , function(error, response, body) {

  if (error && error.code === 'ETIMEDOUT') {
    process.exit(0);
    return;
  }
  if( response.statusCode != 200) {
    return;
  }

```

##ruby task 书写问题

- spider任务书写问题
- 数据库提取书写问题
- task 读入 csv后去重语法

***rails init task  基本结构用于创建爬虫初始化任务***

```
# encoding: utf-8
require 'csv'

namespace :rakuten_task_init do
  desc "初始化乐天方案内容爬取"
  task :init_rakuten_plan_info => :environment do

    rakuten_house = CSV.read('data/rakuten_house.csv')

    Task.transaction do
      rakuten_house.each_with_index do |row,index|
        next if index == 0

        task_info = {
          url: "http://hotel.travel.rakuten.co.jp/hotelinfo/plan/#{row[0]}",
          project: 'rakuten',
          category: 'normal',
          script_name: 'rakuten/rakuten_hotel_info.js',
          context: "",
        }
        Task.create!(task_info)
        p "http://hotel.travel.rakuten.co.jp/hotelinfo/plan/#{row[0]}"
      end
    end
  end
end

```

***数据库提取任务***
基本结构

传入ENV使用方法

rake report:make_xxx_report date_time='2015-01-01'

```
namespace :report do
  desc "xxxx说明"
  task :make_xxx_report => :environment do
  result = [['住宿ID', '住宿名称', '国家', '地区', '城市', '地址', '商圈']] //表格title
  date_time = ENV['date_time'] //添加数据库查找时间起点变量
  $mongo_youspider['kancho'].find( :script_name => 'kancho/kancho_ctrip_address.js', :date => date_time).each do |row| //提取数据库
   ///插入内容
   info = row['data']
          result << [
            info['hotelid'],
            info['name'],
            info['country'],
            info['location'],
            info['city'],
            info['address'],
            info['zone'],
          ]
  end
  //发送邮件并转为xls表格式
  Emailer.send_custom_file(['wudi@fishtrip.cn'], '携程住宿地址抓取', XlsGen.gen(result), '携程住宿地址列表.xls', true).deliver
end


```





##字段提取方法


```
	<span>94 Thaveewong(Beach Front) Road, Patong,<a class="add_area" target="_blank" href="/international/phuket725/zone825" data-dopost="T" data-ctm="">芭东海滩地区</a>,普吉岛,普吉府,83150,泰国</span>

```

1. 提取span 整段text内容
2. 提取`<a classs="add_area"...>..</a>` pa_text
3. 通过 pa_text 为标记，split 分割两段内容

```
var span_area = $('div.adress').find('span a').text(); //"东京站/日本桥/秋叶原地区"  *<a>内容</a>*
    var span  = $('div.adress').find('span').text(); //"4-8 Kanda-Sakuma-Cho, Chiyoda-Ku,东京站/日本桥/秋叶原地区,东京,东京都,101002,日本"   *<span>所有内容</span>*
    var city_location = span.split(span_area)[1];   //",东京,东京都,101002,日本"  *使用span_area 作为标记分割，取数组1内容*
    var address = span.split(span_area)[0];   //"4-8 Kanda-Sakuma-Cho, Chiyoda-Ku,"  *取数组0内容*
```

`错误判断`

**常见字段提取问题**

匹配内容 为null导致错误退出,

match内容无法匹配导致 pop 0 error send

试例1

```
 if (url.match(/f_camp_id=(.*?)&/) == null) {
              var f_camp_id = "";
} else {
              var f_camp_id = box_url.match(/f_camp_id=(.*?)&/)[0];
            }
```

试例2

```
 if (url.match(/f_camp_id=(.*?)&/) == null) {
                  var f_camp_id = "";
 } else {
                  var f_camp_id = box_url.match(/f_camp_id=(.*?)&/)[0];
                }

```



##python csv数据整理

####以下有几个坑
- csv 读取后中文异常，添加uniout模块， file(u'file_name')
- cvs.reader 读取后无法使用 for 循环嵌套遍历，

```
for i in csv.reader('xxxx')
  for b in  csv.reader('xxx')
     print i  //只遍历一次
     
```
*通过以下几个模块*

```
import csv
import uniout
import string

addres = csv.DictReader(file(u'adre.csv','rb'))
**转化为字典**

*csv.reader*
reader1 = csv.reader(file(u'sort_index.csv','rb'))
**直接读入**
```
以上读出内容为 csv 格式
可以通过转换为list格式 for循环变量list

```
res = list(addres)
resid = list(c_d_id)
i = 0

for addr in res:
  for da in resid:
    if da['ddd'] == addr['use_id']:
      print da['ctrip']+","+da['ddd']+","+addr['use_id']+","+addr['city']+","+addr['country']+","+addr['addr']
```


`import itertools`意外发现模块 csv 对比使用

```
import csv
import string
import sys
import itertools
import codecs
import uniout


reader1 = csv.reader(file(u'sort_index.csv','rb'))
reader2 = csv.reader(file(u'sort_c_id.cvs','rb'))

for lhs, rhs in itertools.izip(reader1, reader2):
  if lhs[0] == rhs[0]:
    print rhs,

```

##mongodb rails console常用命令
*rails 线上服务器 w2.fishtrip.cn*

```
$mongo_youspider['kancho'].find(:script_name => 'kancho/kancho_ctrip_address.js').first['data']

查找 yuspide kancho 数据,find script_name 为 kancho_xxx 数据的第一条数据内容

查询数据时添加时间标记

$mongo_youspider['kancho'].find(:script_name => 'kancho/kancho_ctrip_address.js',:date => '2015-09-08').first['data']

```

##Rail console 任务查询常用命令
**重置任务**

`Task.where(:script_name => 'kancho/kancho_ctrip_address.js').update_all(:status => 'undo',:attempts => 0)` 

**查询任务数量**

`Task.where(:script_name => 'kancho/kancho_ctrip_address.js').count`

**打印失败任务数据**

` puts Task.where(:script_name => 'kancho/kancho_ctrip_address.js').failed.last.to_yaml`

**删除任务**

` Task.current_day.where(:script_name => 'rakuten/rakuten_calendar_hotel.js').delete_all`

**任务状态**

`success` `failed`  `delivered` `undo`

**查询当天任务**

`Task.current_day` //current_day 封装./models/task.rb


## s3 docker使用问题

s3登陆后 

attach spider

tmux
**ctrl+b n**
 

输出信息


退出方式：
建议直接关闭终端，不进行任何操作

**docker detech "ctrl+p q"**


##api书写规范

查找目录 /app/api
