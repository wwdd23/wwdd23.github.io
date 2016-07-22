---
layout: post
category : 技术
title: "在没有root权限编辑vim文件的保存方法"
description: "vim小技巧"
tagline: "技术就是生产力"
tags : [技术,Linux,vim]

---


#困惑

总出现这么一种状况：

在vim中编辑需要root权限的文件，但是手滑没有使用sudo。

当编辑完成后发现无法保存。

多么痛彻心扉的感觉。

#解决

在我脑海中，有这么一种方法。

可以让我在普通权限下，保存需要sudo后的文件。

但是这项技能一直在我深深的脑海中,的边缘，用时会忘却。。

这项技能是这样用的

在保存退出时输入：

        :w !sudo tee %
        
        jasllsadfj
        lsajljdf

        Press ENTER or type command to continue
        W12: Warning: File "test" has changed and the buffer was changed in Vim as well
        See ":help W12" for more info.
        [O]K, (L)oad File:

输入 

        L  #写入

退出

        :q

轻松保存退出,不带走一片遗憾

从此再也不用强制退出，然后sudo vim 再次输入了~~~ 


#解析：

>!sudo tee %

>%　　　　　  #VI/VIM编辑的文件内容

>!　　　　　　#管道

>sudo　　　　 #以root权限操作

>tee　　　　　#将标准输入（即通过管道过来的当前编辑的文件内容）输出到标准输出，同时写入到指定的文件中（即VI/VIM当前编辑的文件）

>%　　　　　  #VI/VIM编辑的文件

