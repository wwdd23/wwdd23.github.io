---
layout: post
category : 技术
title: "Vim中的快捷批量替换"
description: ""
tagline: "技术就是生产力"
tags : [技巧,Linux,Vim]

---


> 更了theme后由于使用 kramdown 

> 因为语法要求

> 使得 `######ws 读取 json方式` 这样的title格式不能被识别

### 批量正则替换：

```
/#\w 
匹配 ##`#w`s

使用：
:%s/#\w/# \w/g

替换全文所有 #后有字符的数据为  #[空格]字母

```
