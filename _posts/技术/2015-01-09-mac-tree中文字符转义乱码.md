---
layout: post
category : 技术
title: "Mac tree 中文文件名显示异常"
description: "Mac中使用tree命令中文显示异常"
tagline: "技术就是生产力"
tags : [技术,Linux,Blog ]

---

> 一直在Linux中使用tree命令来获取目录结构

> 突然有一天我想整理下Mac中的文件归类下目录

> 也就是今天！

##结果

安装tree工具

    $brew install tree

显示的居然尼玛是这个样子。。。。

这个样子。。

样子。。

![](/images/mac-tree-error.png)


看到上图，一下子被错误的显示信息冲昏了头脑。
各种search，不断google.

尝试了

    $tree -charset ASCII/zh_CN.GBK

    $ exprot LANG=zh_CN.GBK

均无效果

收获了以下blog。

[蓝色的华](http://bluehua.org/2011/04/22/1624.html)
[池建强](http://macshuo.com/?p=676#comment-3448)

看完相关博客中内容，终究也没有解决。

顺手man tree查看，

没看出个究竟。。。


google中显示一个tree -N 

    $tree -N

尝试结果如下：

![](/images/mac-tree-fix.png) 

查看man pages 

    -N     Print  non-printable  characters  as is instead of as escaped octal
              numbers.

##原来不是汉字乱码是，出现了字符转义。
