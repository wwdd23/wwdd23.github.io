---
layout: post
category : 技术
title: "清除本地git 显示的remotes分支"
description: "学习记录"
tagline: "技术就是生产力"
tags : [技术,git,]

---
经常会出现以下图片中的状况

本地Git中常常会保留大量远端删除后本地依旧显示的 remotes 分值，十分碍眼。


![pic1](/images/git_remotes.png)

使用命令：

`$git remote prune origin `

删除本地仓库中相比远程库中已经不存在的分支


结果如下

![pic2](/images/git_remotes-2.png)

清爽了许多

