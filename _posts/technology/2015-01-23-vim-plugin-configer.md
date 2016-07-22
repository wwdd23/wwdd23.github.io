---
layout: post
category : 技术
title: "Vim中常用插件以及py模板添加"
description: "使用vim添加插件，以及python模板的添加"
tagline: "技术就是生产力"
tags : [Linux,vim ]
---

#准备工作

你得有台电脑（呵呵呵呵呵）

你得有vim，并且安装了vunble（稍后纠正拼写错误）

#添加vim插件

    $vim
    》在vim中输入
    :BundleSearch 

    即可出现以下内容


       ：p: i - Install bundle; c - Cleanup; s |---
     Search; R - Reload list                   |layout: post
     Bundle 'EditPlus'                           |category : 技术
     Bundle 'python_fold_compact'                |title: "Vim中常用插件以及py模板添加"
     Bundle 'OnSyntaxChange'                     |description: "使用vim添加插件，以及python模>
     Bundle 'cst'                                |板的添加"
     Bundle 'php-cs-fixer'                       |tagline: "技术就是生产力"
     Bundle 'cscope.vim'                         |tags : [Linux,vim ]
     Bundle 'EscapeBchars'                       |---
     Bundle 'HgCi'                               |
     Bundle 'sourcebeautify.vim'                 |#准备工作
     Bundle 'jshint.vim--Stelmach'               |
     Bundle 'gprof.vim'                          |你得有台电脑（呵呵呵呵呵）
     Bundle 'vmark.vim--Visual-Bookmarking'


今天我为了添加pyhton的自动补齐功能以及头文件自动添加的功能

添加了以下两个工具

> snipMate
> pythoncomplete

在vim状态下输入

    ：BundleSearch snipMate
    输入 i 安装即可

安装完毕后，还需要在 ~/.vimrc文件中添加

    Bundle 'snipMate' 

保存退出后,在新开的终端中即可享受插件的快感了。


_______________________

#添加vim模板

>添加模板的作用为：
>当编辑py结尾文件时，自动创建文件头
>如下

    #!/usr/bin/python
    #-*- coding:utf-8 -*-
    ############################
    #File Name:
    #Author: wudi
    #Mail: programmerwudi@gmail.com
    #Created Time: 2015-01-23 13:34:07
    ############################


参考内容：
[Vim新建python文件自动添加python header](http://blog.csdn.net/orangleliu/article/details/41902851)



###具体操作流程：

在.vimrc文件中添加以下内容 

    "auto add pyhton header --start
    autocmd BufNewFile *.py 0r ~/.vim/template/py.clp
    autocmd BufNewFile *.py ks|call FileName()|'s
    autocmd BufNewFile *.py ks|call CreatedTime()|'s
    
    fun FileName()
        if line("$") > 10
            let l = 10  "这里是字母L 不是数字1
        else
            let l = line("$")
        endif
        exe "1," . l . "g/File Name:.*/s/File Name:.*/File Name: " .expand("%")
        "最前面是数字1，这里的File Name:要和模板中一致
    endfun
    
    fun CreatedTime()
        if line("$") > 10
            let l = 10
        else
            let l = line("$")
        endif
        exe "1," . l . "g/Created Time:.*/s/Created Time:.*/Created Time: ".strftime("%Y-%m-%d %T")
        "这里Create Time:要和模板中一致
    endfun
    "auto add python header --end
    "
    "auto add bash header --start
    
    autocmd BufNewFile *.sh 0r ~/.vim/template/sh
    autocmd BufNewFile *.sh ks|call CreatedTime()|'s
    
    "auto add bash header --end



以上包含shell脚本以及python两种内容。

在vimrc文件中添加此内后，可以看到 "~/.vim/template/py.clp"这样的字段。

我们需要在.vim/目录下创建template用来存放相关模板
    
    $mkdir -p ~/.vim/template/
    $vim ~/.vim/template/py.clp

将以下内容添加到py.clp中

    #!/usr/bin/python
    #-*- coding:utf-8 -*-
    ############################
    #File Name:
    #Author: wudi
    #Mail: programmerwudi@gmail.com
    #Created Time:
    ############################

再次创建python文件时

    $vim test.py

    ## py.clp中的内容便会自动添加到文件中
    ## 效果如下

    #!/usr/bin/python
    #-*- coding:utf-8 -*-
    ############################
    #File Name: text.py
    #Author: wudi
    #Mail: programmerwudi@gmail.com
    #Created Time: 2015-01-23 13:44:23
    ############################

    
    


