---
layout: post
category : 技术
title: "批量清除git本地分支"
description: "批量清除本地git分支"
tagline: "技术就是生产力"
tags : [技术, 分享, OS, NTFS]
---

1. 如图 本地分支**如下 
 
![step1](/images/data_remove_git_branch_1.png)

可以看到有多中分值标签

feature / hotfix 等


2.  当确定这些黄色的分支不再使用后我们可以这样去查找删除分支的选项

``$git branch|grep 'feature'``

查询的结果如下： 
![step1](/images/data_remove_git_branch_2.png)


3. 下面就用到了xargs 这一神命令了

``$git branch|grep feature | xargs git branch -D``

输出信息: 

![step1](/images/data_remove_git_branch_3.png)


这回我们看下git br 的结果

![step4](/images/data_remove_git_branch_4.png) 


命令解析

git branch |grep feature 

`查找 git branch 结果中带有 feature 字段的分支`

$git branch|grep feature | xargs git branch -D

`通过 xargs ，执行 git branch -D 依次将 grep出的内容作为arg 参数，将结果清除`

