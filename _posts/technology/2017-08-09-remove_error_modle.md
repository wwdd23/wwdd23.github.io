---
layout: post
category : 技术
title: "Rails 中删除错建controller/modle"
description: ""
tagline: "技术就是生产力"
tags : [技巧,Linux,Vim, RoR]

---

在创建rails项目时通常会用到

`rails g modle xxx`

`rails g controller xxx`

来创建model / controller 模块

---


当你要创建一个sells 的 controller时

不小心输入为 `rails g controller sells`, 根目录下会产生一大堆文件，但你又不想一个个目录的查找删除:


```
  deleted:    app/assets/javascripts/sells.coffee
  deleted:    app/assets/stylesheets/sells.scss
  deleted:    app/controllers/sells_controller.rb
  deleted:    app/helpers/sells_helper.rb
  deleted:    app/views/sells/profit_info.html.erb
  deleted:    app/views/sells/search_info.html.erb
  deleted:    app/views/sells/sell_data.html.erb
  deleted:    test/controllers/sells_controller_test.rb
```


所以直接执行`rails d controller sells`后

重新执行正确命令`rails g controller sell`即可。


#### 如果你创建了错误modle 

如果你需要创建  `rails g model order  country:string city_id:inter`

结果不小心输入为  `rails g model order  country:string city_id:inte`

只需要将g 替换为 d `rails d model order  country:string city_id:inte` 

重新输入正常的命令即可


#### 创建错误 model后还执行了 rake db:migrate 

首先删除重建model信息

回滚清除 db 信息,后重新创建db信息

> rake db:drop

> rake db:create

> rake db:migrate


